// ============================================================
// TODO(API): This entire file is mock data.
// Replace each function's body with a real fetch() call to the
// Express/Redis backend (/api/discount/*). Keep the same function
// signatures and return shapes so no component needs to change.
//
// The frontend NEVER computes a discount value itself — every
// component only ever displays whatever these functions return.
// ============================================================

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DiscountAPI = {
  // GET /discount/status
  async getStatus() {
    await wait(200);
    return { active: false };
  },

  // POST /discount/skip
  async skip() {
    await wait(500);
    return {
      discountValue: 20,
      couponCode: 'STRIKE20',
      expiresAt: Date.now() + 5 * 60 * 1000,
    };
  },

  // POST /discount/challenge/start   body: { challengeId }
  async startChallenge(challengeId) {
    await wait(600);
    // TODO(API): task content should come from the backend task bank,
    // not be hardcoded here.
    return {
      taskId: 'mock-task-1',
      timeLimitSec: 5 * 60,
      prompt: {
        code: [
          { type: 'kw', text: 'function' },
          { type: 'fn', text: ' isValid' },
          { type: 'plain', text: '(arr) {' },
        ],
        line2: 'return arr.length >= 0;',
        question: 'What should this check actually be, to correctly validate a non-empty array?',
      },
      options: [
        { id: 'a', text: 'arr.length >= 0', correct: false },
        { id: 'b', text: 'arr.length > 0', correct: true },
        { id: 'c', text: 'arr !== null', correct: false },
        { id: 'd', text: 'typeof arr === "array"', correct: false },
      ],
    };
  },

  // POST /discount/challenge/complete   body: { taskId, answerId }
  async completeChallenge(taskId, correct) {
    await wait(700);
    if (!correct) return { success: false };
    // TODO(API): backend picks this from the user's configured (minRange, maxRange]
    const discountValue = 27;
    return {
      success: true,
      discountValue,
      couponCode: 'STRIKE' + discountValue,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };
  },
};
