import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // spring smooths the raw mouse position into a trailing motion
  const x = useSpring(mouseX, { damping: 28, stiffness: 180, mass: 0.6 });
  const y = useSpring(mouseY, { damping: 28, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    function handleMove(e) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] w-[420px] h-[420px] rounded-full"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(245,245,246,0.08) 0%, rgba(245,245,246,0.03) 45%, transparent 70%)',
        filter: 'blur(40px)',
        mixBlendMode: 'screen',
      }}
    />
  );
}