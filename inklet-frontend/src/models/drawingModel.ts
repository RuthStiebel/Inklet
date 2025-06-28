import mongoose, { Schema, Document, Model } from "mongoose";

export interface Drawing extends Document {
  reference_image_url: string;
  user_drawing_url?: string;
  score?: number;
  drawing_time_seconds?: number;
  canvas_data?: string;
}

const DrawingSchema: Schema<Drawing> = new Schema({
  reference_image_url: {
    type: String,
    required: true,
    description: "URL of the original reference image",
  },
  user_drawing_url: {
    type: String,
    description: "URL of the user's drawing",
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    description: "Similarity score between reference and user drawing",
  },
  drawing_time_seconds: {
    type: Number,
    description: "Time spent drawing in seconds",
  },
  canvas_data: {
    type: String,
    description: "JSON string of canvas drawing data for replay",
  },
});

export const DrawingModel: Model<Drawing> = mongoose.model<Drawing>(
  "Drawing",
  DrawingSchema
);
