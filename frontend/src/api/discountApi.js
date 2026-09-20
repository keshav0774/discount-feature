import {
  getDsaProblem,
  getPromptProblem,
  getSystemDesignProblem,
  getVulnerabilityProblem,
} from '../utils/dailyChallenge.js';
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DiscountAPI = {
  
  async getStatus() {
    await wait(200);
    return { active: false };
  },


  async skip() {
    await wait(500);
    return {
      discountValue: 20,
      couponCode: 'STRIKE20',
      expiresAt: Date.now() + 5 * 60 * 1000,
    };
  },

  
  async startChallenge(challengeId) {
  await wait(400);

  const getters = {
    dsa: getDsaProblem,
    ai: getPromptProblem,
    debug: getSystemDesignProblem, 
    security: getVulnerabilityProblem,
  };

  const getProblem = getters[challengeId];
  if (!getProblem) throw new Error('Unknown challenge: ' + challengeId);

  const problem = getProblem();

  return {
    taskId: problem.id,
    timeLimitSec: 5 * 60,
    problem, 
  };
},

 
  async completeChallenge(taskId) {
     await wait(500);
     const discountValue = 27; // ya pickDiscount() jo pehle bana tha
     const result = {
     discountValue,
     couponCode: 'STRIKE' + discountValue,
      expiresAt: Date.now() + 5 * 60 * 1000,
   };
   writeState({ solved: true, success: true, ...result });
    return { success: true, ...result };
 },
};
