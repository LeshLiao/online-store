import { model, Schema } from 'mongoose';

export const ItemSchema = new Schema(
  {
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stars: { type: Number, default: 3 },
    thumbnailUrl: { type: String, required: true },
    imageFolder: { type: String, required: true },
    imageList: { type: [String] },
    sizeOptions: { type: [String] },
    favorite: { type: Boolean, default: false },
    tags: { type: [String] },
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

export const ItemModel = model('item', ItemSchema);