import { model, Schema } from 'mongoose';

export const WaitingSchema = new Schema(
  {
    numberId: { type: Number, required: true },
    source: { type: String, required: true },
    note: { type: String, required: false },
    url: { type: String, required: true },
    priority: { type: Number, required: false },
    assign: { type: String, required: false },
    status: { type: String, required: false },
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

export const WaitingModel = model('waiting', WaitingSchema);
// mongodb Collection naming will be 'items' (Add 's' end of name automatically)
