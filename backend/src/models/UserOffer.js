import mongoose from 'mongoose';
const userOfferSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  unlockedDiscount: { type: Number, required: true, min: 1, max: 100 },
  couponCode: { type: String, required: true, uppercase: true },
  status: { type: String, enum: ['unlocked', 'claimed', 'used'], default: 'unlocked' }
}, { timestamps: true });
userOfferSchema.index({ userId: 1, offerId: 1 }, { unique: true });
userOfferSchema.index({ couponCode: 1, offerId: 1 });
export const UserOffer = mongoose.model('UserOffer', userOfferSchema);
