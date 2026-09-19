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
    title: 'Debug the Backend',
    desc: 'Find and fix the bug in a frontend or backend code snippet.',
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
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [taskError, setTaskError] = useState('');
  const [result, setResult] = useState(null); // { solved, discountValue, couponCode, expiresAt }

  const timer = useCountdown(handleTimeout);

  function reset() {
    setStage('select');
    setTask(null);
    setSelectedOptionId(null);
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

  async function handleSubmitAnswer() {
    if (!selectedOptionId || !task) return;
    timer.stop();
    setStage('loading');
    setLoadingText('// verifying your answer…');
    const chosen = task.options.find((o) => o.id === selectedOptionId);
    const res = await DiscountAPI.completeChallenge(task.taskId, chosen?.correct === true);

    if (!res.success) {
      setStage('run');
      setTaskError('That wasn\u2019t correct — try another option or cancel to take the base discount.');
      timer.start(60); // small grace window, mock only
      return;
    }

    setResult({ solved: true, ...res });
    setStage('reveal');
  }

  if (!open) return null;

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
              <span className="text-[12.5px] text-text-faint">Discount range is set by Strike and verified server-side.</span>
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

        {stage === 'run' && task && (
          <div className="px-8 pt-7 pb-8">
            <div className="flex items-center justify-between mb-4.5 mb-[18px]">
              <button
                onClick={() => { reset(); }}
                className="text-text-faint text-[13px] hover:text-text-dim bg-transparent border-none"
              >
                ← Back to challenges
              </button>
              <ChallengeTimer label={timer.label} urgent={timer.remaining <= 30} />
            </div>

            <div className="bg-[#0a0a0c] border border-border rounded-md p-4.5 p-[18px] font-mono text-[13px] text-text-dim mb-4.5 mb-[18px] leading-relaxed">
              <div><span className="text-text-dim">function</span> <span className="text-text">isValid</span>(arr) {'{'}</div>
              <div>&nbsp;&nbsp;<span className="text-text-dim">return</span> {task.prompt.line2}</div>
              <div>{'}'}</div>
              <div className="mt-2.5 text-text-faint">// {task.prompt.question}</div>
            </div>

            <div className="grid gap-2 mt-3.5">
              {task.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setSelectedOptionId(opt.id); setTaskError(''); }}
                  className={
                    'text-left bg-bg-card border rounded-sm px-3.5 py-3 font-mono text-[12.5px] transition-colors ' +
                    (selectedOptionId === opt.id
                      ? 'border-accent text-text bg-accent-soft'
                      : 'border-border text-text-dim hover:border-border-bright hover:text-text')
                  }
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {taskError && (
              <div className="bg-danger/10 border border-danger/30 text-danger text-[12.5px] px-3.5 py-2.5 rounded-sm mt-3">
                {taskError}
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => { reset(); }}
                className="flex-1 text-center py-3 rounded-sm bg-bg-card text-text-dim border border-border hover:text-text hover:border-border-bright"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="flex-1 text-center py-3 rounded-sm font-semibold bg-text text-bg disabled:opacity-30 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
              >
                Submit Answer
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
