import test from 'node:test';
import assert from 'node:assert/strict';
import { dsaChallenges } from '../src/data/challenges.js';
test('has exactly thirty DSA challenges in ten groups of three', () => {
  assert.equal(dsaChallenges.length, 30);
  assert.equal(new Set(dsaChallenges.map(({ topic }) => topic)).size, 10);
  for (const topic of new Set(dsaChallenges.map(({ topic }) => topic))) assert.equal(dsaChallenges.filter((item) => item.topic === topic).length, 3);
});
