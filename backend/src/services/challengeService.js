import { ChallengeAttempt } from '../models/ChallengeAttempt.js';
import { challengeData } from '../data/challenges.js';
import { generateReward } from './rewardService.js';





export async function submitChallenge({ userId, offerId, challengeType, challengeId }) {
  const challenge = challengeData[challengeType]?.find((item) => item.id === String(challengeId));
  if (!challenge) { const error = new Error('Challenge not found'); error.statusCode = 404; throw error; }
  await ChallengeAttempt.create({ userId, offerId, challengeType, challengeId: String(challengeId), status: 'completed' });
  const reward = await generateReward(userId, offerId);
  return { evaluation: { status: 'under_construction', message: 'This feature is under construction; the demo challenge is marked completed.' }, reward };
}
