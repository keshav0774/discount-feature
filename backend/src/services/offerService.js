import { Offer } from '../models/Offer.js';
export async function getActiveOffer(offerId) {
  const now = new Date();
  const offer = await Offer.findOne({ _id: offerId, isActive: true, startsAt: { $lte: now }, expiresAt: { $gt: now } });
  if (!offer) { const error = new Error('Active offer not found or expired'); error.statusCode = 404; throw error; }
  return offer;
}
export async function resolveOffer(offerId) {
  if (offerId) return getActiveOffer(offerId);
  const now = new Date();
  const offer = await Offer.findOne({ courseId: process.env.DEFAULT_COURSE_ID, isActive: true, startsAt: { $lte: now }, expiresAt: { $gt: now } }).sort({ expiresAt: 1 });
  if (!offer) { const error = new Error('No active default offer found'); error.statusCode = 404; throw error; }
  return offer;
}
