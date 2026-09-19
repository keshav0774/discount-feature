import { UserOffer } from '../models/UserOffer.js';
import { getActiveOffer } from './offerService.js';
import { cacheJson } from '../config/redis.js';
const developerWords = ['REDIS', 'DOCKER', 'JWT', 'NODE', 'MONGO', 'KAFKA', 'REACT', 'GIT'];
const cacheKey = (userId, offerId) => `discount:reward:${userId}:${offerId}`;
const serialize = (reward, offer) => ({ discountPercent: reward.unlockedDiscount, couponCode: reward.couponCode, offerId: String(reward.offerId), expiresAt: offer.expiresAt, status: reward.status });
async function cacheReward(userId, reward, offer) {
  await cacheJson(cacheKey(userId, reward.offerId), serialize(reward, offer), Math.floor((offer.expiresAt.getTime() - Date.now()) / 1000));
}
export async function generateReward(userId, offerId, { skipped = false } = {}) {
  const existing = await UserOffer.findOne({ userId, offerId });
  const offer = await getActiveOffer(offerId);
  if (existing) { await cacheReward(userId, existing, offer); return serialize(existing, offer); }
  const discount = skipped || offer.minDiscount === offer.maxDiscount ? offer.minDiscount : Math.floor(Math.random() * (offer.maxDiscount - offer.minDiscount)) + offer.minDiscount + 1;
  const couponCode = skipped ? `DISCOUNT${discount}` : `${developerWords[Math.floor(Math.random() * developerWords.length)]}${discount}`;
  try {
    const reward = await UserOffer.create({ userId, offerId: offer._id, unlockedDiscount: discount, couponCode });
    await cacheReward(userId, reward, offer);
    return serialize(reward, offer);
  } catch (error) {
    if (error?.code === 11000) {
      const concurrentReward = await UserOffer.findOne({ userId, offerId });
      if (concurrentReward) { await cacheReward(userId, concurrentReward, offer); return serialize(concurrentReward, offer); }
    }
    throw error;
  }
}
export async function getRewardStatus(userId, offerId) {
  const offer = await getActiveOffer(offerId);
  const reward = await UserOffer.findOne({ userId, offerId });
  if (!reward) return null;
  await cacheReward(userId, reward, offer);
  return serialize(reward, offer);
}
