import mongoose from 'mongoose';
const offerSchema = new mongoose.Schema({
  courseId: { type: String, required: true, index: true },
  minDiscount: { type: Number, required: true, min: 1, max: 100 },
  maxDiscount: { type: Number, required: true, min: 1, max: 100 },
  startsAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
offerSchema.pre('validate', function validateRange(next) {
  if (this.minDiscount > this.maxDiscount) return next(new Error('minDiscount cannot exceed maxDiscount'));
  if (this.startsAt >= this.expiresAt) return next(new Error('expiresAt must be after startsAt'));
  next();
});
export const Offer = mongoose.model('Offer', offerSchema);
