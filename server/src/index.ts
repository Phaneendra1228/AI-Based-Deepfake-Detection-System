import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase, isDbConnected } from './config/db.js';
import { scansRouter } from './routes/scans.js';
import { analyticsRouter } from './routes/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*', // Allow all origins for dev/production flexibility
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    version: '1.0.0',
    service: 'DeepGuard AI Deepfake Detection Engine',
    database: isDbConnected() ? 'connected (MongoDB)' : 'disconnected',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

// Mount Routes
app.use('/api/scans', scansRouter);
app.use('/api/analytics', analyticsRouter);

// Root informational endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'DeepGuard AI Forensic API is operational',
    endpoints: {
      health: '/api/health',
      scans: '/api/scans',
      analytics: '/api/analytics/summary',
    },
    database: isDbConnected() ? 'MongoDB Connected' : 'MongoDB Not Connected',
  });
});

// Start Server & Connect to Database
const startServer = async () => {
  console.log('🚀 Starting DeepGuard AI Backend Service...');
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🌐 [DeepGuard Backend] Server running on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔍 Scans API: http://localhost:${PORT}/api/scans`);
    console.log(`📊 Analytics API: http://localhost:${PORT}/api/analytics/summary`);
  });
};

startServer().catch((err) => {
  console.error('Fatal Server Error:', err);
});
