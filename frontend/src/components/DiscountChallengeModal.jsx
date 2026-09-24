import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChallengeCard from './ChallengeCard.jsx';
import ChallengeTimer from './ChallengeTimer.jsx';
import DiscountReveal from './DiscountReveal.jsx';
import TerminalLines from './TerminalLines.jsx';
import { DiscountAPI } from '../api/discountApi.js';
import { useCountdown } from '../hooks/useCountdown.js';

const CHALLENGES = [
  {
    id: 'dsa',
    accent: 'dsa',
    icon: '{ }',
    title: 'Solve Strikes PTOD',
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

const PROTOCOL_LINES = ['scanning...', 'user detected', 'challenge available', 'reward locked'];

function formatCooldownLabel(cooldownEndsAt) {
  const remaining = Math.max(0, cooldownEndsAt - Date.now());
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  if (days > 0) return `${days}d ${hours}h`;
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes}m`;
}

// small reusable close button used across every stage of the modal
function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className="absolute top-6 right-6 w-8 h-8 rounded-full bg-bg-card border border-border text-text-dim flex items-center justify-center hover:text-text hover:border-border-bright z-10"
    >
      ✕
    </button>
  );
}

export default function DiscountChallengeModal({ open, onClose }) {
  const [stage, setStage] = useState('select');
  const [loadingText, setLoadingText] = useState('');
  const [task, setTask] = useState(null);
  const [taskError, setTaskError] = useState('');
  const [result, setResult] = useState(null);
  const [solutionText, setSolutionText] = useState('');
  const [cooldownEndsAt, setCooldownEndsAt] = useState(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  const timer = useCountdown(handleTimeout);

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
        setStage('protocol');
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
    setSelectedChallengeId(null);
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

 
  function confirmChallengeSelection() {
    if (!selectedChallengeId) return;
    handleSelectChallenge(selectedChallengeId);
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
      setLoadingText('// Launching Console Result');

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
      className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-sm flex items-center sm:items-center justify-center p-0 sm:p-6"
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
      

        {stage === 'protocol' && (
  <div className="relative px-6 sm:px-10 py-14 sm:py-16 text-center overflow-hidden">
    <CloseButton onClick={handleClose} />

    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute left-1/2 top-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl"
        animate={{
          scale: [0.8, 1.15, 0.8],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>

    <div className="relative mx-auto w-full max-w-[390px]">
      <div className="font-mono text-[9px] tracking-[0.25em] text-text-faint mb-4">
        UNKNOWN SIGNAL DETECTED
      </div>

      <div className="relative h-[250px] flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${130 + i * 45}px`,
              height: `${130 + i * 45}px`,
            }}
            animate={{
              scale: [0.92, 1.04, 0.92],
              opacity: [0.18, 0.45, 0.18],
              rotate: i % 2 ? -360 : 360,
            }}
            transition={{
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              opacity: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 18 + i * 4,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          />
        ))}

        <div className="relative z-10 bg-[#050505] border border-border-bright rounded-md p-6 w-[230px] text-left shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
          <div className="font-mono text-[10px] text-text-faint tracking-[0.15em] mb-3">
            REWARD PROTOCOL
            <span className="text-text-dim"> // LOCKED</span>
          </div>

          <TerminalLines lines={PROTOCOL_LINES} />
        </div>
      </div>

      <div className="font-mono text-[9px] text-text-faint tracking-[0.12em] mb-5">
        COMPLETE ONE PATH TO ACCESS YOUR REWARD
      </div>

      <button
        onClick={() => setStage('select')}
        className="font-semibold text-[13.5px] bg-white text-black px-7 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        INITIALIZE →
      </button>
    </div>
  </div>
)}


        {stage === 'cooldown' && (
          <div className="px-8 py-16 text-center relative">
            <CloseButton onClick={handleClose} />

            <div className="w-[70px] h-[70px] mx-auto mb-5 rounded-full border border-border-bright bg-bg-card flex items-center justify-center text-2xl">
              🔒
            </div>

            <div className="font-mono text-[11px] text-text-faint tracking-wide mb-2">
              REWARD PROTOCOL // LOCKED
            </div>

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

        

        {stage === 'select' && (
  <>
    {/* Header */}
    <div className="relative px-6 sm:px-8 pt-7 pb-3">
      <CloseButton onClick={handleClose} />

      {/* protocol status */}
      <div className="flex items-center gap-2 mb-5">
        <span className="font-mono text-[9px] tracking-[0.2em] text-text-faint">
          REWARD PROTOCOL
        </span>

        <span className="font-mono text-[8px] tracking-wide text-success bg-success/10 border border-success/30 px-2 py-0.5 rounded-full">
          STATUS: ACTIVE
        </span>
      </div>

      {/* terminal lines */}
      <div className="mb-7">
        <TerminalLines
          lines={PROTOCOL_LINES}
          className="text-[10px] leading-[1.7]"
        />
      </div>

      {/* heading */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[9px] tracking-[0.22em] text-text-faint mb-2">
            REWARD PROTOCOL // ACCESS PATHS 04
          </div>

          <div className="font-display font-bold text-xl sm:text-2xl mb-2">
            Choose your unlock path
          </div>

          <div className="text-text-dim text-[12.5px]">
            Complete one developer challenge to unlock your reward.
          </div>
        </div>

        <div className="hidden sm:block font-mono text-[8px] text-text-faint tracking-[0.15em] whitespace-nowrap">
          4 PATHS // 1 REWARD
        </div>
      </div>

      <div className="text-text-dim text-[12px] mt-3">
        Select one challenge, then confirm to begin.
      </div>
    </div>

    {/* challenge paths */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 px-6 sm:px-8 pt-5 pb-4">
      {CHALLENGES.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          {...challenge}
          selected={selectedChallengeId === challenge.id}
          onSelect={setSelectedChallengeId}
        />
      ))}
    </div>

    {/* error */}
    {taskError && (
      <div className="mx-6 sm:mx-8 mb-3 bg-danger/10 border border-danger/30 text-danger text-[12px] px-3.5 py-2.5 rounded-sm">
        {taskError}
      </div>
    )}

    {/* start */}
    <div className="px-6 sm:px-8 pb-4">
      <motion.button
        onClick={confirmChallengeSelection}
        disabled={!selectedChallengeId}
        whileHover={selectedChallengeId ? { scale: 1.005 } : undefined}
        whileTap={selectedChallengeId ? { scale: 0.995 } : undefined}
        className={
          'relative w-full overflow-hidden font-semibold text-[13px] ' +
          'py-3 rounded-full transition-all duration-300 ' +
          (selectedChallengeId
            ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:shadow-[0_0_35px_rgba(255,255,255,0.2)]'
            : 'bg-[#555] text-[#151515] opacity-70 cursor-not-allowed')
        }
      >
        {selectedChallengeId && (
          <motion.span
            className="absolute inset-y-0 w-20 bg-white/40 blur-xl"
            initial={{ x: '-120%' }}
            animate={{ x: '500%' }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'linear',
            }}
          />
        )}

        <span className="relative">
          START CHALLENGE →
        </span>
      </motion.button>
    </div>

    {/* footer */}
    <div className="px-6 sm:px-8 pt-4 pb-6 border-t border-border mt-1 flex items-center justify-between flex-wrap gap-3">
      <span className="text-[11px] text-text-faint">
        A new problem is picked for you every day.
      </span>

      <button
        onClick={handleSkip}
        className="text-text-dim underline underline-offset-4 decoration-border-bright hover:text-text hover:decoration-text-dim text-[12px] font-semibold transition-colors"
      >
        Skip &amp; Get 20% OFF
      </button>
    </div>
  </>
)}

       
        {stage === 'loading' && (
  <div className="relative min-h-[360px] flex flex-col items-center justify-center px-8 overflow-hidden">
    {/* Ambient signal */}
    <motion.div
      className="absolute w-40 h-40 rounded-full bg-white/[0.035] blur-3xl"
      animate={{
        scale: [0.8, 1.15, 0.8],
        opacity: [0.2, 0.45, 0.2],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    {/* Radar rings */}
    <div className="relative w-24 h-24 flex items-center justify-center mb-7">
      {[0, 0.8, 1.6].map((delay, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-white/15"
          style={{
            width: `${48 + index * 22}px`,
            height: `${48 + index * 22}px`,
          }}
          animate={{
            scale: [0.8, 1.25],
            opacity: [0.45, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeOut',
            delay,
          }}
        />
      ))}

      {/* Core */}
      <motion.div
        className="relative z-10 w-10 h-10 rounded-full border border-white/30 bg-white/[0.04] flex items-center justify-center"
        animate={{
          boxShadow: [
            '0 0 0 rgba(255,255,255,0)',
            '0 0 25px rgba(255,255,255,0.15)',
            '0 0 0 rgba(255,255,255,0)',
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      </motion.div>
    </div>

    {/* Protocol label */}
    <div className="font-mono text-[9px] tracking-[0.22em] text-text-faint mb-3">
      REWARD PROTOCOL // PROCESSING
    </div>

    {/* Dynamic loading message */}
    <motion.div
      key={loadingText}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-mono text-[12px] text-text-dim text-center"
    >
      <span className="text-text-faint">&gt;</span>{' '}
      {loadingText.replace(/^\/\/\s*/, '')}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
        }}
      >
        _
      </motion.span>
    </motion.div>

    {/* Processing line */}
    <div className="w-[220px] h-px bg-border mt-5 overflow-hidden">
      <motion.div
        className="h-full bg-white/50"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  </div>
)}
        {stage === 'run' && task && problem && (
  <div className="px-5 sm:px-8 pt-6 pb-8">

    {/* Top navigation / timer */}
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => {
          reset();
        }}
        className="group flex items-center gap-2 font-mono text-[10px] tracking-wide text-text-faint hover:text-text transition-colors bg-transparent border-none"
      >
        <span className="text-text-dim group-hover:-translate-x-0.5 transition-transform">
          ←
        </span>
        BACK TO CHALLENGES
      </button>

      <ChallengeTimer
        label={timer.label}
        urgent={timer.remaining <= 30}
      />
    </div>

    {/* Protocol header */}
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />

          <span className="font-mono text-[9px] tracking-[0.2em] text-text-faint">
            REWARD PROTOCOL // CHALLENGE ACTIVE
          </span>
        </div>

        <h2 className="font-display font-bold text-xl sm:text-2xl text-text">
          {problem.title}
        </h2>
      </div>

      <span className="hidden sm:block font-mono text-[9px] tracking-[0.15em] text-text-faint">
        SOLUTION REQUIRED
      </span>
    </div>

    {/* Problem statement */}
    <div className="relative bg-[#050505] border border-border-bright rounded-md p-5 mb-4 overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="font-mono text-[9px] tracking-[0.18em] text-text-faint mb-3">
        PROBLEM // STATEMENT
      </div>

      <div className="text-[13px] sm:text-[13.5px] text-text-dim leading-[1.8]">
        {statementText}
      </div>
    </div>

    {/* Code block */}
    {problem.code && (
      <div className="relative bg-[#050505] border border-border-bright rounded-md mb-4 overflow-hidden">

        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-[#080808]">
          <span className="font-mono text-[9px] tracking-[0.16em] text-text-faint">
            SOURCE // CODE
          </span>

          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          </div>
        </div>

        <pre className="p-4 sm:p-[18px] font-mono text-[11.5px] sm:text-[12px] text-text-dim leading-[1.7] overflow-x-auto whitespace-pre">
          {problem.code.trim()}
        </pre>
      </div>
    )}

    {/* Error / feedback */}
    {taskError && (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-danger/5 border border-danger/30 text-danger text-[12px] px-4 py-3 rounded-md mt-1 mb-4"
      >
        <div className="font-mono text-[9px] tracking-[0.15em] mb-1 opacity-70">
          VALIDATION // FEEDBACK
        </div>

        {taskError}
      </motion.div>
    )}

    {/* Solution console */}
    <div className="relative bg-[#050505] border border-border-bright rounded-md overflow-hidden">

      {/* Console header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[#080808]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />

          <span className="font-mono text-[9px] tracking-[0.18em] text-text-faint">
            SOLUTION // CONSOLE
          </span>
        </div>

        <span className="font-mono text-[8px] text-text-faint">
          INPUT REQUIRED
        </span>
      </div>

      {/* Instruction */}
      <div className="px-4 pt-4">
        <p className="font-mono text-[10.5px] text-text-faint leading-relaxed mb-3">
          &gt; Work through the challenge and submit your solution
          to unlock the reward.
        </p>
      </div>

      {/* Textarea */}
      <div className="px-4 pb-4">
        <textarea
          value={solutionText}
          onChange={(e) => {
            setSolutionText(e.target.value);
            setTaskError('');
          }}
          placeholder="// write your solution here..."
          className="w-full min-h-[220px] bg-[#030303] border border-border rounded-md p-4 font-mono text-[12.5px] text-text-dim leading-relaxed outline-none focus:border-white/30 focus:ring-1 focus:ring-white/5 placeholder:text-text-faint/50 resize-y transition-all"
          spellCheck={false}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-2.5 px-4 pb-4">

        <button
          onClick={() => {
            reset();
          }}
          className="flex-1 text-center py-3 rounded-md font-mono text-[11px] tracking-wide bg-bg-card text-text-dim border border-border hover:text-text hover:border-border-bright transition-colors"
        >
          CANCEL
        </button>

        <button
          onClick={handleSubmitSolution}
          disabled={!solutionText.trim()}
          className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-[12px] bg-white text-black transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          SUBMIT SOLUTION

          <span className="group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </button>

      </div>
    </div>

    {/* Bottom protocol status */}
    <div className="flex items-center justify-between mt-4 px-1">
      <span className="font-mono text-[8.5px] tracking-[0.12em] text-text-faint">
        REWARD STATUS // LOCKED
      </span>

      <span className="font-mono text-[8.5px] tracking-[0.12em] text-text-faint">
        SUBMIT TO VERIFY
      </span>
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