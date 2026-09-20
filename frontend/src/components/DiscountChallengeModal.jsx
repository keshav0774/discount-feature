import { useState } from 'react';
import ChallengeCard from './ChallengeCard.jsx';
import ChallengeTimer from './ChallengeTimer.jsx';
import DiscountReveal from './DiscountReveal.jsx';
import { DiscountAPI } from '../api/discountApi.js';
import { useCountdown } from '../hooks/useCountdown.js';

const CHALLENGES = [
  {
    id: 'dsa',
    accent: 'dsa',
    icon: '{ }',
    title: 'Solve a DSA Problem',
    desc: 'Solve a coding problem before the timer runs out.',
    meta: ['10–15 min', 'Medium'],
  },
  {
    id: 'ai',
    accent: 'ai',
    icon: '✦',
    title: 'Write an AI Prompt',
    desc: 'Write an effective prompt for an AI assistant based on the given problem statement.',
    meta: ['5–10 min', 'No copy-paste'],
  },
  {
    id: 'debug',
    accent: 'debug',
    icon: '🐞',
    title: 'System Design Challenge',
    desc: 'Design a system for the given problem before the timer runs out.',
    meta: ['10–15 min'],
  },
  {
    id: 'security',
    accent: 'security',
    icon: '🛡',
    title: 'Find the Vulnerability',
    desc: 'Identify the security vulnerability before the timer runs out.',
    meta: ['5–10 min'],
  },
];

// stages: 'select' | 'loading' | 'run' | 'reveal'
export default function DiscountChallengeModal({ open, onClose }) {
  const [stage, setStage] = useState('select');
  const [loadingText, setLoadingText] = useState('');
  const [task, setTask] = useState(null);
  const [taskError, setTaskError] = useState('');
  const [result, setResult] = useState(null); // { solved, discountValue, couponCode, expiresAt }

  const timer = useCountdown(handleTimeout);

  function reset() {
    setStage('select');
    setTask(null);
    setTaskError('');
    setResult(null);
    timer.stop();
  }

  function handleClose() {
    onClose();
    reset();
  }

  async function handleSkip() {
    setStage('loading');
    setLoadingText('// applying base discount…');
    const res = await DiscountAPI.skip();
    setResult({ solved: false, ...res });
    setStage('reveal');
  }

  async function handleSelectChallenge(challengeId) {
    setStage('loading');
    setLoadingText('// preparing your challenge…');
    const res = await DiscountAPI.startChallenge(challengeId);
    setTask(res);
    setStage('run');
    timer.start(res.timeLimitSec);
  }

  function handleTimeout() {
    setTaskError('Time\u2019s up — falling back to your base discount.');
    setTimeout(() => handleSkip(), 900);
  }

  // No MCQ answer to check anymore — these are open-ended problems.
  // The user reads the problem, solves it in their own head/editor,
  // and self-declares completion.
  async function handleMarkSolved() {
    if (!task) return;
    timer.stop();
    setStage('loading');
    setLoadingText('// unlocking your discount…');
    const res = await DiscountAPI.completeChallenge(task.taskId);
    setResult({ solved: true, ...res });
    setStage('reveal');
  }

  if (!open) return null;

  const problem = task?.problem;
  const statementText = problem?.statement || problem?.problemStatement || '';

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-center sm:items-center justify-center p-0 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-bg-elevated border border-border-bright rounded-t-[20px] sm:rounded-lg w-full sm:max-w-[760px] max-h-[92vh] sm:max-h-[88vh] overflow-y-auto shadow-2xl animate-modal-in"
      >
        {stage === 'select' && (
          <>
            <div className="px-8 pt-8 pb-2 relative">
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-bg-card border border-border text-text-dim flex items-center justify-center hover:text-text hover:border-border-bright"
              >
                ✕
              </button>
              <div className="font-display font-bold text-2xl mb-1.5">Choose Your Challenge</div>
              <div className="text-text-dim text-sm">Complete any one challenge to unlock your exclusive discount.</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 px-8 pt-6 pb-3">
              {CHALLENGES.map((c) => (
                <ChallengeCard key={c.id} {...c} onSelect={handleSelectChallenge} />
              ))}
            </div>

            <div className="px-8 pt-5 pb-7 border-t border-border mt-2 flex items-center justify-between flex-wrap gap-3">
              <span className="text-[12.5px] text-text-faint">A new problem is picked for you every day.</span>
              <button onClick={handleSkip} className="text-text-dim underline underline-offset-4 decoration-border-bright hover:text-text hover:decoration-text-dim text-sm font-semibold">
                Skip &amp; Get 20% OFF
              </button>
            </div>
          </>
        )}

        {stage === 'loading' && (
          <div className="py-16 px-8 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-border border-t-accent mx-auto mb-4 animate-spin-load" />
            <p className="text-text-faint text-[13px] font-mono">{loadingText}</p>
          </div>
        )}

        {stage === 'run' && task && problem && (
          <div className="px-8 pt-7 pb-8">
            <div className="flex items-center justify-between mb-[18px]">
              <button
                onClick={() => { reset(); }}
                className="text-text-faint text-[13px] hover:text-text-dim bg-transparent border-none"
              >
                ← Back to challenges
              </button>
              <ChallengeTimer label={timer.label} urgent={timer.remaining <= 30} />
            </div>

            <div className="font-display font-bold text-lg mb-2">{problem.title}</div>

            <div className="bg-[#0a0a0c] border border-border rounded-md p-[18px] text-[13.5px] text-text-dim leading-relaxed mb-4">
              {statementText}
            </div>

            {problem.code && (
              <pre className="bg-[#0a0a0c] border border-border rounded-md p-[18px] font-mono text-[12px] text-text-dim leading-relaxed mb-4 overflow-x-auto whitespace-pre">
                {problem.code.trim()}
              </pre>
            )}

            {taskError && (
              <div className="bg-danger/10 border border-danger/30 text-danger text-[12.5px] px-3.5 py-2.5 rounded-sm mt-1 mb-1">
                {taskError}
              </div>
            )}

            <p className="text-text-faint text-[12px] mb-4">
              Work through this on your own, then mark it solved to unlock your discount.
            </p>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => { reset(); }}
                className="flex-1 text-center py-3 rounded-sm bg-bg-card text-text-dim border border-border hover:text-text hover:border-border-bright"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkSolved}
                className="flex-1 text-center py-3 rounded-sm font-semibold bg-text text-bg transition-opacity hover:opacity-90"
              >
                Mark as Solved
              </button>
            </div>
          </div>
        )}

        {stage === 'reveal' && result && (
          <DiscountReveal
            result={result}
            onCheckout={handleClose /* TODO(routing): navigate to checkout with the applied coupon */}
            onViewCourse={handleClose /* TODO(routing): navigate to the relevant course page */}
          />
        )}
      </div>
    </div>
  );
}