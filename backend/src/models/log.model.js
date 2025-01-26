import { model, Schema } from 'mongoose';

export const LogSchema = new Schema(
  {
    itemId: { type: String, required: true },
    eventType: { type: String, required: true },
    userDevice: { type: String, required: true },
    userCountry: { type: String, required: true },
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
