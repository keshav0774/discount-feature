import { useState, useEffect } from 'react';
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
    id: 'System_Design',
    accent: 'System_Design',
    icon: '🐞',
    title: 'System Design Challenge',
    desc: 'Design a system for the given problem before the timer runs out.',
    meta: ['20-25 min'],
  },
  {
    id: 'security',
    accent: 'security',
    icon: '🛡',
    title: 'Find the Vulnerability',
    desc: 'Identify the security vulnerability before the timer runs out.',
    meta: ['15–20 min'],
  },
];

function formatCooldownLabel(cooldownEndsAt) {
  const remaining = Math.max(0, cooldownEndsAt - Date.now());
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  if (days > 0) return `${days}d ${hours}h`;
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes}m`;
}

export default function DiscountChallengeModal({ open, onClose }) {
  const [stage, setStage] = useState('select');
  const [loadingText, setLoadingText] = useState('');
  const [task, setTask] = useState(null);
  const [taskError, setTaskError] = useState('');
  const [result, setResult] = useState(null);
  const [solutionText, setSolutionText] = useState('');
  const [cooldownEndsAt, setCooldownEndsAt] = useState(null);

  const timer = useCountdown(handleTimeout);

  // Whenever the modal opens, check server-of-truth (localStorage) state first —
  // resume an active coupon, or show the cooldown screen, instead of always
  // starting from the challenge picker.
  useEffect(() => {
    if (!open) return;
    (async () => {
      setStage('loading');
      setLoadingText('// checking your status…');
      const status = await DiscountAPI.getStatus();

      if (status.active) {
        setResult({
          solved: status.solved,
          discountValue: status.discountValue,
          couponCode: status.couponCode,
          expiresAt: status.expiresAt,
        });
        setStage('reveal');
      } else if (status.onCooldown) {
        setCooldownEndsAt(status.cooldownEndsAt);
        setStage('cooldown');
      } else {
        setStage('select');
      }
    })();
  }, [open]);

  function reset() {
    setStage('select');
    setTask(null);
    setTaskError('');
    setResult(null);
    setSolutionText('');
    setLoadingText('');
    setCooldownEndsAt(null);
    timer.stop();
  }

  function handleClose() {
    onClose();
    reset();
  }

  async function handleSkip() {
    try {
      setStage('loading');
      setLoadingText('// applying base discount…');

      const res = await DiscountAPI.skip();

      setResult({
        solved: false,
        ...res,
      });

      setStage('reveal');
    } catch (error) {
      console.error('Skip failed:', error);

      if (error.isCooldown) {
        setCooldownEndsAt(error.cooldownEndsAt);
        setStage('cooldown');
        return;
      }

      setStage('select');
      setTaskError(
        error.message || 'Could not apply the base discount.'
      );
    }
  }

  async function handleSelectChallenge(challengeId) {
    try {
      setStage('loading');
      setLoadingText('// preparing your challenge…');
      setTaskError('');

      const res = await DiscountAPI.startChallenge(challengeId);

      setTask(res);
      setSolutionText('');
      setStage('run');

      timer.start(res.timeLimitSec);
    } catch (error) {
      console.error('Challenge start failed:', error);

      if (error.isCooldown) {
        setCooldownEndsAt(error.cooldownEndsAt);
        setStage('cooldown');
        return;
      }

      setTaskError(
        error.message || 'Could not load the challenge.'
      );

      setStage('select');
    }
  }

  function handleTimeout() {
    setTaskError(
      'Time’s up — falling back to your base discount.'
    );

    setTimeout(() => {
      handleSkip();
    }, 900);
  }

  async function handleSubmitSolution() {
    if (!task || !solutionText.trim()) {
      return;
    }

    try {
      timer.stop();

      setStage('loading');
      setLoadingText('// AI is reviewing your solution…');

      const res = await DiscountAPI.completeChallenge(
        task,
        solutionText
      );

      if (!res.success) {
        setStage('run');

        setTaskError(
          res.feedback ||
            'That doesn’t look complete yet — give it another shot.'
        );

        setSolutionText('');

        timer.start(300);

        return;
      }

      setResult({
        solved: true,
        discountValue: res.discountValue,
        couponCode: res.couponCode,
        expiresAt: res.expiresAt,
      });

      setStage('reveal');
    } catch (error) {
      console.error('Solution validation failed:', error);

      setStage('run');

      setTaskError(
        error.message ||
          'Something went wrong while reviewing your solution.'
      );

      timer.start(300);
    }
  }

  if (!open) {
    return null;
  }

  const problem = task?.problem;

  const statementText =
    problem?.statement ||
    problem?.problemStatement ||
    '';

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-center sm:items-center justify-center p-0 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-bg-elevated border border-border-bright rounded-t-[20px] sm:rounded-lg w-full sm:max-w-[760px] max-h-[92vh] sm:max-h-[88vh] overflow-y-auto shadow-2xl animate-modal-in"
      >
        {/* =========================
            COOLDOWN (already claimed)
        ========================== */}

        {stage === 'cooldown' && (
          <div className="px-8 py-16 text-center">
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-bg-card border border-border text-text-dim flex items-center justify-center hover:text-text hover:border-border-bright"
            >
              ✕
            </button>

            <div className="text-3xl mb-4">🔒</div>

            <div className="font-display font-bold text-xl mb-2">
              You've already claimed your discount
            </div>

            <p className="text-text-dim text-sm">
              Come back in{' '}
              <span className="text-text font-semibold">
                {cooldownEndsAt ? formatCooldownLabel(cooldownEndsAt) : '…'}
              </span>{' '}
              for your next offer.
            </p>
          </div>
        )}

        {/* =========================
            SELECT CHALLENGE
        ========================== */}

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

              <div className="font-display font-bold text-2xl mb-1.5">
                Choose Your Challenge
              </div>

              <div className="text-text-dim text-sm">
                Complete any one challenge to unlock your exclusive
                discount.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 px-8 pt-6 pb-3">
              {CHALLENGES.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  {...challenge}
                  onSelect={handleSelectChallenge}
                />
              ))}
            </div>

            {taskError && (
              <div className="mx-8 mb-3 bg-danger/10 border border-danger/30 text-danger text-[12.5px] px-3.5 py-2.5 rounded-sm">
                {taskError}
              </div>
            )}

            <div className="px-8 pt-5 pb-7 border-t border-border mt-2 flex items-center justify-between flex-wrap gap-3">
              <span className="text-[12.5px] text-text-faint">
                A new problem is picked for you every day.
              </span>

              <button
                onClick={handleSkip}
                className="text-text-dim underline underline-offset-4 decoration-border-bright hover:text-text hover:decoration-text-dim text-sm font-semibold"
              >
                Skip &amp; Get 20% OFF
              </button>
            </div>
          </>
        )}

       

        {stage === 'loading' && (
          <div className="py-16 px-8 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-border border-t-accent mx-auto mb-4 animate-spin-load" />

            <p className="text-text-faint text-[13px] font-mono">
              {loadingText}
            </p>
          </div>
        )}

        {/* =========================
            RUN CHALLENGE
        ========================== */}

        {stage === 'run' && task && problem && (
          <div className="px-8 pt-7 pb-8">
            <div className="flex items-center justify-between mb-[18px]">
              <button
                onClick={() => {
                  reset();
                }}
                className="text-text-faint text-[13px] hover:text-text-dim bg-transparent border-none"
              >
                ← Back to challenges
              </button>

              <ChallengeTimer
                label={timer.label}
                urgent={timer.remaining <= 30}
              />
            </div>

            <div className="font-display font-bold text-lg mb-2">
              {problem.title}
            </div>

            <div className="bg-[#0a0a0c] border border-border rounded-md p-[18px] text-[13.5px] text-text-dim leading-relaxed mb-4">
              {statementText}
            </div>

            {problem.code && (
              <pre className="bg-[#0a0a0c] border border-border rounded-md p-[18px] font-mono text-[12px] text-text-dim leading-relaxed mb-4 overflow-x-auto whitespace-pre">
                {problem.code.trim()}
              </pre>
            )}

            {taskError && (
              <div className="bg-danger/10 border border-danger/30 text-danger text-[12.5px] px-3.5 py-2.5 rounded-sm mt-1 mb-4">
                {taskError}
              </div>
            )}

            <p className="text-text-faint text-[12px] mb-3">
              Work through this challenge on your own, then submit
              your answer to unlock your discount.
            </p>

            <textarea
              value={solutionText}
              onChange={(e) => {
                setSolutionText(e.target.value);
                setTaskError('');
              }}
              placeholder="Write your solution here..."
              className="w-full min-h-[220px] bg-[#0a0a0c] border border-border rounded-md p-4 font-mono text-[13px] text-text-dim outline-none focus:border-border-bright resize-y"
              spellCheck={false}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  reset();
                }}
                className="flex-1 text-center py-3 rounded-sm bg-bg-card text-text-dim border border-border hover:text-text hover:border-border-bright"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitSolution}
                disabled={!solutionText.trim()}
                className="flex-1 text-center py-3 rounded-sm font-semibold bg-text text-bg transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Solution
              </button>
            </div>
          </div>
        )}

        

        {stage === 'reveal' && result && (
          <DiscountReveal
            result={result}
            onCheckout={handleClose}
            onViewCourse={handleClose}
          />
        )}
      </div>
    </div>
  );
}