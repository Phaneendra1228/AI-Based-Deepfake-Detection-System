import mongoose, { Schema, Document } from 'mongoose';

export interface IScan extends Document {
  filename: string;
  fileType: 'image' | 'video';
  fileSize: string;
  fileHash?: string;
  result: 'REAL HUMAN (AUTHENTIC)' | 'DEEPFAKE (FAKE)' | 'REVIEW REQUIRED';
  confidence: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  orientation?: 'PORTRAIT' | 'LANDSCAPE' | 'SQUARE';
  aspectRatioLabel?: string;
  mediaUrl?: string;
  signals?: {
    facialSignal: number;
    pixelSignal: number;
    patternSignal: number;
    temporalSignal: number;
  };
  metrics?: {
    facialConsistency: number;
    pixelConsistency: number;
    visualArtifacts: number;
    frameConsistency: number;
    frequencyAnomaly: number;
    compressionNoise: number;
  };
  detectedAnomalies: string[];
  logs: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ScanSchema: Schema = new Schema(
  {
    filename: { type: String, required: true, index: true },
    fileType: { type: String, enum: ['image', 'video'], default: 'image' },
    fileSize: { type: String, default: '1.0 MB' },
    fileHash: { type: String, index: true },
    result: {
      type: String,
      enum: ['REAL HUMAN (AUTHENTIC)', 'DEEPFAKE (FAKE)', 'REVIEW REQUIRED'],
      required: true,
      index: true,
    },
    confidence: { type: Number, required: true, min: 0, max: 100 },
    riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' },
    orientation: { type: String, enum: ['PORTRAIT', 'LANDSCAPE', 'SQUARE'], default: 'LANDSCAPE' },
    aspectRatioLabel: { type: String, default: '16:9' },
    mediaUrl: { type: String, default: '' },
    signals: {
      facialSignal: { type: Number, default: 95 },
      pixelSignal: { type: Number, default: 95 },
      patternSignal: { type: Number, default: 95 },
      temporalSignal: { type: Number, default: 95 },
    },
    metrics: {
      facialConsistency: { type: Number, default: 95 },
      pixelConsistency: { type: Number, default: 95 },
      visualArtifacts: { type: Number, default: 5 },
      frameConsistency: { type: Number, default: 95 },
      frequencyAnomaly: { type: Number, default: 5 },
      compressionNoise: { type: Number, default: 5 },
    },
    detectedAnomalies: [{ type: String }],
    logs: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Helpful index for sorting and filtering scans
ScanSchema.index({ createdAt: -1 });

export const Scan = mongoose.model<IScan>('Scan', ScanSchema);
