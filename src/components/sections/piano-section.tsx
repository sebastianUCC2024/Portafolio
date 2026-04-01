"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/src/components/layout/container";

// Cada tecla del piano mapea a una habilidad concreta del portafolio
const pianoKeys = [
  {
    note: "C4",
    frequency: 261.63,
    keyboardKey: "a",
    isBlack: false,
    skill: "HTML & CSS",
    category: "Frontend",
    level: 90,
    color: "#f97316",
  },
  {
    note: "C#4",
    frequency: 277.18,
    keyboardKey: "w",
    isBlack: true,
    skill: "JavaScript",
    category: "Frontend",
    level: 82,
    color: "#eab308",
  },
  {
    note: "D4",
    frequency: 293.66,
    keyboardKey: "s",
    isBlack: false,
    skill: "TypeScript",
    category: "Frontend",
    level: 75,
    color: "#3b82f6",
  },
  {
    note: "D#4",
    frequency: 311.13,
    keyboardKey: "e",
    isBlack: true,
    skill: "React / Next.js",
    category: "Frontend",
    level: 80,
    color: "#06b6d4",
  },
  {
    note: "E4",
    frequency: 329.63,
    keyboardKey: "d",
    isBlack: false,
    skill: "Tailwind CSS",
    category: "Frontend",
    level: 88,
    color: "#10b981",
  },
  {
    note: "F4",
    frequency: 349.23,
    keyboardKey: "f",
    isBlack: false,
    skill: "Python",
    category: "Backend",
    level: 85,
    color: "#8b5cf6",
  },
  {
    note: "F#4",
    frequency: 369.99,
    keyboardKey: "t",
    isBlack: true,
    skill: "Django",
    category: "Backend",
    level: 78,
    color: "#a3e635",
  },
  {
    note: "G4",
    frequency: 392.0,
    keyboardKey: "g",
    isBlack: false,
    skill: "APIs REST",
    category: "Backend",
    level: 80,
    color: "#f43f5e",
  },
  {
    note: "G#4",
    frequency: 415.3,
    keyboardKey: "y",
    isBlack: true,
    skill: "PostgreSQL",
    category: "Bases de datos",
    level: 70,
    color: "#0ea5e9",
  },
  {
    note: "A4",
    frequency: 440.0,
    keyboardKey: "h",
    isBlack: false,
    skill: "Git & GitHub",
    category: "Flujo de trabajo",
    level: 87,
    color: "#ec4899",
  },
  {
    note: "A#4",
    frequency: 466.16,
    keyboardKey: "u",
    isBlack: true,
    skill: "SQL",
    category: "Bases de datos",
    level: 72,
    color: "#14b8a6",
  },
  {
    note: "B4",
    frequency: 493.88,
    keyboardKey: "j",
    isBlack: false,
    skill: "Responsive Design",
    category: "Flujo de trabajo",
    level: 85,
    color: "#f59e0b",
  },
  {
    note: "C5",
    frequency: 523.25,
    keyboardKey: "k",
    isBlack: false,
    skill: "UI / UX",
    category: "Flujo de trabajo",
    level: 76,
    color: "#a78bfa",
  },
];

const categoryColors: Record<string, string> = {
  Frontend: "#06b6d4",
  Backend: "#8b5cf6",
  "Bases de datos": "#0ea5e9",
  "Flujo de trabajo": "#10b981",
};

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  tx: number;
  ty: number;
  size: number;
};

type WaveBar = { id: number; height: number; color: string };

// Posiciones left de las teclas negras respecto al ancho total del teclado de 8 blancas
const blackKeyLeftMap: Record<string, string> = {
  "C#4": "calc(100% / 8 * 1 - 22px)",
  "D#4": "calc(100% / 8 * 2 - 22px)",
  "F#4": "calc(100% / 8 * 4 - 22px)",
  "G#4": "calc(100% / 8 * 5 - 22px)",
  "A#4": "calc(100% / 8 * 6 - 22px)",
};

export default function PianoSection() {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);
  const [playedNotes, setPlayedNotes] = useState<Set<string>>(new Set());
  const [lastPlayed, setLastPlayed] = useState<(typeof pianoKeys)[0] | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [waveBars, setWaveBars] = useState<WaveBar[]>([]);
  const [volume, setVolume] = useState(0.35);
  const [isVisible, setIsVisible] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const particleIdRef = useRef(0);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Ocultar hint despues de 5 s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Barras de onda en tiempo real
  useEffect(() => {
    if (!activeNote) {
      setWaveBars([]);
      return;
    }
    const key = pianoKeys.find((k) => k.note === activeNote);
    const buildBars = () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        height: Math.random() * 75 + 10,
        color: key?.color ?? "#10b981",
      }));
    setWaveBars(buildBars());
    const interval = setInterval(() => setWaveBars(buildBars()), 120);
    return () => clearInterval(interval);
  }, [activeNote]);

  const spawnParticles = useCallback(
    (x: number, y: number, color: string) => {
      const burst: Particle[] = Array.from({ length: 14 }, () => ({
        id: particleIdRef.current++,
        x,
        y,
        color,
        tx: (Math.random() - 0.5) * 140,
        ty: -(Math.random() * 110 + 30),
        size: Math.random() * 7 + 3,
      }));
      setParticles((prev) => [...prev, ...burst]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !burst.find((b) => b.id === p.id)));
      }, 750);
    },
    []
  );

  const playNote = useCallback(
    (keyData: (typeof pianoKeys)[0], triggerEl?: HTMLElement) => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(keyData.frequency, ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2600, ctx.currentTime);
      filter.Q.setValueAtTime(1.0, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2.0);

      // Particulas
      if (triggerEl) {
        const rect = triggerEl.getBoundingClientRect();
        const containerRect = sectionRef.current?.getBoundingClientRect();
        if (containerRect) {
          spawnParticles(
            rect.left - containerRect.left + rect.width / 2,
            rect.top - containerRect.top + rect.height / 3,
            keyData.color
          );
        }
      }

      setActiveNote(keyData.note);
      setLastPlayed(keyData);
      setPlayedNotes((prev) => new Set(prev).add(keyData.note));
      setTimeout(() => setActiveNote(null), 220);
    },
    [volume, spawnParticles]
  );

  // Teclado fisico
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const keyData = pianoKeys.find((k) => k.keyboardKey === e.key.toLowerCase());
      if (!keyData) return;
      const el = document.querySelector(`[data-piano-note="${keyData.note}"]`) as HTMLElement | null;
      playNote(keyData, el ?? undefined);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [playNote]);

  const whiteKeys = pianoKeys.filter((k) => !k.isBlack);
  const blackKeys = pianoKeys.filter((k) => k.isBlack);

  const displayKey = hoveredNote
    ? pianoKeys.find((k) => k.note === hoveredNote)
    : lastPlayed;

  const discoveredByCategory = pianoKeys.reduce<Record<string, { total: number; found: number }>>(
    (acc, k) => {
      if (!acc[k.category]) acc[k.category] = { total: 0, found: 0 };
      acc[k.category].total++;
      if (playedNotes.has(k.note)) acc[k.category].found++;
      return acc;
    },
    {}
  );

  return (
    <section
      ref={sectionRef}
      id="piano"
      className="relative overflow-hidden border-b border-border py-24 sm:py-28 lg:py-32"
    >
      {/* Fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(16,185,129,0.08),transparent)]" />
      </div>

      {/* Particulas */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            ["--tx" as string]: `${p.tx}px`,
            ["--ty" as string]: `${p.ty}px`,
            animation: "particle-float 0.75s ease-out forwards",
          }}
        />
      ))}

      <Container>
        {/* Header */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Stack interactivo
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Mi stack, en cada nota
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Cada tecla suena y revela una habilidad de mi portafolio. Usa el mouse o tu teclado{" "}
            <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">A S D F G H J K</kbd>{" "}
            para blancas y{" "}
            <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">W E T Y U</kbd>{" "}
            para negras.
          </p>
        </div>

        {/* Panel principal */}
        <div
          className="relative mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 200ms, transform 0.6s ease 200ms",
          }}
        >
          <div className="relative mx-auto max-w-5xl">

            {/* Panel de info + visualizador */}
            <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                {/* Info habilidad */}
                <div className="flex min-h-[64px] flex-1 items-center gap-4">
                  {displayKey ? (
                    <>
                      {/* Barra de nivel circular pequeña */}
                      <div
                        className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300"
                        style={{
                          backgroundColor: `${displayKey.color}15`,
                          borderColor: `${displayKey.color}40`,
                          boxShadow: `0 0 24px ${displayKey.color}20`,
                        }}
                      >
                        <span className="text-lg font-bold" style={{ color: displayKey.color }}>
                          {displayKey.level}
                          <span className="text-xs font-normal">%</span>
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                          {displayKey.category}
                        </p>
                        <h3
                          className="mt-0.5 text-2xl font-bold leading-none transition-colors duration-200"
                          style={{ color: displayKey.color }}
                        >
                          {displayKey.skill}
                        </h3>
                        {/* Barra de nivel */}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-border">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${displayKey.level}%`,
                                backgroundColor: displayKey.color,
                                boxShadow: `0 0 8px ${displayKey.color}60`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted">dominio</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-accent">
                        <svg className="h-6 w-6 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted">Toca una tecla</p>
                        <p className="mt-0.5 text-xs text-muted/70">Descubre mi stack tecnologico</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visualizador de onda + volumen */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <div className="flex h-14 items-end gap-px">
                    {waveBars.length > 0
                      ? waveBars.map((bar) => (
                          <div
                            key={bar.id}
                            className="w-1 rounded-full transition-all duration-[80ms]"
                            style={{
                              height: `${bar.height}%`,
                              backgroundColor: bar.color,
                              boxShadow: `0 0 5px ${bar.color}50`,
                            }}
                          />
                        ))
                      : Array.from({ length: 18 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 rounded-full"
                            style={{
                              height: `${12 + Math.sin(i * 0.8) * 8}%`,
                              backgroundColor: "var(--border)",
                            }}
                          />
                        ))}
                  </div>
                  {/* Volumen */}
                  <div className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      {volume > 0.15 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
                      {volume > 0.3 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
                    </svg>
                    <input
                      type="range"
                      min="0"
                      max="0.6"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      aria-label="Volumen"
                      className="h-1 w-14 cursor-pointer appearance-none rounded-full bg-border [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Hint */}
              {showHint && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-primary/15 bg-primary/5 px-4 py-2 text-xs text-primary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  Toca las teclas del piano para descubrir cada habilidad con su nivel de dominio
                </div>
              )}
            </div>

            {/* Cuerpo del piano */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/90 px-6 pb-6 pt-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

              <div className="relative">
                {/* Teclas blancas */}
                <div className="relative flex h-52 gap-1.5 sm:h-64">
                  {whiteKeys.map((keyData) => {
                    const isActive = activeNote === keyData.note;
                    const wasPlayed = playedNotes.has(keyData.note);
                    const isHovered = hoveredNote === keyData.note;

                    return (
                      <button
                        key={keyData.note}
                        type="button"
                        data-piano-note={keyData.note}
                        onMouseDown={(e) => playNote(keyData, e.currentTarget)}
                        onMouseEnter={() => setHoveredNote(keyData.note)}
                        onMouseLeave={() => setHoveredNote(null)}
                        className="group relative flex flex-1 flex-col items-center justify-end rounded-b-2xl border transition-all duration-75 focus:outline-none"
                        style={{
                          backgroundColor: isActive
                            ? keyData.color
                            : isHovered
                            ? `${keyData.color}14`
                            : wasPlayed
                            ? `${keyData.color}07`
                            : "var(--card)",
                          borderColor: isActive
                            ? keyData.color
                            : isHovered
                            ? `${keyData.color}55`
                            : wasPlayed
                            ? `${keyData.color}28`
                            : "var(--border)",
                          boxShadow: isActive
                            ? `0 0 40px ${keyData.color}55, 0 6px 18px ${keyData.color}28, inset 0 -4px 0 ${keyData.color}70`
                            : isHovered
                            ? `0 0 18px ${keyData.color}20, inset 0 -3px 0 ${keyData.color}35`
                            : wasPlayed
                            ? `inset 0 -2px 0 ${keyData.color}25`
                            : "inset 0 -2px 0 rgba(0,0,0,0.1)",
                          transform: isActive ? "translateY(3px) scaleY(0.98)" : "none",
                        }}
                      >
                        {isActive && (
                          <span
                            className="absolute inset-0 rounded-b-2xl animate-ripple"
                            style={{ backgroundColor: `${keyData.color}22` }}
                          />
                        )}

                        {/* Nombre corto de la habilidad */}
                        <span
                          className="mb-1 px-0.5 text-center text-[8px] font-semibold leading-tight uppercase tracking-wide transition-colors duration-75 sm:text-[9px]"
                          style={{
                            color: isActive
                              ? "#fff"
                              : isHovered || wasPlayed
                              ? keyData.color
                              : "var(--muted)",
                          }}
                        >
                          {keyData.skill}
                        </span>

                        {/* Tecla de teclado */}
                        <span
                          className="mb-3 flex h-5 w-5 items-center justify-center rounded-md border text-[9px] font-mono font-semibold uppercase"
                          style={{
                            backgroundColor: isActive ? "rgba(255,255,255,0.18)" : "var(--accent)",
                            borderColor: isActive ? "rgba(255,255,255,0.28)" : "var(--border)",
                            color: isActive ? "#fff" : "var(--muted-foreground)",
                          }}
                        >
                          {keyData.keyboardKey.toUpperCase()}
                        </span>

                        {/* Punto visitado */}
                        {wasPlayed && !isActive && (
                          <span
                            className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                            style={{ backgroundColor: keyData.color }}
                          />
                        )}
                      </button>
                    );
                  })}

                  {/* Teclas negras */}
                  {blackKeys.map((keyData) => {
                    const isActive = activeNote === keyData.note;
                    const wasPlayed = playedNotes.has(keyData.note);
                    const isHovered = hoveredNote === keyData.note;
                    const leftVal = blackKeyLeftMap[keyData.note];
                    if (!leftVal) return null;

                    return (
                      <button
                        key={keyData.note}
                        type="button"
                        data-piano-note={keyData.note}
                        onMouseDown={(e) => playNote(keyData, e.currentTarget)}
                        onMouseEnter={() => setHoveredNote(keyData.note)}
                        onMouseLeave={() => setHoveredNote(null)}
                        className="absolute top-0 z-20 flex flex-col items-center justify-end rounded-b-xl pb-2 focus:outline-none"
                        style={{
                          left: leftVal,
                          width: "9%",
                          maxWidth: 50,
                          minWidth: 34,
                          height: "60%",
                          backgroundColor: isActive
                            ? keyData.color
                            : isHovered
                            ? "#2a3340"
                            : wasPlayed
                            ? "#1e2530"
                            : "#111722",
                          boxShadow: isActive
                            ? `0 0 28px ${keyData.color}65, 0 5px 14px rgba(0,0,0,0.5)`
                            : isHovered
                            ? `0 0 16px ${keyData.color}28, 0 4px 12px rgba(0,0,0,0.6)`
                            : "0 4px 12px rgba(0,0,0,0.6)",
                          borderBottom: `2px solid ${
                            isActive
                              ? keyData.color
                              : wasPlayed
                              ? keyData.color + "55"
                              : "rgba(255,255,255,0.05)"
                          }`,
                          transform: isActive ? "translateY(3px)" : "none",
                          transition: "all 0.07s ease-out",
                        }}
                      >
                        {isActive && (
                          <span
                            className="absolute inset-0 rounded-b-xl animate-ripple"
                            style={{ backgroundColor: `${keyData.color}28` }}
                          />
                        )}
                        <span
                          className="px-0.5 text-center text-[7px] font-bold leading-tight uppercase tracking-wide"
                          style={{
                            color: isActive
                              ? "#fff"
                              : wasPlayed
                              ? keyData.color
                              : "rgba(255,255,255,0.45)",
                          }}
                        >
                          {keyData.skill.split(" ")[0]}
                        </span>
                        <span
                          className="mt-1 text-[7px] font-mono font-semibold uppercase"
                          style={{
                            color: isActive ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.28)",
                          }}
                        >
                          {keyData.keyboardKey.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sombra inferior */}
                <div className="mt-3 h-3 rounded-full bg-background/50 blur-sm" />
              </div>
            </div>

            {/* Progreso por categoria */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.entries(discoveredByCategory).map(([cat, { total, found }], idx) => {
                const pct = Math.round((found / total) * 100);
                const catColor = categoryColors[cat] ?? "#10b981";
                return (
                  <div
                    key={cat}
                    className="rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transition: `opacity 0.4s ease ${400 + idx * 80}ms, transform 0.3s ease`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground">
                        {cat}
                      </p>
                      <span
                        className="text-xs font-bold"
                        style={{ color: catColor }}
                      >
                        {found}/{total}
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: catColor,
                          boxShadow: pct > 0 ? `0 0 8px ${catColor}50` : undefined,
                        }}
                      />
                    </div>
                    <p className="mt-1.5 text-[10px] text-muted">{pct}% descubierto</p>
                  </div>
                );
              })}
            </div>

            {/* Barra de progreso global */}
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-border bg-card/60 px-5 py-4">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300"
                style={{
                  borderColor: playedNotes.size === pianoKeys.length ? "var(--primary)" : "var(--border)",
                  color: playedNotes.size === pianoKeys.length ? "var(--primary)" : "var(--muted-foreground)",
                  backgroundColor: playedNotes.size === pianoKeys.length ? "rgba(16,185,129,0.1)" : "var(--accent)",
                }}
              >
                {playedNotes.size}
              </div>
              <div className="flex-1">
                <div className="mb-1.5 flex justify-between text-xs text-muted">
                  <span>Habilidades descubiertas</span>
                  <span>{playedNotes.size} / {pianoKeys.length}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(playedNotes.size / pianoKeys.length) * 100}%`,
                      background: "linear-gradient(to right, var(--primary), var(--secondary))",
                    }}
                  />
                </div>
              </div>
              {playedNotes.size === pianoKeys.length && (
                <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Completo
                </span>
              )}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
