import {
  dsaChallenges,
  promptChallenges,
  systemDesignChallenges,
  vulnerabilityChallenges,
} from '../data/problems.js';

function pickDaily(array) {
  const day = new Date().getDate();
  const index = (day - 1) % array.length;
  return array[index];
}

export function getDsaProblem() {
  return pickDaily(dsaChallenges);
}

export function getPromptProblem() {
  return pickDaily(promptChallenges);
}

export function getSystemDesignProblem() {
  return pickDaily(systemDesignChallenges);
}

export function getVulnerabilityProblem() {
  return pickDaily(vulnerabilityChallenges);
}