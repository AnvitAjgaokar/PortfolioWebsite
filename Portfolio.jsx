import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Twitter, Mail, ExternalLink, ArrowUpRight, ArrowUp,
  Menu, X, Code2, Database, Server, Cloud, Terminal, Clock,
  MapPin, ChevronRight, ChevronUp,
} from 'lucide-react';

import meta         from './src/data/meta.js';
import about        from './src/data/about.js';
import experience   from './src/data/experience.js';
import skills       from './src/data/skills.js';
import projects     from './src/data/projects.js';
import achievements from './src/data/achievements.js';
import blog         from './src/data/blog.js';
import social       from './src/data/social.js';

// ================================================================
// DATA LAYER — edit files in src/data/ to update content.
// ================================================================
const portfolioData = { meta, about, experience, skills, projects, achievements, blog, social };

// ================================================================
// GLOBAL STYLES (injected via <style> tag — no custom Tailwind config needed)
// ================================================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: #111111;
    background-image:
      radial-gradient(ellipse 90% 35% at 50% 0%, rgba(100,255,218,0.08) 0%, transparent 100%),
      radial-gradient(ellipse 55% 25% at 85% 55%, rgba(100,255,218,0.05) 0%, transparent 100%),
      radial-gradient(ellipse 60% 20% at 15% 80%, rgba(100,255,218,0.04) 0%, transparent 100%);
    color: #d4d4d4;
    font-family: 'Inter', system-ui, sans-serif;
    margin: 0; padding: 0;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }
  a, button, [role="button"] {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #111111; }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; }
  ::-webkit-scrollbar-thumb:hover { background: #64ffda; }

  .font-display { font-family: 'Space Mono', monospace; }

  @keyframes cursor-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translate3d(0, 28px, 0); }
    to   { opacity: 1; transform: translate3d(0, 0, 0);    }
  }

  .cursor-blink { animation: cursor-blink 1s step-end infinite; }

  .hero-bg {
    background-image:
      linear-gradient(rgba(100,255,218,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(100,255,218,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
  }

  /* Scroll-reveal */
  .fade-up {
    opacity: 0;
    transform: translate3d(0, 32px, 0);
    will-change: transform, opacity;
    backface-visibility: hidden;
    transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                transform 0.65s cubic-bezier(0.16,1,0.3,1);
  }
  .fade-up.in-view { opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
  .delay-1 { transition-delay: 0.10s; }
  .delay-2 { transition-delay: 0.20s; }
  .delay-3 { transition-delay: 0.30s; }
  .delay-4 { transition-delay: 0.40s; }
  .delay-5 { transition-delay: 0.50s; }
  .delay-6 { transition-delay: 0.60s; }

  /* Cards */
  .card {
    --gx: -9999px;
    --gy: -9999px;
    background:
      radial-gradient(280px circle at var(--gx) var(--gy), rgba(100,255,218,0.06) 0%, transparent 70%),
      linear-gradient(160deg, #1d1d1d 0%, #161616 100%);
    border: 1px solid #272727;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                border-color 0.3s ease,
                box-shadow 0.3s ease;
  }
  .card:hover {
    transform: translateY(-5px);
    border-color: rgba(100,255,218,0.22);
    box-shadow:
      0 -1px 0 rgba(100,255,218,0.38),
      0 20px 50px rgba(0,0,0,0.35),
      0 0 60px rgba(100,255,218,0.045);
  }

  /* Skill tags */
  .skill-tag {
    border: 1px solid #303030;
    background: #1e1e1e;
    color: #b8b8b8;
    font-family: 'Space Mono', monospace;
    cursor: default;
    transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
  }
  .skill-tag:hover {
    background: rgba(100,255,218,0.07);
    border-color: rgba(100,255,218,0.4);
    color: #64ffda;
    transform: scale(1.05);
  }

  /* Tech chips */
  .tech-chip {
    border: 1px solid #303030;
    background: #1e1e1e;
    color: #999;
    font-family: 'Space Mono', monospace;
    font-size: 0.68rem;
    transition: border-color 0.2s, color 0.2s;
  }
  .tech-chip:hover { border-color: rgba(100,255,218,0.3); color: #64ffda; }

  /* Nav links */
  .nav-link {
    position: relative;
    color: #aaa;
    transition: color 0.2s;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
    font-family: 'Space Mono', monospace;
    font-size: 0.78rem;
  }
  .nav-link:hover { color: #e8e8e8; }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 1px;
    background: #64ffda;
    transition: width 0.3s ease;
  }
  .nav-link:hover::after { width: 100%; }

  /* Social icons */
  .social-icon {
    color: #888;
    transition: color 0.2s, transform 0.2s;
    display: inline-flex;
  }
  .social-icon:hover { color: #64ffda; transform: rotate(10deg) scale(1.15); }

  /* Ghost section numbers */
  .ghost-number {
    font-family: 'Space Mono', monospace;
    font-size: clamp(4rem, 12vw, 10rem);
    font-weight: 700;
    color: #111;
    line-height: 1;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
  }

  /* Achievement cards */
  .achievement-card {
    background: linear-gradient(150deg, #1c1c1c 0%, #131313 100%);
    border: 1px solid #272727;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  }
  .achievement-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(100,255,218,0.16) 0%, rgba(100,255,218,0.06) 38%, transparent 65%);
    pointer-events: none;
  }
  .achievement-card:hover {
    border-color: rgba(100,255,218,0.3);
    box-shadow:
      0 -1px 0 rgba(100,255,218,0.3),
      0 0 50px rgba(100,255,218,0.07);
    transform: scale(1.02);
  }

  /* Tab active state */
  .tab-active {
    background: rgba(100,255,218,0.08) !important;
    border-color: rgba(100,255,218,0.35) !important;
    color: #64ffda !important;
  }

  /* Timeline */
  .timeline-line {
    position: absolute; left: 0; top: 8px; bottom: 0;
    width: 1px;
    overflow: hidden;
  }

  /* Prevent horizontal overflow at every breakpoint */
  html, body { overflow-x: hidden; max-width: 100%; }

  /* Touch-friendly active states (devices that lack hover) */
  @media (hover: none) {
    .card:active {
      transform: scale(0.99);
      border-color: rgba(100,255,218,0.22);
      box-shadow: 0 -1px 0 rgba(100,255,218,0.35), 0 8px 24px rgba(0,0,0,0.3);
    }
    .skill-tag:active { background: rgba(100,255,218,0.07); border-color: rgba(100,255,218,0.4); color: #64ffda; }
    .social-icon:active { color: #64ffda; }
    .nav-link:active { color: #e8e8e8; }
  }

  /* ── Section label shimmer ───────────────────────────────────── */
  @keyframes label-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .section-label {
    background: linear-gradient(90deg, #64ffda 0%, rgba(100,255,218,0.35) 40%, #64ffda 60%, rgba(100,255,218,0.35) 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: label-shimmer 6s linear infinite;
  }

  /* ── Section divider line grow on entrance ───────────────────── */
  .section-line {
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s;
  }
  .fade-up.in-view .section-line { transform: scaleX(1); }

  /* ── Avatar float ────────────────────────────────────────────── */
  @keyframes avatar-float {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-8px); }
  }
  .avatar-float { animation: avatar-float 5s ease-in-out infinite; }
  .avatar-float:hover { animation-play-state: paused; }

  /* ── Timeline dot pop-in ─────────────────────────────────────── */
  .anim-slide-left .timeline-dot {
    transform: scale(0);
    transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.35s;
  }
  .anim-slide-left.in-view .timeline-dot { transform: scale(1); }

  /* ── Achievement metric glow after count-up ──────────────────── */
  @keyframes metric-pulse {
    0%   { filter: none; }
    35%  { filter: drop-shadow(0 0 14px rgba(100,255,218,0.65)); }
    100% { filter: none; }
  }
  .anim-pop.in-view .metric-glow {
    animation: metric-pulse 1.4s ease-out 1.65s both;
  }

  /* Respect user's motion preference */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .fade-up, .anim-slide-left, .anim-pop, .anim-fade { opacity: 1 !important; transform: none !important; }
    .timeline-line-inner { transform: scaleY(1) !important; }
    .cursor-blink { animation: none !important; opacity: 1; }
    .section-line { transform: scaleX(1) !important; }
    .anim-slide-left .timeline-dot { transform: scale(1) !important; }
  }

  /* ── Scroll animation variants ────────────────────────── */
  .anim-slide-left {
    opacity: 0; transform: translate3d(-40px, 0, 0);
    will-change: transform, opacity;
    backface-visibility: hidden;
    transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1);
  }
  .anim-slide-left.in-view { opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }

  .anim-pop {
    opacity: 0; transform: scale(0.92);
    will-change: transform, opacity;
    backface-visibility: hidden;
    transition: opacity 0.45s ease-out, transform 0.45s ease-out;
  }
  .anim-pop.in-view { opacity: 1; transform: scale(1); will-change: auto; }

  .anim-fade {
    opacity: 0;
    transition: opacity 0.7s ease;
  }
  .anim-fade.in-view { opacity: 1; }

  /* Timeline draw animation */
  .timeline-line-inner {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, #64ffda 0%, #1a1a1a 100%);
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .timeline-line-inner.in-view { transform: scaleY(1); }

  /* Timeline dot pulse */
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(100,255,218,0.5); }
    70%  { box-shadow: 0 0 0 6px rgba(100,255,218,0); }
    100% { box-shadow: 0 0 0 0 rgba(100,255,218,0); }
  }
  .timeline-dot:hover { animation: pulse-ring 1s ease-out; }

  /* CTA shimmer button */
  .btn-shine {
    position: relative; overflow: hidden;
  }
  .btn-shine::after {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transition: left 0.5s ease;
  }
  .btn-shine:hover::after { left: 150%; }

  /* Link icon slide */
  .link-icon { transition: transform 0.2s ease, color 0.2s; }
  .link-icon:hover { transform: translate(2px, -2px); color: #64ffda; }

  /* Platform badge */
  .platform-badge {
    transition: background 0.2s, color 0.2s, transform 0.2s;
  }
  .platform-badge:hover { transform: scale(1.06); }

  /* Mobile: reduce translate distances */
  @media (max-width: 640px) {
    .fade-up { transform: translate3d(0, 20px, 0); }
    .anim-slide-left { transform: translate3d(-22px, 0, 0); }
    .anim-pop { transform: scale(0.93); }
  }
`;

// ================================================================
// HOOKS
// ================================================================
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else if (entry.intersectionRatio === 0) {
          // Only reset when fully off-screen so animations replay on next scroll-in
          setInView(false);
        }
      },
      { threshold: [0, threshold] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useTypewriter(words, typingSpeed = 90, deletingSpeed = 45, pauseTime = 1800) {
  const [displayText, setDisplayText] = useState('');
  const wordIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);
  useEffect(() => {
    let timer;
    function tick() {
      const word = words[wordIdx.current % words.length];
      if (!isDeleting.current) {
        charIdx.current++;
        setDisplayText(word.slice(0, charIdx.current));
        if (charIdx.current === word.length) {
          isDeleting.current = true;
          timer = setTimeout(tick, pauseTime);
        } else {
          timer = setTimeout(tick, typingSpeed);
        }
      } else {
        charIdx.current--;
        setDisplayText(word.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          isDeleting.current = false;
          wordIdx.current++;
          timer = setTimeout(tick, typingSpeed);
        } else {
          timer = setTimeout(tick, deletingSpeed);
        }
      }
    }
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line
  return displayText;
}

function useCountUp(targetStr, inView) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);
  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const match = targetStr.match(/[\d.]+/);
    if (!match) return;
    const target = parseFloat(match[0]);
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    }
    requestAnimationFrame(step);
  }, [inView, targetStr]);
  return value;
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted;
}

// ================================================================
// CARD SPOTLIGHT — shared mouse handlers for all .card elements
// ================================================================
const cardGlowHandlers = {
  onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--gx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--gy', `${e.clientY - rect.top}px`);
  },
  onMouseLeave(e) {
    e.currentTarget.style.setProperty('--gx', '-9999px');
    e.currentTarget.style.setProperty('--gy', '-9999px');
  },
};

// ================================================================
// SHARED COMPONENTS
// ================================================================
function TechChip({ label }) {
  return <span className="tech-chip inline-block px-2.5 py-1 rounded-sm">{label}</span>;
}

function SectionHeader({ number, title, subtitle }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`fade-up ${inView ? 'in-view' : ''} mb-10 sm:mb-16 relative overflow-hidden`}>
      <div className="ghost-number absolute -top-4 right-0 leading-none select-none">{number}</div>
      <p className="font-display text-xs tracking-widest uppercase mb-3 section-label">
        {`// ${number}`}
      </p>
      <h2
        className="font-display font-bold text-[#e8e8e8] leading-tight"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="font-display text-[#555] text-xs tracking-widest uppercase mt-2">{subtitle}</p>
      )}
      <div className="mt-6 w-14 h-px section-line bg-gradient-to-r from-[#64ffda] to-transparent" />
    </div>
  );
}

// ================================================================
// NAV
// ================================================================
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];


function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const { meta, social } = portfolioData;

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(href) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          background: scrolled
            ? 'linear-gradient(180deg, rgba(12,12,12,0.97) 0%, rgba(10,10,10,0.88) 100%)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(100,255,218,0.06)' : '1px solid transparent',
          transition: 'transform 0.35s ease, background 0.35s ease',
        }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-base font-bold text-[#e8e8e8] hover:text-[#64ffda] transition-colors bg-transparent border-0 cursor-pointer p-0"
          >
            {meta.initials}<span style={{ color: '#64ffda' }}>.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="nav-link">
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={social.resume}
              target="_blank" rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 font-display text-xs px-4 py-2 text-[#64ffda] hover:bg-[rgba(100,255,218,0.07)] transition-colors"
              style={{ border: '1px solid rgba(100,255,218,0.5)' }}
            >
              Resume <ArrowUpRight size={11} />
            </a>
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden text-[#777] hover:text-[#e8e8e8] transition-colors bg-transparent border-0 cursor-pointer p-2.5 -mr-1"
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          background: 'rgba(8,8,8,0.97)',
          backdropFilter: 'blur(12px)',
        }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden overflow-y-auto py-16"
      >
        {NAV_LINKS.map(l => (
          <button
            key={l.href}
            onClick={() => scrollTo(l.href)}
            className="font-display text-2xl text-[#888] hover:text-[#64ffda] active:text-[#64ffda] transition-colors bg-transparent border-0 cursor-pointer min-h-[48px] px-8 flex items-center justify-center"
          >
            {l.label}
          </button>
        ))}
        <a
          href={social.resume}
          className="mt-4 font-display text-sm px-8 py-3 text-[#64ffda]"
          style={{ border: '1px solid rgba(100,255,218,0.5)' }}
        >
          Resume
        </a>
      </div>
    </>
  );
}

// ================================================================
// HERO
// ================================================================
function Hero() {
  const { meta } = portfolioData;
  const typedText = useTypewriter(meta.roles);
  const mounted = useMounted();

  const fade = (delay) => ({
    style: { transitionDelay: delay, transition: 'opacity 0.7s ease, transform 0.7s ease' },
    className: `${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`,
  });

  return (
    <section id="hero" className="hero-bg relative min-h-screen flex items-center overflow-hidden">
      {/* Primary bloom — bleeds behind the headline text */}
      <div style={{
        position: 'absolute', top: '8%', left: '-10%',
        width: '70vw', height: '70vw',
        background: 'radial-gradient(ellipse at 38% 48%, rgba(100,255,218,0.18) 0%, rgba(100,255,218,0.07) 38%, transparent 68%)',
        pointerEvents: 'none',
      }} />
      {/* Secondary bloom — upper-right, atmospheric fill */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(ellipse at 55% 42%, rgba(100,255,218,0.10) 0%, transparent 62%)',
        pointerEvents: 'none',
      }} />
      {/* Bottom section fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '220px',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(17,17,17,0.75) 100%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full">
        {/* Label */}
        <div {...fade('0.1s')} className={`${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} flex items-center gap-3 mb-5`} style={{ transition: 'opacity 0.7s ease, transform 0.7s ease', transitionDelay: '0.1s' }}>
          <div className="w-8 h-px" style={{ background: '#64ffda' }} />
          <span className="font-display text-xs tracking-widest uppercase" style={{ color: '#64ffda' }}>
            Hi, I'm
          </span>
        </div>

        {/* Name */}
        <h1
          className={`font-display font-bold leading-none text-[#e8e8e8] mb-4 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)', transition: 'opacity 0.7s ease, transform 0.7s ease', transitionDelay: '0.25s' }}
        >
          {meta.name}
        </h1>

        {/* Typewriter */}
        <div
          className={`flex items-center mb-8 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
          style={{ transition: 'opacity 0.7s ease, transform 0.7s ease', transitionDelay: '0.4s' }}
        >
          <span
            className="font-display text-[#777]"
            style={{ fontSize: 'clamp(1.1rem,2.8vw,1.75rem)' }}
          >
            {typedText}
          </span>
          <span
            className="cursor-blink font-display ml-0.5"
            style={{ fontSize: 'clamp(1.1rem,2.8vw,1.75rem)', color: '#64ffda' }}
          >
            |
          </span>
        </div>

        {/* Tagline */}
        <p
          className={`text-[#aaa] text-base max-w-lg leading-7 mb-12 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
          style={{ transition: 'opacity 0.7s ease, transform 0.7s ease', transitionDelay: '0.55s' }}
        >
          {meta.tagline}
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
          style={{ transition: 'opacity 0.7s ease, transform 0.7s ease', transitionDelay: '0.7s' }}
        >
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-shine w-full sm:w-auto font-display text-xs font-bold px-8 py-3.5 hover:opacity-90 transition-opacity cursor-pointer border-0 min-h-[48px]"
            style={{ background: '#64ffda', color: '#0a0a0a' }}
          >
            View Work
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto font-display text-xs px-8 py-3.5 text-[#888] hover:text-[#64ffda] transition-colors cursor-pointer bg-transparent min-h-[48px]"
            style={{ border: '1px solid #2a2a2a' }}
          >
            Contact Me
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className={`flex items-center gap-3 mt-12 sm:mt-20 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
          style={{ transition: 'opacity 0.7s ease, transform 0.7s ease', transitionDelay: '1s' }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #64ffda)' }} />
          <span
            className="font-display text-[#666] text-xs tracking-widest uppercase cursor-pointer"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Scroll
          </span>
        </div>
      </div>

      {/* Bottom-right meta */}
      <div className="absolute bottom-8 right-6 lg:right-12 hidden sm:flex flex-col items-end gap-2">
        <span className="font-display text-[#777] text-xs tracking-widest flex items-center gap-1.5">
          <MapPin size={9} style={{ color: '#666' }} />{meta.location}
        </span>
        <a href={`mailto:${meta.email}`} className="font-display text-[#777] text-xs tracking-widest hover:text-[#64ffda] transition-colors">
          {meta.email}
        </a>
      </div>
    </section>
  );
}

// ================================================================
// ABOUT
// ================================================================
function About() {
  const { about } = portfolioData;
  const [boxRef, boxInView] = useInView();
  const [textRef, textInView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-28 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeader number="01" title="About Me" />
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Avatar box */}
        <div ref={boxRef} className={`anim-slide-left ${boxInView ? 'in-view' : ''}`}>
          <div
            className="relative aspect-square max-w-[200px] sm:max-w-xs mx-auto md:mx-0 cursor-default avatar-float"
            style={{
              border: hovered ? '1px solid rgba(100,255,218,0.45)' : '1px solid #1e1e1e',
              background: '#0b0b0b',
              boxShadow: hovered ? '0 0 60px rgba(100,255,218,0.07)' : 'none',
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Corner brackets */}
            {[['top-0 left-0', 'border-t-2 border-l-2'], ['top-0 right-0', 'border-t-2 border-r-2'],
              ['bottom-0 left-0', 'border-b-2 border-l-2'], ['bottom-0 right-0', 'border-b-2 border-r-2']
            ].map(([pos, borders], i) => (
              <div key={i} className={`absolute w-5 h-5 ${pos} ${borders}`} style={{ borderColor: '#64ffda' }} />
            ))}

            {/* Monogram */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-display font-bold select-none"
                style={{
                  fontSize: 'clamp(3.5rem,10vw,6rem)',
                  color: hovered ? 'rgba(100,255,218,0.18)' : '#1d1d1d',
                  transition: 'color 0.5s ease',
                  lineHeight: 1,
                }}
              >
                {about.avatar}
              </span>
            </div>

            {/* Scanlines */}
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(100,255,218,0.008) 3px, rgba(100,255,218,0.008) 4px)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Bio */}
        <div ref={textRef} className={`fade-up delay-2 ${textInView ? 'in-view' : ''} space-y-5`}>
          {about.bio.map((p, i) => (
            <p key={i} className="text-[#bbb] leading-7 text-sm">{p}</p>
          ))}

          {/* Currently */}
          <div
            className="flex items-start gap-3 p-4 mt-6"
            style={{ background: '#0c0c0c', border: '1px solid #1a1a1a' }}
          >
            <div className="w-0.5 self-stretch shrink-0" style={{ background: '#64ffda' }} />
            <div>
              <span className="font-display text-[10px] text-[#777] uppercase tracking-widest block mb-1">Currently</span>
              <span className="text-[#ccc] text-sm">{about.currently}</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {about.stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold" style={{ color: '#64ffda' }}>{stat.value}</div>
                <div className="font-display text-[10px] text-[#777] uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// EXPERIENCE
// ================================================================
function ExperienceItem({ job, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`anim-slide-left ${inView ? 'in-view' : ''} relative`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Timeline dot */}
      <div
        className="timeline-dot absolute -left-7 sm:-left-10 top-2 w-3 h-3 rounded-full"
        style={{ border: '2px solid #64ffda', background: '#0a0a0a' }}
      />

      <div className="card p-4 sm:p-7" {...cardGlowHandlers}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="font-display text-base font-bold text-[#e8e8e8]">{job.role}</h3>
            <span className="font-display text-sm" style={{ color: '#64ffda' }}>{job.company}</span>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
            <span
              className="font-display text-xs px-3 py-1 text-[#aaa]"
              style={{ border: '1px solid #333' }}
            >
              {job.duration}
            </span>
            <span className="font-display text-[10px] text-[#777]">{job.type}</span>
          </div>
        </div>

        <ul className="space-y-2.5 mb-6">
          {job.descriptions.map((desc, j) => (
            <li key={j} className="flex items-start gap-3 text-[#bbb] text-sm leading-6">
              <ChevronRight size={13} className="shrink-0 mt-1" style={{ color: '#64ffda' }} />
              {desc}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {job.techStack.map(t => <TechChip key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const { experience } = portfolioData;
  const [lineRef, lineInView] = useInView(0.05);
  return (
    <section id="experience" style={{ background: 'linear-gradient(180deg, #080808 0%, #1a1a1a 50%, #080808 100%)' }} className="py-16 sm:py-24 lg:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader number="02" title="Experience" subtitle="Where I've shipped." />
        <div className="relative pl-5 sm:pl-8">
          <div ref={lineRef} className="timeline-line">
            <div className={`timeline-line-inner ${lineInView ? 'in-view' : ''}`} />
          </div>
          <div className="space-y-8 sm:space-y-12">
            {experience.map((job, i) => (
              <ExperienceItem key={job.company} job={job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// SKILLS
// ================================================================
const SKILL_ICONS = { Code2, Server, Database, Cloud, Terminal };

function SkillGroup({ group, index }) {
  const [ref, inView] = useInView();
  const Icon = SKILL_ICONS[group.icon] || Code2;
  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? 'in-view' : ''} card p-6`}
      style={{ transitionDelay: `${index * 0.09}s` }}
      {...cardGlowHandlers}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <Icon size={14} style={{ color: '#64ffda' }} />
        <span className="font-display text-xs text-[#e8e8e8] uppercase tracking-widest">{group.category}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map(item => (
          <span key={item} className="skill-tag text-xs px-3 py-1.5 rounded-sm">{item}</span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const { skills } = portfolioData;
  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-28 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeader number="03" title="Skills" subtitle="Tools I reach for." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((group, i) => <SkillGroup key={group.category} group={group} index={i} />)}
      </div>
    </section>
  );
}

// ================================================================
// PROJECTS
// ================================================================
function PersonalProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? 'in-view' : ''} card p-6 flex flex-col`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      {...cardGlowHandlers}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display text-sm font-bold text-[#e8e8e8]">{project.name}</h3>
        <div className="flex gap-2.5 shrink-0 ml-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="link-icon social-icon">
              <Github size={15} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="link-icon social-icon">
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {project.highlight && (
        <span
          className="font-display text-[10px] px-2.5 py-1 mb-3 self-start"
          style={{
            background: 'rgba(100,255,218,0.07)',
            color: '#64ffda',
            border: '1px solid rgba(100,255,218,0.2)',
          }}
        >
          {project.highlight}
        </span>
      )}

      <p className="text-[#aaa] text-xs leading-5 flex-1 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.techStack.map(t => <TechChip key={t} label={t} />)}
      </div>
    </div>
  );
}

function ProfessionalProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? 'in-view' : ''} card p-4 sm:p-7 flex flex-col`}
      style={{ transitionDelay: `${index * 0.15}s` }}
      {...cardGlowHandlers}
    >
      <h3 className="font-display text-sm font-bold text-[#e8e8e8] mb-2">{project.name}</h3>

      {project.highlight && (
        <span
          className="font-display text-[10px] px-2.5 py-1 mb-3 self-start"
          style={{
            background: 'rgba(100,255,218,0.07)',
            color: '#64ffda',
            border: '1px solid rgba(100,255,218,0.2)',
          }}
        >
          {project.highlight}
        </span>
      )}

      <p className="text-[#aaa] text-xs leading-5 mb-4">{project.description}</p>

      {project.impact && (
        <div
          className="text-xs text-[#888] p-3 mb-4 leading-5"
          style={{ background: '#0c0c0c', borderLeft: '2px solid #64ffda' }}
        >
          {project.impact}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.techStack.map(t => <TechChip key={t} label={t} />)}
      </div>
    </div>
  );
}

const PROJECTS_INITIAL = 3;

function ExpandToggle({ total, expanded, onToggle, noun = 'project' }) {
  const extra = total - PROJECTS_INITIAL;
  if (total <= PROJECTS_INITIAL) return null;
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onToggle}
        className="font-display text-xs flex items-center gap-2"
        style={{
          background: 'transparent',
          border: '1px solid rgba(100,255,218,0.18)',
          color: expanded ? '#555' : '#64ffda',
          padding: '10px 24px',
          cursor: 'pointer',
          letterSpacing: '0.06em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(100,255,218,0.38)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(100,255,218,0.18)'; }}
      >
        {expanded
          ? <><ChevronUp size={11} /><span>Collapse</span></>
          : <><span>{extra} more {noun}{extra !== 1 ? 's' : ''}</span><ChevronRight size={11} /></>}
      </button>
    </div>
  );
}

function Projects() {
  const { projects } = portfolioData;
  const [tab, setTab] = useState('personal');
  const [personalExpanded, setPersonalExpanded] = useState(false);
  const [proExpanded, setProExpanded] = useState(false);

  const visiblePersonal = personalExpanded
    ? projects.personal
    : projects.personal.slice(0, PROJECTS_INITIAL);
  const visiblePro = proExpanded
    ? projects.professional
    : projects.professional.slice(0, PROJECTS_INITIAL);

  return (
    <section id="projects" style={{ background: 'linear-gradient(180deg, #080808 0%, #1a1a1a 50%, #080808 100%)' }} className="py-16 sm:py-24 lg:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader number="04" title="Projects" subtitle="Things I've built." />

        {/* Tab switcher */}
        <div className="flex mb-8 sm:mb-10 w-full sm:w-fit" style={{ border: '1px solid #1c1c1c' }}>
          {[
            { key: 'personal', label: 'Personal / OSS' },
            { key: 'professional', label: 'Professional' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 sm:flex-none font-display text-xs px-6 py-3 sm:py-2.5 min-h-[48px] sm:min-h-0 border-0 cursor-pointer transition-all ${
                tab === t.key ? 'tab-active' : 'text-[#777] hover:text-[#aaa] bg-transparent'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'personal' && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visiblePersonal.map((p, i) => (
                <PersonalProjectCard key={p.name} project={p} index={i} />
              ))}
            </div>
            <ExpandToggle
              total={projects.personal.length}
              expanded={personalExpanded}
              onToggle={() => setPersonalExpanded(x => !x)}
            />
          </>
        )}

        {tab === 'professional' && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {visiblePro.map((p, i) => (
                <ProfessionalProjectCard key={p.name} project={p} index={i} />
              ))}
            </div>
            <ExpandToggle
              total={projects.professional.length}
              expanded={proExpanded}
              onToggle={() => setProExpanded(x => !x)}
            />
          </>
        )}
      </div>
    </section>
  );
}

// ================================================================
// ACHIEVEMENTS
// ================================================================
function AchievementItem({ achievement, index }) {
  const [ref, inView] = useInView(0.2);
  const count = useCountUp(achievement.metric, inView);

  const match = achievement.metric.match(/[\d.]+/);
  let display = achievement.metric;
  if (match) {
    const isDecimal = match[0].includes('.');
    const formatted = isDecimal ? count.toFixed(2) : String(Math.round(count));
    display = achievement.metric.slice(0, match.index) + formatted + achievement.metric.slice(match.index + match[0].length);
  }

  return (
    <div
      ref={ref}
      className={`anim-pop ${inView ? 'in-view' : ''} achievement-card p-5 sm:p-8`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div
        className="font-display font-bold mb-2 leading-none metric-glow"
        style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#64ffda' }}
      >
        {display}
      </div>
      <h3 className="font-display text-[#ccc] text-xs uppercase tracking-widest mb-3">{achievement.title}</h3>
      <p className="text-[#aaa] text-xs leading-5">{achievement.description}</p>
    </div>
  );
}

function Achievements() {
  const { achievements } = portfolioData;
  return (
    <section id="achievements" className="py-16 sm:py-24 lg:py-28 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeader number="05" title="By The Numbers" subtitle="What I've shipped, measured." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((item, i) => (
          <AchievementItem key={item.title} achievement={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ================================================================
// BLOG
// ================================================================
const PLATFORM_STYLE = {
  'Medium':   { bg: 'rgba(255,255,255,0.04)', color: '#888', border: '#2a2a2a' },
  'Dev.to':   { bg: 'rgba(100,255,218,0.05)', color: '#64ffda', border: 'rgba(100,255,218,0.2)' },
  'LinkedIn': { bg: 'rgba(10,102,194,0.1)',   color: '#7bafd4', border: 'rgba(10,102,194,0.25)' },
};

function BlogCard({ post, index }) {
  const [ref, inView] = useInView();
  const ps = PLATFORM_STYLE[post.platform] || PLATFORM_STYLE['Medium'];

  return (
    <a
      href={post.url}
      target="_blank" rel="noreferrer"
      ref={ref}
      className={`fade-up ${inView ? 'in-view' : ''} card p-6 flex flex-col no-underline group`}
      style={{ transitionDelay: `${index * 0.1}s`, textDecoration: 'none' }}
      {...cardGlowHandlers}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="platform-badge font-display text-[10px] px-2.5 py-1"
          style={{ background: ps.bg, color: ps.color, border: `1px solid ${ps.border}` }}
        >
          {post.platform}
        </span>
        <ArrowUpRight
          size={15}
          className="link-icon transition-colors"
          style={{ color: '#2a2a2a' }}
        />
      </div>

      <h3
        className="font-display text-xs font-bold text-[#bbb] leading-5 mb-3 group-hover:text-[#64ffda] transition-colors"
        style={{ color: '#bbb' }}
      >
        {post.title}
      </h3>

      <p className="text-[#777] text-xs leading-5 flex-1 mb-4">{post.excerpt}</p>

      <div className="flex items-center gap-4 font-display text-[#777] text-[10px]">
        <span className="flex items-center gap-1.5">
          <Clock size={9} />{post.readTime}
        </span>
        <span>{post.date}</span>
      </div>
    </a>
  );
}

function Blog() {
  const { blog } = portfolioData;
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? blog : blog.slice(0, PROJECTS_INITIAL);

  return (
    <section id="blog" style={{ background: 'linear-gradient(180deg, #080808 0%, #1a1a1a 50%, #080808 100%)' }} className="py-16 sm:py-24 lg:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader number="06" title="Writing" subtitle="Thoughts worth sharing." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((post, i) => <BlogCard key={post.title} post={post} index={i} />)}
        </div>
        <ExpandToggle
          total={blog.length}
          expanded={expanded}
          onToggle={() => setExpanded(x => !x)}
          noun="article"
        />
      </div>
    </section>
  );
}

// ================================================================
// CONTACT FORM
// ================================================================
function ContactForm() {
  const { social } = portfolioData;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | rate-limited
  const COOLDOWN_MS = 60000;

  function validate() {
    const e = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const msg = form.message.trim();
    if (name.length < 2) e.name = 'Minimum 2 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email.';
    if (msg.length < 20) e.message = 'Minimum 20 characters.';
    else if (msg.length > 1000) e.message = 'Maximum 1000 characters.';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (honeypot) return; // bot trap

    const last = parseInt(localStorage.getItem('_pf_ts') || '0');
    if (Date.now() - last < COOLDOWN_MS) { setStatus('rate-limited'); return; }

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setErrors({});
    setStatus('sending');
    try {
      const res = await fetch(social.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }),
      });
      if (res.ok) {
        localStorage.setItem('_pf_ts', String(Date.now()));
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputBase = (hasErr) => ({
    background: '#0a0a0a',
    border: `1px solid ${hasErr ? 'rgba(255,100,100,0.45)' : '#272727'}`,
    color: '#d4d4d4',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '0.875rem',
    outline: 'none',
    width: '100%',
    padding: '10px 14px',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.63rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: '6px',
  };

  const errStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem',
    color: 'rgba(255,110,110,0.9)',
    marginTop: '4px',
    display: 'block',
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '40px 32px', textAlign: 'center', border: '1px solid rgba(100,255,218,0.18)', background: 'rgba(100,255,218,0.03)' }}>
        <div style={{ width: '38px', height: '38px', border: '1px solid rgba(100,255,218,0.45)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#64ffda', fontSize: '1rem' }}>✓</div>
        <p style={{ fontFamily: "'Space Mono', monospace", color: '#64ffda', fontSize: '0.88rem', marginBottom: '6px', fontWeight: 700 }}>Message delivered.</p>
        <p style={{ color: '#666', fontSize: '0.78rem', marginBottom: '20px' }}>I'll get back to you shortly.</p>
        <button
          onClick={() => setStatus('idle')}
          style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: '#64ffda', background: 'transparent', border: '1px solid rgba(100,255,218,0.25)', padding: '8px 20px', cursor: 'pointer', letterSpacing: '0.05em' }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — invisible to real users, catches bots that fill all fields */}
      <input type="text" name="_gotcha" value={honeypot} onChange={e => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
            style={inputBase(errors.name)}
            onFocus={e => { e.target.style.borderColor = 'rgba(100,255,218,0.4)'; }}
            onBlur={e => { e.target.style.borderColor = errors.name ? 'rgba(255,100,100,0.45)' : '#272727'; }}
            placeholder="Your name"
          />
          {errors.name && <span style={errStyle}>{errors.name}</span>}
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }}
            style={inputBase(errors.email)}
            onFocus={e => { e.target.style.borderColor = 'rgba(100,255,218,0.4)'; }}
            onBlur={e => { e.target.style.borderColor = errors.email ? 'rgba(255,100,100,0.45)' : '#272727'; }}
            placeholder="your@email.com"
          />
          {errors.email && <span style={errStyle}>{errors.email}</span>}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Message</label>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: form.message.length > 900 ? 'rgba(255,110,110,0.8)' : '#3a3a3a' }}>
            {form.message.length}/1000
          </span>
        </div>
        <textarea
          value={form.message}
          onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })); }}
          style={{ ...inputBase(errors.message), padding: '12px 14px', resize: 'vertical', minHeight: '140px' }}
          onFocus={e => { e.target.style.borderColor = 'rgba(100,255,218,0.4)'; }}
          onBlur={e => { e.target.style.borderColor = errors.message ? 'rgba(255,100,100,0.45)' : '#272727'; }}
          maxLength={1000}
          placeholder="What's on your mind?"
        />
        {errors.message && <span style={errStyle}>{errors.message}</span>}
      </div>

      {status === 'rate-limited' && (
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: 'rgba(255,200,80,0.85)', marginBottom: '14px' }}>
          Too many requests — please wait a moment before sending again.
        </p>
      )}
      {status === 'error' && (
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: 'rgba(255,110,110,0.85)', marginBottom: '14px' }}>
          Something went wrong. Please try again or email directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-shine font-display text-xs font-bold min-h-[48px]"
        style={{
          background: status === 'sending' ? 'rgba(100,255,218,0.55)' : '#64ffda',
          color: '#0a0a0a',
          border: 'none',
          padding: '12px 32px',
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          opacity: status === 'sending' ? 0.75 : 1,
          transition: 'opacity 0.2s',
          letterSpacing: '0.05em',
        }}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  );
}

// ================================================================
// FOOTER / CONTACT
// ================================================================
function Footer() {
  const { meta, social } = portfolioData;
  const [ref, inView] = useInView();
  const [bottomRef, bottomInView] = useInView();
  const socialsRef = useRef(null);

  useEffect(() => {
    if (!socialsRef.current) return;
    const icons = socialsRef.current.querySelectorAll('[data-stagger]');
    if (bottomInView) {
      icons.forEach((el, i) => { el.style.transitionDelay = i * 80 + 'ms'; });
    } else {
      icons.forEach((el) => { el.style.transitionDelay = '0ms'; });
    }
  }, [bottomInView]);

  const SOCIALS = [
    { icon: Github,   href: social.github,           label: 'GitHub' },
    { icon: Linkedin, href: social.linkedin,          label: 'LinkedIn' },
    { icon: Twitter,  href: social.twitter,           label: 'Twitter' },
    { icon: Mail,     href: `mailto:${social.email}`, label: 'Email' },
  ];

  return (
    <footer id="contact" style={{ background: 'linear-gradient(180deg, #0e0e0e 0%, #050505 55%, #020202 100%)', borderTop: '1px solid rgba(100,255,218,0.07)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24">
        {/* CTA block */}
        <div ref={ref} className={`fade-up ${inView ? 'in-view' : ''} mb-12 sm:mb-16 lg:mb-20`}>
          <div className="text-center mb-10 sm:mb-12">
            <p className="font-display text-[#777] text-xs uppercase tracking-widest mb-4">
              Currently open to new opportunities
            </p>
            <h2
              className="font-display font-bold text-[#e8e8e8] mb-2 leading-tight"
              style={{ fontSize: 'clamp(1.5rem,5vw,3.5rem)' }}
            >
              Let's build something<br />
              <span style={{ color: '#64ffda' }}>together.</span>
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>

        <div className="w-full h-px mb-12" style={{ background: 'linear-gradient(90deg, transparent 0%, #333 20%, rgba(100,255,218,0.28) 50%, #333 80%, transparent 100%)' }} />

        <div ref={bottomRef} className={`anim-fade ${bottomInView ? 'in-view' : ''} flex flex-col md:flex-row items-center justify-between gap-6`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl font-bold text-[#666] hover:text-[#e8e8e8] transition-colors bg-transparent border-0 cursor-pointer p-0"
          >
            {meta.initials}<span style={{ color: '#64ffda' }}>.</span>
          </button>

          <div ref={socialsRef} className="flex items-center gap-6">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a key={label} data-stagger href={href} target="_blank" rel="noreferrer" aria-label={label} className={`social-icon fade-up ${bottomInView ? 'in-view' : ''} p-2.5 -m-2.5`}>
                <Icon size={18} />
              </a>
            ))}
          </div>

          <p className="font-display text-[#666] text-xs">
            Built with React <span style={{ color: '#64ffda' }}>·</span> {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ================================================================
// SCROLL TO TOP
// ================================================================
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-10 h-10 font-display"
      style={{
        border: '1px solid rgba(100,255,218,0.45)',
        color: '#64ffda',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(10px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <ArrowUp size={15} />
    </button>
  );
}

// ================================================================
// APP
// ================================================================
export default function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <ScrollToTop />
      <div style={{ background: '#111111' }}>
        <Nav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Achievements />
          <Blog />
        </main>
        <Footer />
      </div>
    </>
  );
}
