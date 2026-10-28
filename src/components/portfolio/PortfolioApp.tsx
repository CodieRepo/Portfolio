'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Command } from 'cmdk';
import confetti from 'canvas-confetti';
import { animate, createTimeline, stagger } from 'animejs';
import Image from 'next/image';
import {
  ArrowUpRight,
  AudioLines,
  BriefcaseBusiness,
  Bot,
  CalendarDays,
  Command as CommandIcon,
  Globe,
  Mail,
  Moon,
  Rocket,
  Send,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/cn';
import { webAudio } from '@/utils/WebAudioEngine';

const spring = { type: 'spring', stiffness: 350, damping: 25 } as const;

type Project = {
  title: string;
  badge: string;
  description: string;
  tech: string[];
  live?: string;
  source?: string;
  metrics?: string[];
  large?: boolean;
};

const projects: Project[] = [
  {
    title: 'Polaris — National Polar Mission Ops',
    badge: 'NCPOR / MoES Mission Control Suite',
    description:
      'Central mission registry & real-time operational intelligence suite for Indian Antarctic (Bharati, Maitri) and Arctic (Himadri) scientific missions.',
    tech: ['Next.js', 'TypeScript', 'GeoJSON', 'Telemetry Feeds', 'Real-time Visualizations'],
    live: 'https://polaris-five-eta.vercel.app/',
    metrics: ['Ice-shelf breakout alerts', 'Fuel reserve tracking', 'Live mission telemetry'],
    large: true,
  },
  {
    title: 'Udyogsetu — Industrial Dependency Engine',
    badge: 'SIH Industrial Dependency & DAG Engine',
    description:
      'Industrial approvals, compliance & dependency intelligence platform with deterministic DAG logic and what-if simulation lab based on RTSA 2015 & BRAP standards.',
    tech: ['Next.js', 'Graph DAG', 'Interactive Flows', 'Tailwind CSS', 'TypeScript'],
    live: 'https://udyogsetu-orcin.vercel.app/',
    metrics: ['Deterministic dependency engine', 'Compliance orchestration', 'Scenario simulation'],
    large: true,
  },
  {
    title: 'Muddly — Playful Interactive Platform',
    badge: 'Creative Flagship / Gen-Z Concept',
    description:
      'Next-gen creative web app featuring tactile micro-interactions, dynamic state handling, and gamified user experiences.',
    tech: ['Next.js', 'Framer Motion', 'Node.js', 'Tailwind CSS', 'WebSockets'],
    live: 'https://muddly.vercel.app/',
    source: 'https://github.com/CodieRepo',
  },
  {
    title: 'Trinetra Digital Solution',
    badge: 'Founder & Lead Architect',
    description:
      'AI automation agency engineering custom multi-tier microservices, intelligent workflows, and conversion-focused digital systems.',
    tech: ['Spring Boot', 'Node.js', 'Next.js', 'PostgreSQL', 'AI Agents'],
  },
  {
    title: 'Akuafi.com & VaastuInfra.com',
    badge: 'Enterprise Client Implementations',
    description:
      'High-conversion business portals with custom booking engines, dynamic CMS architecture, and Lighthouse scores above 98.',
    tech: ['CMS', 'Booking Engine', 'Performance', 'SEO', 'Analytics'],
    live: 'https://akuafi.com/',
    source: 'https://vaastuinfra.com/',
  },
];

const marqueeItems = [
  'JAVA',
  'NEXT.JS',
  'SPRING BOOT',
  'FRAMER MOTION',
  'AI AGENTS',
  'SYSTEM DESIGN',
  'WEBGL',
  'AUTOMATION',
  'GRAPH ALGORITHMS',
];

function TiltCard({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [10, -10]), spring);
  const rotateY = useSpring(useTransform(x, [-60, 60], [-10, 10]), spring);

  return (
    <motion.div
      ref={ref}
      className={cn('neo-card p-5 md:p-6 will-change-transform', className)}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={spring}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );
}

function NeoButton({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base = cn('neo-btn text-sm md:text-base', className);
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={base} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={base} onClick={onClick}>
      {children}
    </button>
  );
}

export function PortfolioApp() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [commandOpen, setCommandOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const dragBoundary = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const tunnelRef = useRef<HTMLDivElement | null>(null);

  const sections = useMemo(
    () => [
      { id: 'hero', label: 'Hero' },
      { id: 'mindset', label: 'Mindset & Story' },
      { id: 'projects', label: 'Featured Projects' },
      { id: 'process', label: 'Engineering Process' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const reaction = useMemo(() => {
    const score = form.name.length + form.email.length + form.message.length;
    if (score > 70) return '🤯';
    if (score > 35) return '🔥';
    if (score > 10) return '🚀';
    return '🙂';
  }, [form]);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  const { scrollYProgress: pageProgress } = useScroll();

  const heroSceneScale = useTransform(heroProgress, [0, 1], [1, 1.22]);
  const heroSceneY = useTransform(heroProgress, [0, 1], [0, -150]);
  const heroContentScale = useTransform(heroProgress, [0, 1], [1, 0.9]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, -90]);
  const avatarPanelScale = useTransform(heroProgress, [0, 1], [1, 1.3]);
  const avatarPanelRotate = useTransform(heroProgress, [0, 1], [0, -5]);
  const portalScale = useTransform(heroProgress, [0, 1], [0.85, 1.35]);
  const portalOpacity = useTransform(heroProgress, [0, 0.8, 1], [0.45, 0.25, 0.05]);
  const tunnelScale = useTransform(pageProgress, [0, 1], [1, 1.35]);
  const tunnelRotate = useTransform(pageProgress, [0, 1], [0, 4]);
  const tunnelY = useTransform(pageProgress, [0, 1], [0, -280]);

  useEffect(() => {
    const heroEnter = createTimeline({ defaults: { ease: 'outExpo', duration: 900 } });

    heroEnter
      .add('.hero-badge', {
        opacity: [0, 1],
        y: [32, 0],
        delay: stagger(80),
      })
      .add(
        '.hero-word',
        {
          opacity: [0, 1],
          y: [70, 0],
          rotate: [2, 0],
          delay: stagger(95),
        },
        '-=540'
      )
      .add(
        '.hero-cta',
        {
          opacity: [0, 1],
          scale: [0.82, 1],
          y: [16, 0],
          delay: stagger(120),
        },
        '-=460'
      );

    const portalPulse = animate('.portal-ring', {
      scale: [0.84, 1.22],
      opacity: [0.45, 0.1],
      ease: 'inOutSine',
      delay: stagger(160),
      duration: 2200,
      loop: true,
    });

    const orbitMove = animate('.orbiter', {
      y: [-8, 8],
      x: [3, -3],
      ease: 'inOutSine',
      duration: 2200,
      direction: 'alternate',
      delay: stagger(200),
      loop: true,
    });

    const revealEls = document.querySelectorAll<HTMLElement>('.reveal-block');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target, {
            opacity: [0, 1],
            y: [64, 0],
            scale: [0.95, 1],
            ease: 'outExpo',
            duration: 980,
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => {
      heroEnter.pause();
      portalPulse.pause();
      orbitMove.pause();
      observer.disconnect();
    };
  }, []);

  const playClick = () => soundOn && webAudio.playClickTone();
  const playHover = () => soundOn && webAudio.playHoverTone();

  const scrollTo = (id: string) => {
    playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCommandOpen(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    playClick();
    setSubmitted(true);
    confetti({
      particleCount: 140,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ccff00', '#ff66c4', '#8b5cf6', '#00f0ff', '#ff5c00'],
    });
    setTimeout(() => setSubmitted(false), 2200);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] selection:bg-[#CCFF00] selection:text-black">
      <motion.div
        ref={tunnelRef}
        aria-hidden
        className="tunnel-viewport"
        style={{ scale: tunnelScale, rotate: tunnelRotate, y: tunnelY }}
      >
        <div className="tunnel-depth">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={`ring-${idx}`}
              className="tunnel-ring"
              style={{
                transform: `translate(-50%, -50%) translateZ(${idx * -180}px) scale(${1 + idx * 0.2})`,
                opacity: Math.max(0.06, 0.35 - idx * 0.022),
              }}
            />
          ))}
          <div className="tunnel-rail left" />
          <div className="tunnel-rail right" />
        </div>
      </motion.div>

      <div className="pointer-events-none fixed inset-0 z-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,var(--grid)_1px,transparent_0)] [background-size:26px_26px]" />

      <header className="sticky top-0 z-40 border-b-2 border-[var(--line)] bg-[color:var(--bg)/0.84] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-3 px-4 py-3 md:px-8">
          <button className="neo-pill" onClick={() => scrollTo('hero')} onMouseEnter={playHover}>
            Satwik Pal // Dev
          </button>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              className="neo-icon-btn"
              onClick={() => {
                const muted = webAudio.toggleMute();
                setSoundOn(!muted);
              }}
              onMouseEnter={playHover}
              aria-label="Toggle sound"
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="hidden text-xs md:inline">{soundOn ? 'Sound ON' : 'Sound OFF'}</span>
            </button>

            <button
              className="neo-icon-btn"
              onClick={() => {
                playClick();
                setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
              }}
              onMouseEnter={playHover}
              aria-label="Toggle theme"
            >
              <motion.span
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 1.08 }}
                transition={spring}
              >
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              </motion.span>
              <span className="hidden text-xs md:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>

            <button className="neo-icon-btn" onClick={() => setCommandOpen(true)} onMouseEnter={playHover}>
              <CommandIcon size={16} />
              <span className="text-xs">Cmd+K</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-8 md:px-8 md:py-12">
        <section id="hero" ref={heroRef} className="relative min-h-[180vh] pb-12 pt-2 md:min-h-[190vh] md:pb-16">
          <motion.div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ scale: heroSceneScale, y: heroSceneY }}
            aria-hidden
          >
            <div className="absolute -left-12 top-14 h-56 w-56 rounded-full bg-[var(--accent-purple)]/25 blur-3xl" />
            <div className="absolute right-10 top-12 h-72 w-72 rounded-full bg-[var(--accent-cyan)]/30 blur-3xl" />
            <div className="absolute bottom-16 left-1/3 h-72 w-72 rounded-full bg-[var(--accent-pink)]/20 blur-3xl" />
          </motion.div>

          <div className="sticky top-20 flex min-h-[calc(100vh-6rem)] items-center">
            <motion.div style={{ scale: heroContentScale, y: heroContentY }} className="grid w-full gap-6 md:grid-cols-2 md:gap-8 tunnel-content-layer">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
                <div className="mb-4 flex flex-wrap gap-2">
                  {['Available for Q4/2026 Projects', 'Founder @ Trinetra', 'AI + Full-Stack', 'Gorakhpur, UP, India'].map((pill) => (
                    <span key={pill} className="neo-pill hero-badge text-xs">
                      {pill}
                    </span>
                  ))}
                </div>

                <h1 className="text-balance text-4xl font-black leading-[0.98] tracking-tight md:text-6xl xl:text-7xl">
                  <span className="hero-word block">Satwik Pal</span>
                  <span className="hero-word block bg-gradient-to-r from-[var(--accent-lime)] to-[#f2ff9f] bg-clip-text text-transparent">
                    Creative Technologist
                  </span>
                  <span className="hero-word block bg-gradient-to-r from-[var(--accent-cyan)] to-[#7ef7ff] bg-clip-text text-transparent">
                    &amp; Full Stack Developer | AI Automation Engineer
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
                  Engineering physical machines taught me structure. Engineering digital systems taught me leverage. I build
                  high-scale, AI-driven kinetic web systems.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <NeoButton onClick={() => scrollTo('projects')} className="hero-cta bg-[var(--accent-lime)] text-black">
                    Explore Projects 🎯
                  </NeoButton>
                  <NeoButton onClick={() => scrollTo('contact')} className="hero-cta bg-[var(--accent-pink)] text-black">
                    Book Consultation ☕
                  </NeoButton>
                </div>

                <motion.p
                  className="mt-6 inline-flex rounded-full border-2 border-[var(--line)] bg-[var(--card)] px-3 py-1 text-xs font-black text-[var(--accent-cyan)]"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                >
                  ↓ Scroll to enter mission mode
                </motion.p>
              </motion.div>

              <motion.div
                ref={dragBoundary}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring}
                style={{ scale: avatarPanelScale, rotate: avatarPanelRotate }}
                className="neo-card relative min-h-[380px] md:min-h-[480px] overflow-hidden bg-[linear-gradient(145deg,var(--card),var(--card-2))] flex flex-col items-center justify-center p-4 md:p-6"
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[1.1rem] border-2 border-[var(--accent-cyan)]/40"
                  style={{ scale: portalScale, opacity: portalOpacity }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-8 rounded-[1.1rem] border border-[var(--accent-lime)]/35"
                  style={{ scale: portalScale, opacity: portalOpacity }}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_40%,rgba(0,240,255,0.2),transparent_52%),radial-gradient(circle_at_50%_70%,rgba(139,92,246,0.28),transparent_46%)]" />

                <motion.div
                  className="absolute left-4 top-4 z-20 rounded-full border-2 border-[var(--line)] bg-[var(--accent-cyan)] px-3 py-1 text-xs font-bold text-black shadow-[3px_3px_0px_var(--line)]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Hey, I&apos;m Satwik! 👾
                </motion.div>
                <motion.div
                  className="absolute right-4 top-4 z-20 rounded-full border-2 border-[var(--line)] bg-[var(--accent-pink)] px-3 py-1 text-xs font-bold text-black shadow-[3px_3px_0px_var(--line)]"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY }}
                >
                  Scroll down to explore 🚀
                </motion.div>

                {[0, 1, 2, 3, 4].map((ring) => (
                  <div
                    key={ring}
                    className="portal-ring pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-white/20"
                    style={{
                      width: 80 + ring * 58,
                      height: 80 + ring * 58,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}

                {/* Main Hero Developer Picture */}
                <div className="relative z-10 w-full max-w-[500px] my-auto pt-6 pb-2">
                  <motion.div
                    className="group relative w-full aspect-[1024/682] rounded-2xl overflow-hidden border-2 border-[var(--line)] shadow-[8px_8px_0px_var(--line)] bg-[#050608]"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                  >
                    <Image
                      src="/hero-avatar.jpg"
                      alt="Satwik Pal — Full Stack Developer & AI Automation Engineer"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient overlay & inner border */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

                    {/* Interactive HUD labels on bottom bar */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] md:text-xs font-mono font-bold">
                      <span className="flex items-center gap-1.5 rounded-md bg-black/85 backdrop-blur-md px-2.5 py-1 text-[var(--accent-lime)] border border-[var(--accent-lime)]/30">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent-lime)] animate-ping" />
                        SYS.ONLINE // ACTIVE
                      </span>
                      <span className="rounded-md bg-black/85 backdrop-blur-md px-2.5 py-1 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30">
                        &lt;/&gt; SATWIK PAL
                      </span>
                    </div>
                  </motion.div>
                </div>

                {['AI Bots', 'Microservices', 'Kinetic UI'].map((sticker, idx) => (
                  <motion.div
                    key={sticker}
                    drag
                    dragConstraints={dragBoundary}
                    whileDrag={{ scale: 1.08 }}
                    className={cn(
                      'orbiter absolute z-20 cursor-grab rounded-2xl border-2 border-[var(--line)] bg-[var(--accent-orange)] px-3 py-1 text-xs font-black text-black shadow-[4px_4px_0px_var(--line)] active:shadow-[2px_2px_0px_var(--line)]',
                      idx === 0 && 'left-4 bottom-3 md:left-6 md:bottom-4',
                      idx === 1 && 'right-4 bottom-3 md:right-6 md:bottom-4',
                      idx === 2 && 'left-1/2 -translate-x-1/2 -top-2 md:-top-3'
                    )}
                  >
                    {sticker}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="neo-card reveal-block mb-12 overflow-hidden px-0 py-3 md:mb-16" aria-label="Tech ticker">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`} className="mx-3 text-sm font-black tracking-wide text-[var(--accent-lime)]">
                {item}
                <span className="ml-6 text-[var(--fg)]/40">•</span>
              </span>
            ))}
          </div>
        </section>

        <section id="mindset" className="reveal-block pb-12 md:pb-16">
          <div className="mb-4 flex items-center gap-2">
            <Bot size={18} />
            <h2 className="text-2xl font-black md:text-3xl">Mindset & Story</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            <TiltCard className="md:col-span-7">
              <p className="text-lg font-black">Why Mechanical Engineering made me a 10x Software Engineer</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Tolerance thinking trained precision. System dynamics trained architecture. Zero-failure production
                discipline trained reliability-first backend engineering. Today that translates into resilient full-stack
                systems with measurable throughput and conversion outcomes.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ['Tolerance', 'Precision in APIs + schema contracts'],
                  ['System Dynamics', 'Distributed flow and orchestration'],
                  ['Zero-Failure Thinking', '99.98% production reliability patterns'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border-2 border-[var(--line)] bg-[var(--card)] p-3">
                    <p className="text-sm font-black">{title}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{body}</p>
                  </div>
                ))}
              </div>
            </TiltCard>

            <TiltCard className="md:col-span-5">
              <p className="text-sm font-black uppercase tracking-wide">Skill Radar</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'Next.js',
                  'Java',
                  'Spring Boot',
                  'Node.js',
                  'System Design',
                  'AI Automation',
                  'Graph Algorithms',
                  'Framer Motion',
                ].map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="rounded-full border-2 border-[var(--line)] bg-[var(--accent-purple)] px-3 py-1 text-xs font-black text-white shadow-[4px_4px_0px_var(--line)]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              <div className="mt-5 space-y-2 text-xs font-bold">
                <p>⚡ 14,200+ Automated Leads Processed by AI Bots</p>
                <p>🚀 &lt; 35ms REST Microservices Latency</p>
                <p>🛡️ 99.98% Production Reliability</p>
                <p>📈 3.5x Client ROI Conversion Velocity</p>
              </div>
            </TiltCard>
          </div>
        </section>

        <section id="projects" className="reveal-block pb-12 md:pb-16">
          <div className="mb-4 flex items-center gap-2">
            <Rocket size={18} />
            <h2 className="text-2xl font-black md:text-3xl">Featured Projects Bento Grid</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            {projects.map((project) => (
              <TiltCard key={project.title} className={cn(project.large ? 'md:col-span-6' : 'md:col-span-4')}>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="neo-pill text-[11px]">{project.badge}</span>
                  <span className="rounded-full border-2 border-[var(--line)] bg-[var(--card)] px-2 py-0.5 text-[10px] font-bold uppercase">
                    Case Study
                  </span>
                </div>

                <h3 className="text-lg font-black leading-tight">{project.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{project.description}</p>

                <div className="mt-4 rounded-2xl border-2 border-[var(--line)] bg-[#0d111b] p-3 text-xs text-[#8be9fd] dark:bg-[#0d111b]">
                  <p className="font-mono text-[11px] text-[#f1fa8c]">preview.frame.tsx</p>
                  <p className="font-mono">&gt; Render interactive mission/flow widgets...</p>
                  <p className="font-mono">&gt; FPS stable: 60 • UX mode: kinetic</p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded bg-white/15">
                    <motion.div
                      className="h-full bg-[var(--accent-cyan)]"
                      initial={{ width: '8%' }}
                      whileInView={{ width: '94%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full border-2 border-[var(--line)] bg-[var(--card)] px-2 py-1 text-[11px] font-bold">
                      {item}
                    </span>
                  ))}
                </div>

                {project.metrics ? (
                  <ul className="mt-3 list-inside list-disc text-xs text-[var(--muted)]">
                    {project.metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.live ? (
                    <NeoButton href={project.live} className="bg-[var(--accent-lime)] text-black" onClick={playClick}>
                      Live Demo <ArrowUpRight size={14} />
                    </NeoButton>
                  ) : null}
                  {project.source ? (
                    <NeoButton href={project.source} className="bg-[var(--accent-pink)] text-black" onClick={playClick}>
                      Source / Link <ArrowUpRight size={14} />
                    </NeoButton>
                  ) : null}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="process" className="reveal-block pb-12 md:pb-16">
          <div className="mb-4 flex items-center gap-2">
            <AudioLines size={18} />
            <h2 className="text-2xl font-black md:text-3xl">Engineering Process</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['1. Workflow Framing 📐', 'Clarify business constraints, user flow, and system boundaries.'],
              ['2. Backend & DB Blueprint ⚙️', 'Design contracts, schema, orchestration, and fault tolerance paths.'],
              ['3. Kinetic Client UI 🎨', 'Build animated, tactile, conversion-focused interfaces with smooth motion.'],
              ['4. Automated CI/CD 🚀', 'Ship with observability, rollback safety, and velocity-friendly pipelines.'],
            ].map(([title, body]) => (
              <TiltCard key={title}>
                <p className="text-base font-black">{title}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="contact" className="reveal-block pb-8">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays size={18} />
            <h2 className="text-2xl font-black md:text-3xl">Interactive Contact & Let&apos;s Build</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            <TiltCard className="md:col-span-7">
              <form onSubmit={onSubmit} className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">Drop your idea. I&apos;ll architect the machine.</p>
                  <motion.span key={reaction} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-2xl">
                    {reaction}
                  </motion.span>
                </div>

                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Name"
                  className="w-full rounded-2xl border-2 border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm outline-none focus:-translate-y-0.5 focus:shadow-[4px_4px_0px_var(--line)]"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Your Email"
                  className="w-full rounded-2xl border-2 border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm outline-none focus:-translate-y-0.5 focus:shadow-[4px_4px_0px_var(--line)]"
                />
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Project vision, goals, deadline..."
                  rows={5}
                  className="w-full resize-none rounded-2xl border-2 border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm outline-none focus:-translate-y-0.5 focus:shadow-[4px_4px_0px_var(--line)]"
                />

                <NeoButton className="bg-[var(--accent-lime)] text-black">Hire Me / Launch Build 🚀</NeoButton>

                {submitted ? <p className="text-sm font-bold text-[var(--accent-lime)]">Message sent. Let&apos;s build. ✅</p> : null}
              </form>
            </TiltCard>

            <div className="grid gap-3 md:col-span-5">
              {[
                { label: 'GitHub', icon: Globe, href: 'https://github.com/CodieRepo' },
                { label: 'LinkedIn', icon: BriefcaseBusiness, href: 'https://www.linkedin.com/' },
                { label: 'Twitter / X', icon: Send, href: 'https://x.com/' },
                { label: 'Email', icon: Mail, href: 'mailto:satwikpal.dev@gmail.com' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="neo-card flex items-center justify-between p-4 transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2">
                    <social.icon size={16} />
                    <span className="text-sm font-black">{social.label}</span>
                  </div>
                  <ArrowUpRight size={14} />
                </a>
              ))}

              <div className="neo-card p-4">
                <p className="text-sm font-black">Education & Credentials</p>
                <ul className="mt-2 space-y-1 text-xs text-[var(--muted)]">
                  <li>• B.Tech CSE — Buddha Institute of Technology</li>
                  <li>• Diploma Mechanical Production — Maharana Pratap Polytechnic</li>
                  <li>• Java Full Stack Certification — Mindscripts Tech</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[var(--line)] px-4 py-6 text-xs md:px-8">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Satwik Pal — Founder, Trinetra Digital Solution (Gorakhpur, UP, India)</p>
          <p className="text-[var(--muted)]">Creative Technologist & Full Stack Developer | AI Automation Engineer</p>
        </div>
      </footer>

      <Command.Dialog open={commandOpen} onOpenChange={setCommandOpen} label="Command Palette" className="cmdk-dialog">
        <div className="cmdk-inner">
          <Command.Input className="cmdk-input" placeholder="Jump to section..." />
          <Command.List className="cmdk-list">
            <Command.Empty className="px-3 py-4 text-sm text-[var(--muted)]">No section found.</Command.Empty>
            <Command.Group heading="Sections" className="px-2 pb-2 pt-2 text-xs">
              {sections.map((section) => (
                <Command.Item
                  key={section.id}
                  onSelect={() => scrollTo(section.id)}
                  className="cmdk-item"
                  value={section.label}
                >
                  {section.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </div>
  );
}
