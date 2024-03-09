import { model, Schema } from 'mongoose';

export const ItemSchema = new Schema(
  {
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    freeDownload: { type: Boolean, default: false },
    stars: { type: Number, default: 3 },
    photoType: {type: String, required: true},
    tags: { type: [String] },
    sizeOptions: { type: [String] },
    thumbnail: { type: String, required: true },
    preview: { type: String },
    imageList: { type: [Object] },
    downloadList: { type: [Object], required: true },
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
// mongodb Collection naming will be 'items' (Add 's' end of name automatically)