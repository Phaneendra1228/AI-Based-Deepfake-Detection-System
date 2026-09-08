import { Router, Request, Response } from 'express';
import { Scan } from '../models/Scan.js';
import { Telemetry } from '../models/Telemetry.js';
import { isDbConnected } from '../config/db.js';

export const scansRouter = Router();

// GET /api/scans - Retrieve all scans with optional filtering
scansRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isDbConnected()) {
      res.status(503).json({
        success: false,
        message: 'Database not connected. Please ensure MongoDB is running.',
        data: [],
      });
      return;
    }

    const { filter, search, limit = '50', page = '1' } = req.query;

    const query: any = {};

    if (filter === 'human') {
      query.result = 'REAL HUMAN (AUTHENTIC)';
    } else if (filter === 'deepfake') {
      query.result = 'DEEPFAKE (FAKE)';
    } else if (filter === 'review') {
      query.result = 'REVIEW REQUIRED';
    }

    if (search && typeof search === 'string') {
      query.filename = { $regex: search, $options: 'i' };
    }

    const limitNum = Math.min(parseInt(limit as string, 10) || 50, 100);
    const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
    const skip = (pageNum - 1) * limitNum;

    const [scans, totalCount] = await Promise.all([
      Scan.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Scan.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      total: totalCount,
      page: pageNum,
      limit: limitNum,
      data: scans,
    });
  } catch (error: any) {
    console.error('Error fetching scans:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/scans/:id - Retrieve a single scan by ID
scansRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isDbConnected()) {
      res.status(503).json({ success: false, message: 'Database not connected' });
      return;
    }

    const scan = await Scan.findById(req.params.id);
    if (!scan) {
      res.status(404).json({ success: false, message: 'Scan record not found' });
      return;
    }

    res.status(200).json({ success: true, data: scan });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/scans - Create and persist a new scan
scansRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isDbConnected()) {
      res.status(503).json({
        success: false,
        message: 'Database not connected. Please ensure MongoDB is running.',
      });
      return;
    }

    const payload = req.body;
    if (!payload.filename || !payload.result || payload.confidence === undefined) {
      res.status(400).json({
        success: false,
        message: 'Missing required scan fields: filename, result, and confidence are required.',
      });
      return;
    }

    const newScan = new Scan({
      filename: payload.filename,
      fileType: payload.fileType || 'image',
      fileSize: payload.fileSize || '1.2 MB',
      fileHash: payload.fileHash,
      result: payload.result,
      confidence: payload.confidence,
      riskLevel: payload.riskLevel || (payload.result === 'DEEPFAKE (FAKE)' ? 'HIGH' : 'LOW'),
      orientation: payload.orientation || 'LANDSCAPE',
      aspectRatioLabel: payload.aspectRatioLabel || '16:9',
      mediaUrl: payload.mediaUrl || '',
      signals: payload.signals || {
        facialSignal: 95,
        pixelSignal: 95,
        patternSignal: 95,
        temporalSignal: 95,
      },
      metrics: payload.metrics || {
        facialConsistency: 95,
        pixelConsistency: 95,
        visualArtifacts: 5,
        frameConsistency: 95,
        frequencyAnomaly: 5,
        compressionNoise: 5,
      },
      detectedAnomalies: payload.detectedAnomalies || [],
      logs: payload.logs || [],
    });

    const savedScan = await newScan.save();

    // Update telemetry summary
    const today = new Date().toISOString().split('T')[0];
    const isFake = payload.result === 'DEEPFAKE (FAKE)';
    const isReal = payload.result === 'REAL HUMAN (AUTHENTIC)';

    await Telemetry.findOneAndUpdate(
      { date: today },
      {
        $inc: {
          totalScans: 1,
          deepfakeCount: isFake ? 1 : 0,
          authenticCount: isReal ? 1 : 0,
          reviewCount: !isFake && !isReal ? 1 : 0,
          activeThreatsBlocked: isFake ? 1 : 0,
        },
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Scan analysis persisted to MongoDB successfully',
      data: savedScan,
    });
  } catch (error: any) {
    console.error('Error creating scan:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/scans/:id - Delete a scan by ID
scansRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isDbConnected()) {
      res.status(503).json({ success: false, message: 'Database not connected' });
      return;
    }

    const deleted = await Scan.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Scan not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Scan deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
