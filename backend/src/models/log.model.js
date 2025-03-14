import { model, Schema } from 'mongoose';

export const LogSchema = new Schema(
  {
    itemId: { type: String, required: true },
    appVersion: { type: String, required: false },
    eventType: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    release: { type: String, required: true },
    sdk: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const LogModel = model('log', LogSchema);
// mongodb Collection naming will be 'items' (Add 's' end of name automatically)
