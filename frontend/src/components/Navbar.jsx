import { motion } from 'framer-motion';

const NAV_ITEMS = [
  'Home',
  'Courses',
  'Practice',
  'CodeArena',
  'Quiz',
  'System Design',
  'Contests',
];

export default function Navbar() {
  function handleNavClick(e, item) {
    // Abhi sirf Courses ka scroll functionality handle kar rahe hain
    if (item !== 'Courses') return;

    e.preventDefault();

    const el = document.getElementById('courses');

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return (
    <nav
      className="
        sticky
        top-0
        z-[100]
        bg-bg/85
        backdrop-blur-md
        border-b
        border-border
        font-sans
      "
    >
      <div
        className="
          max-w-[1180px]
          mx-auto
          px-5
          sm:px-7
          h-[68px]
          flex
          items-center
          justify-between
          gap-6
        "
      >
        {/* STRIKE LOGO */}
        <a
          href="#"
          className="
            relative
            shrink-0
            no-underline
            flex
            items-center
            select-none
          "
        >
          <span
            className="
              text-xl
              sm:text-2xl
              font-bold
              tracking-wider
              text-white
              transition-all
              duration-300
            "
            style={{
              fontFamily: 'Audiowide, cursive',
            }}
          >
            STRIKE
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-1
            bg-bg-card
            border
            border-border
            rounded-full
            p-1
          "
        >
          {NAV_ITEMS.map((item) => {
            const isHome = item === 'Home';

            return (
              <motion.a
                key={item}
                href={
                  item === 'Home'
                    ? '#'
                    : item === 'Courses'
                      ? '#courses'
                      : '#'
                }
                onClick={(e) => handleNavClick(e, item)}
                whileHover={{
                  scale: isHome ? 1 : 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={
                  `
                    font-sans
                    text-[13px]
                    font-medium
                    px-4
                    py-2
                    rounded-full
                    whitespace-nowrap
                    transition-colors
                    duration-200
                  ` +
                  (isHome
                    ? `
                      bg-white
                      text-black
                      font-semibold
                    `
                    : `
                      text-white/70
                      hover:text-white
                    `)
                }
              >
                {item}
              </motion.a>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 shrink-0">

          {/* POINTS */}
          <div
            className="
              flex
              items-center
              gap-1.5
              bg-bg-card
              border
              border-border
              px-3
              py-1.5
              rounded-full
              font-mono
              text-[11.5px]
              text-white/60
            "
          >
            <span className="text-white/80">◆</span>
            <span>0</span>
          </div>

          {/* USER PROFILE */}
          <motion.div
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              w-9
              h-9
              rounded-full
              bg-bg-card
              border
              border-border
              flex
              items-center
              justify-center
              font-sans
              font-semibold
              text-[13px]
              text-white
              cursor-pointer
              transition-colors
              hover:border-white/20
            "
          >
            K
          </motion.div>
        </div>
      </div>
    </nav>
  );
}