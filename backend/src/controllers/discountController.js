import { resolveOffer, getActiveOffer } from '../services/offerService.js';
import { submitChallenge } from '../services/challengeService.js';
import { generateReward, getRewardStatus } from '../services/rewardService.js';
import { UserOffer } from '../models/UserOffer.js';
import { challengeData } from '../data/challenges.js';

const userIdFor = (req) => String(req.user._id);
const result = (res, body) => res.json({ success: true, ...body });

export function randomChallenge(req, res) {
  const choices = challengeData[req.params.type];
  if (!choices) return res.status(404).json({ success: false, message: 'Challenge type not found' });
  result(res, { challenge: choices[Math.floor(Math.random() * choices.length)] });
}

export async function submit(req, res, next) {
  try {
    const { challengeId, offerId } = req.body;
    if (!challengeId) return res.status(400).json({ success: false, message: 'challengeId is required' });
    const offer = await resolveOffer(offerId);
    result(res, await submitChallenge({ userId: userIdFor(req), offerId: offer._id, challengeType: req.discountChallengeType, challengeId }));
  } catch (error) { next(error); }
}

export async function skip(req, res, next) {
  try {
    const offer = await resolveOffer(req.body.offerId);
    result(res, { reward: await generateReward(userIdFor(req), offer._id, { skipped: true }) });
  } catch (error) { next(error); }
}

export async function status(req, res, next) {
  try {
    const offer = await resolveOffer(req.query.offerId);
    const reward = await getRewardStatus(userIdFor(req), offer._id);
    result(res, reward ? { hasReward: true, reward } : { hasReward: false });
  } catch (error) { next(error); }
}

export async function validateCoupon(req, res, next) {
  try {
    const couponCode = String(req.body.couponCode || '').trim().toUpperCase();
    if (!couponCode) return res.status(400).json({ success: false, message: 'couponCode is required' });
    const offer = await resolveOffer(req.body.offerId);
    const reward = await UserOffer.findOne({ userId: userIdFor(req), offerId: offer._id, couponCode });
    if (!reward) return res.status(404).json({ success: false, message: 'Coupon not found for this user and offer' });
    if (reward.status === 'used') return res.status(409).json({ success: false, message: 'Coupon has already been used' });
    result(res, { valid: true, reward: { discountPercent: reward.unlockedDiscount, couponCode: reward.couponCode, offerId: String(offer._id), expiresAt: offer.expiresAt } });
  } catch (error) { next(error); }
}

// Foundation only: checkout/application remains outside this hackathon scope.
export async function claim(req, res, next) {
  try {
    const offer = await resolveOffer(req.body.offerId);
    const reward = await UserOffer.findOne({ userId: userIdFor(req), offerId: offer._id, status: 'unlocked' });
    if (!reward) return res.status(404).json({ success: false, message: 'No claimable reward found' });
    reward.status = 'claimed'; await reward.save();
    result(res, { reward: { discountPercent: reward.unlockedDiscount, couponCode: reward.couponCode, offerId: String(offer._id), expiresAt: offer.expiresAt, status: reward.status } });
  } catch (error) { next(error); }
}
