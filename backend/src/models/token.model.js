import { model, Schema } from 'mongoose';

const TokenSchema = new Schema({
  userId: { type: String, required: true ,unique:true },
  email: { type: String, required: true },
  token: { type:String, required: true},
  createdAt: {type: Date, default: Date.now(), expires: 900} // 15 minutes, same as UserSchema(verifiedDate)
  // createdAt: {type: Date, default: Date.now(), index: { expires: 180 }}
  // createdAtExpireAfter300s: { type: Date, default: 0, expires: 120 } // 300 seconds = 5 minutes.
});

export const TokenModel = model('token', TokenSchema);