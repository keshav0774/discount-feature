import redisClient from "../config/redis";


export async function submit(req, res, next) {
  try {
    const { challengeId, offerId } = req.body;

    if (!challengeId) {
      return res.status(400).json({
        success: false,
        message: 'challengeId is required'
      });
    }

    const ip = req.ip;

    const key = `discount:claim:${hashIp(ip)}`;

    // Already claimed?
    const existingReward = await redisClient.get(key);

    if (existingReward) {
      return result(res, {
        message: 'Discount already claimed',
        reward: JSON.parse(existingReward)
      });
    }

    // Generate new reward
    const reward = generateReward({
      challengeId,
      challengeType: req.discountChallengeType
    });

    // Store in Redis
    await redisClient.set(
      key,
      JSON.stringify(reward),
      {
        EX: 60 * 60 * 24 * 7,
        NX: true
      }
    );

    // Read again so concurrent request gets the same reward
    const savedReward = await redisClient.get(key);

    result(res, {
      message: 'Discount unlocked',
      reward: JSON.parse(savedReward)
    });

  } catch (error) {
    next(error);
  }
}


export async function (req, res, next) {
  try {
    const couponCode = String(req.body.couponCode || '')
      .trim()
      .toUpperCase();

    if (!couponCode) {
      return res.status(400).json({
        success: false,
        message: 'couponCode is required'
      });
    }

    const key = `discount:coupon:${couponCode}`;

    const coupon = await redisc.get(key);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired coupon'
      });
    }

    const reward = JSON.parse(coupon);

    result(res, {
      valid: true,
      reward: {
        couponCode,
        discountPercent: reward.discountPercent
      }
    });

  } catch (error) {
    next(error);
  }
}