import { useState , useEffect} from 'react';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
  {
    title: 'Refactor welcome()',
    desc: 'Extract user fetch and logging into separate utils for better testability.',
  },
  {
    title: 'Add input validation',
    desc: 'Validate user.level against enum: Beginner | Advanced | Expert.',
  },
  {
    title: 'Improve typing',
    desc: 'Define User type and return type for getUser and welcome functions.',
  },
  {
    title: 'Implement error handling',
    desc: 'Add try-catch blocks and custom error messages for async operations.',
  },
  {
    title: 'Add loading states',
    desc: 'Show skeleton loaders while fetching user data for better UX.',
  },
  {
    title: 'Optimize re-renders',
    desc: 'Wrap components with React.memo and use useMemo for expensive calculations.',
  },
];

const THOUGHTS = [
  'Consider debouncing setDisplayedCode typing to save renders.',
  'Memoize highlightCode with code length as key for performance.',
  'Split regex patterns into precompiled list outside component.',
];

function CodeLines() {
  const [visibleLines, setVisibleLines] = useState(0);

  const kw = 'text-[#c586c0]';
  const fn = 'text-[#dcdcaa]';
  const str = 'text-[#ce9178]';
  const cm = 'text-[#6a9955]';
  const plain = 'text-text';

  const lines = [
    <span className={cm}>// Strike Platform - Welcome Code</span>,

    <span>
      <span className={kw}>const</span>{' '}
      <span className={plain}>welcome</span> ={' '}
      <span className={kw}>async</span>{' '}
      <span className={plain}>() =&gt; {'{'}</span>
    </span>,

    <span>
      &nbsp;&nbsp;
      <span className={kw}>const</span>{' '}
      <span className={plain}>user</span> ={' '}
      <span className={kw}>await</span>{' '}
      <span className={fn}>getUser</span>
      <span className={plain}>();</span>
    </span>,

    <span>
      &nbsp;&nbsp;
      <span className={fn}>console.log</span>
      <span className={plain}>(</span>
      <span className={str}>
        `Welcome ${'{'}user.name{'}'}!`
      </span>
      <span className={plain}>);</span>
    </span>,

    <span>
      &nbsp;&nbsp;
      <span className={fn}>console.log</span>
      <span className={plain}>(</span>
      <span className={str}>
        `Level: ${'{'}user.level{'}'}`
      </span>
      <span className={plain}>);</span>
    </span>,

    <span>
      &nbsp;&nbsp;
      <span className={kw}>return</span>
      <span className={plain}> {'{'} status: </span>
      <span className={str}>"success"</span>
      <span className={plain}> {'}'};</span>
    </span>,

    <span className={plain}>{'}'};</span>,

    <span>&nbsp;</span>,

    <span>
      <span className={kw}>const</span>{' '}
      <span className={plain}>getUser</span> ={' '}
      <span className={kw}>async</span>{' '}
      <span className={plain}>() =&gt; ({'{'}</span>
    </span>,

    <span>
      &nbsp;&nbsp;
      <span className={plain}>name: </span>
      <span className={str}>"Keshav Mishra"</span>
      <span className={plain}>,</span>
    </span>,

    <span>
      &nbsp;&nbsp;
      <span className={plain}>level: </span>
      <span className={str}>"Beginner"</span>
      <span className={plain}>,</span>
    </span>,

    <span className={plain}>{'}'});</span>,

    <span>&nbsp;</span>,

    <span>
      <span className={fn}>welcome</span>
      <span className={plain}>();</span>
    </span>,
  ];

  useEffect(() => {
    let timer;

    if (visibleLines < lines.length) {
      // Show next line
      timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 300);
    } else {
      // Code complete → wait → restart
      timer = setTimeout(() => {
        setVisibleLines(0);
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [visibleLines, lines.length]);

  return (
    <>
      {lines.map((content, i) => (
        <div
          key={i}
          className="flex gap-4 min-h-[24px]"
        >
          <span className="text-text-faint select-none w-5 text-right shrink-0">
            {i + 1}
          </span>

          {i < visibleLines && (
            <motion.span
              initial={{
                opacity: 0,
                y: 3,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.18,
              }}
              className="whitespace-pre"
            >
              {content}

              {/* Cursor only on latest line */}
              {i === visibleLines - 1 &&
                visibleLines < lines.length && (
                  <motion.span
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                    }}
                    className="inline-block ml-1 w-[6px] h-[14px] bg-white align-middle"
                  />
                )}
            </motion.span>
          )}
        </div>
      ))}
    </>
  );
}

export default function CodeShowcase() {
  const [tab, setTab] = useState('assistant');

  return (
    <section className="pb-16">
      <div className="max-w-[1180px] mx-auto px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-bg-card border border-border rounded-lg overflow-hidden"
        >
          {/* title bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              </div>
              <div className="flex items-center gap-1.5 bg-bg-elevated border border-border-bright rounded px-3 py-1.5">
                <span className="text-[#dcdcaa] font-mono text-[12px]">{'</>'}</span>
                <span className="font-mono text-[12.5px] text-text">strike.js</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2c94c]" />
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10.5px] text-success border border-success/30 bg-success/10 px-2.5 py-1 rounded">
                READY
              </span>
              <button className="flex items-center gap-1.5 font-semibold text-[12.5px] bg-text text-bg px-3.5 py-1.5 rounded-md hover:opacity-90 transition-opacity">
                ▶ Run Code
              </button>
            </div>
          </div>

          {/* body: code + terminal (left) / AI panel (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
            <div className="border-b lg:border-b-0 lg:border-r border-border">
              <div className="p-5 font-mono text-[12.5px] leading-[1.9] overflow-x-auto">
                <CodeLines />
              </div>

              <div className="border-t border-border px-5 py-4">
                <div className="flex items-center gap-2 text-text-faint font-mono text-[11px] mb-3">
                  <span>▢</span> TERMINAL
                </div>
                <div className="font-mono text-[12.5px] leading-relaxed">
                  <div className="text-[#4ec9b0]">Welcome to Strike Terminal! ✨</div>
                  <div className="mt-3 text-success">
                    $ <span className="inline-block w-[6px] h-[12px] bg-success/70 align-middle animate-pulse ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 bg-bg-elevated border border-border rounded-full p-1">
                  <button
                    onClick={() => setTab('assistant')}
                    className={
                      'text-[12px] font-medium px-3 py-1.5 rounded-full transition-colors ' +
                      (tab === 'assistant' ? 'bg-text text-bg font-semibold' : 'text-text-dim')
                    }
                  >
                    AI Assistant
                  </button>
                  <button
                    onClick={() => setTab('bugs')}
                    className={
                      'text-[12px] font-medium px-3 py-1.5 rounded-full transition-colors ' +
                      (tab === 'bugs' ? 'bg-text text-bg font-semibold' : 'text-text-dim')
                    }
                  >
                    Bug Shots
                  </button>
                </div>
                <span className="font-mono text-[10.5px] text-text-faint">Static</span>
              </div>

              {tab === 'assistant' ? (
                <>
                  <div className="font-mono text-[10.5px] text-text-faint tracking-wide mb-2.5">
                    QUICK SUGGESTIONS
                  </div>
                  <div className="flex flex-col gap-2 mb-5">
                    {SUGGESTIONS.map((s) => (
                      <div key={s.title} className="bg-bg-elevated border border-border rounded-md px-3.5 py-3 hover:border-border-bright transition-colors">
                        <div className="text-[13px] font-semibold text-text mb-1">{s.title}</div>
                        <div className="text-[11.5px] text-text-dim leading-relaxed">{s.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="font-mono text-[10.5px] text-text-faint tracking-wide mb-2.5">
                    THOUGHTS
                  </div>
                  <div className="flex flex-col gap-2">
                    {THOUGHTS.map((t) => (
                      <div key={t} className="bg-bg-elevated border border-border rounded-md px-3.5 py-2.5 text-[11.5px] text-text-dim">
                        • {t}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-text-faint text-[12.5px] font-mono text-center py-10">
                  No bugs reported yet.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}