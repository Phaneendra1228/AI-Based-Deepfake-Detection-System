import mongoose, { Schema, Document } from 'mongoose';

export interface ITelemetry extends Document {
  date: string;
  totalScans: number;
  deepfakeCount: number;
  authenticCount: number;
  reviewCount: number;
  averageConfidence: number;
  activeThreatsBlocked: number;
  updatedAt: Date;
}

const TelemetrySchema: Schema = new Schema(
  {
    date: { type: String, required: true, unique: true },
    totalScans: { type: Number, default: 0 },
    deepfakeCount: { type: Number, default: 0 },
    authenticCount: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    averageConfidence: { type: Number, default: 99.4 },
    activeThreatsBlocked: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Telemetry = mongoose.model<ITelemetry>('Telemetry', TelemetrySchema);
