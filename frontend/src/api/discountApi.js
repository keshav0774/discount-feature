import {
  getDsaProblem,
  getPromptProblem,
  getSystemDesignProblem,
  getVulnerabilityProblem,
} from '../utlis/dailyChallenge';
import { validateSolution } from './aiValidator.js';

const OFFER_KEY = 'strike_discount_state';
const CLAIM_KEY = 'strike_last_claim';

const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days — change to 4 * 24 * 60 * 60 * 1000 if you want 4
const OFFER_TTL_MS = 5 * 60 * 1000;
const MIN_RANGE = 20;
const MAX_RANGE = 30;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---- current 5-min redeemable offer ----
function readOfferState() {
  try {
    const raw = localStorage.getItem(OFFER_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    if (state.expiresAt && Date.now() >= state.expiresAt) {
      localStorage.removeItem(OFFER_KEY);
      return null;
    }
    return state;
  } catch {
    return null;
  }
}

function writeOfferState(state) {
  localStorage.setItem(OFFER_KEY, JSON.stringify(state));
}

// ---- 7-day claim lock ----
function getCooldownStatus() {
  try {
    const raw = localStorage.getItem(CLAIM_KEY);
    if (!raw) return { onCooldown: false };
    const { claimedAt } = JSON.parse(raw);
    const cooldownEndsAt = claimedAt + COOLDOWN_MS;
    if (Date.now() >= cooldownEndsAt) return { onCooldown: false };
    return { onCooldown: true, cooldownEndsAt };
  } catch {
    return { onCooldown: false };
  }
}

function recordClaim() {
  localStorage.setItem(CLAIM_KEY, JSON.stringify({ claimedAt: Date.now() }));
}

export const DiscountAPI = {
  async getStatus() {
    await wait(150);

    const offer = readOfferState();
    if (offer) {
      return {
        active: true,
        solved: offer.solved,
        discountValue: offer.discountValue,
        couponCode: offer.couponCode,
        expiresAt: offer.expiresAt,
      };
    }

    const cooldown = getCooldownStatus();
    if (cooldown.onCooldown) {
      return { active: false, onCooldown: true, cooldownEndsAt: cooldown.cooldownEndsAt };
    }

    return { active: false, onCooldown: false };
  },

  async skip() {
    const cooldown = getCooldownStatus();
    if (cooldown.onCooldown) {
      const err = new Error('On cooldown');
      err.isCooldown = true;
      err.cooldownEndsAt = cooldown.cooldownEndsAt;
      throw err;
    }

    await wait(500);
    const result = {
      discountValue: MIN_RANGE,
      couponCode: 'STRIKE' + MIN_RANGE,
      expiresAt: Date.now() + OFFER_TTL_MS,
    };
    writeOfferState({ solved: false, ...result });
    recordClaim();
    return result;
  },

  async startChallenge(challengeId) {
    const cooldown = getCooldownStatus();
    if (cooldown.onCooldown) {
      const err = new Error('On cooldown');
      err.isCooldown = true;
      err.cooldownEndsAt = cooldown.cooldownEndsAt;
      throw err;
    }

    await wait(400);

    const getters = {
      dsa: getDsaProblem,
      ai: getPromptProblem,
      System_Design: getSystemDesignProblem,
      security: getVulnerabilityProblem,
    };

    const getProblem = getters[challengeId];
    if (!getProblem) throw new Error('Unknown challenge: ' + challengeId);

    const problem = getProblem();

    return {
      taskId: problem.id,
      timeLimitSec: 10 * 60,
      problem,
    };
  },

  async completeChallenge(task, solutionText) {
    let validation;
    try {
      validation = await validateSolution({
        problem: task.problem,
        solutionText,
        minRange: MIN_RANGE,
        maxRange: MAX_RANGE,
      });
    } catch (err) {
      if (err.isServiceUnavailable) {
        const result = {
          discountValue: MIN_RANGE,
          couponCode: 'STRIKE' + MIN_RANGE,
          expiresAt: Date.now() + OFFER_TTL_MS,
        };
        writeOfferState({ solved: false, ...result });
        recordClaim();
        return {
          success: true,
          feedback: "Our AI reviewer is busy right now — here's your discount anyway.",
          ...result,
        };
      }
      throw err;
    }

    const { solved, discountPercent, feedback } = validation;

    if (!solved) {
      return { success: false, feedback };
    }

    const result = {
      discountValue: discountPercent,
      couponCode: 'STRIKE' + discountPercent,
      expiresAt: Date.now() + OFFER_TTL_MS,
    };
    writeOfferState({ solved: true, success: true, ...result });
    recordClaim();
    return { success: true, feedback, ...result };
  },
};