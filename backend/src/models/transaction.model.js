import { model, Schema } from 'mongoose';

export const TransactionSchema = new Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    detail: { type: Object },
    payment: { type: String, required: true },
    paymentData: { type: Object },
    tax: {type: Number, required: true},
    totalPrice: { type: Number, required: true },
    totalCount: { type: Number, required: true },
    reserved: { type: Object },
    dataVersion: { type: String, default: 'v01'},
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

export const TransactionModel = model('transaction', TransactionSchema);