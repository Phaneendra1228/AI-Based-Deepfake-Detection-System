import { Router, Request, Response } from 'express';
import { Scan } from '../models/Scan.js';
import { Telemetry } from '../models/Telemetry.js';
import { isDbConnected } from '../config/db.js';

export const analyticsRouter = Router();

// GET /api/analytics/summary - Aggregated database statistics
analyticsRouter.get('/summary', async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isDbConnected()) {
      res.status(503).json({
        success: false,
        message: 'Database not connected. Please ensure MongoDB is running.',
        data: null,
      });
      return;
    }

    const [totalScans, deepfakeCount, authenticCount, reviewCount, aggregateConfidence, anomalyStats, orientationStats] =
      await Promise.all([
        Scan.countDocuments(),
        Scan.countDocuments({ result: 'DEEPFAKE (FAKE)' }),
        Scan.countDocuments({ result: 'REAL HUMAN (AUTHENTIC)' }),
        Scan.countDocuments({ result: 'REVIEW REQUIRED' }),
        Scan.aggregate([
          {
            $group: {
              _id: null,
              avgConfidence: { $avg: '$confidence' },
            },
          },
        ]),
        Scan.aggregate([
          { $unwind: '$detectedAnomalies' },
          { $group: { _id: '$detectedAnomalies', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 6 },
        ]),
        Scan.aggregate([
          { $group: { _id: '$orientation', count: { $sum: 1 } } },
        ]),
      ]);

    const avgConfidence = aggregateConfidence[0]?.avgConfidence
      ? Number(aggregateConfidence[0].avgConfidence.toFixed(2))
      : 99.4;

    const deepfakePercentage = totalScans > 0 ? Number(((deepfakeCount / totalScans) * 100).toFixed(1)) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalScans,
        deepfakeCount,
        authenticCount,
        reviewCount,
        deepfakePercentage,
        averageConfidence: avgConfidence,
        topAnomalies: anomalyStats.map((item) => ({ name: item._id, count: item.count })),
        orientationDistribution: orientationStats.map((item) => ({ orientation: item._id || 'LANDSCAPE', count: item.count })),
        systemStatus: 'ONLINE (MongoDB Synchronized)',
        databaseEngine: 'MongoDB 8+ / Mongoose',
      },
    });
  } catch (error: any) {
    console.error('Error calculating analytics:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
