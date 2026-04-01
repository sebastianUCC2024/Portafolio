"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

// Cada nota del piano mapea a una seccion del portafolio
const pianoKeys = [
  {
    note: "C4",
    frequency: 261.63,
    keyboardKey: "a",
    isBlack: false,
    sectionId: "hero",
    sectionLabel: "Inicio",
    sectionDesc: "Presentacion personal",
    color: "#10b981",
    icon: "home",
  },
  {
    note: "C#4",
    frequency: 277.18,
    keyboardKey: "w",
    isBlack: true,
    sectionId: "projects",
    sectionLabel: "Proyectos",
    sectionDesc: "Mis trabajos",
    color: "#06b6d4",
    icon: "code",
  },
  {
    note: "D4",
    frequency: 293.66,
    keyboardKey: "s",
    isBlack: false,
    sectionId: "education",
    sectionLabel: "Formacion",
    sectionDesc: "Trayectoria academica",
    color: "#8b5cf6",
    icon: "book",
  },
  {
    note: "D#4",
    frequency: 311.13,
    keyboardKey: "e",
    isBlack: true,
    sectionId: "about",
    sectionLabel: "Sobre mi",
    sectionDesc: "Quien soy",
    color: "#f59e0b",
    icon: "user",
  },
  {
    note: "E4",
    frequency: 329.63,
    keyboardKey: "d",
    isBlack: false,
    sectionId: "skills",
    sectionLabel: "Habilidades",
    sectionDesc: "Stack tecnologico",
    color: "#ec4899",
    icon: "zap",
  },
  {
    note: "F4",
    frequency: 349.23,
    keyboardKey: "f",
    isBlack: false,
    sectionId: "piano",
    sectionLabel: "Piano",
    sectionDesc: "Tu estas aqui",
    color: "#3b82f6",
    icon: "music",
  },
  {
    note: "F#4",
    frequency: 369.99,
    keyboardKey: "t",
    isBlack: true,
    sectionId: "testimonials",
    sectionLabel: "Testimonios",
    sectionDesc: "Referencias",
    color: "#ef4444",
    icon: "star",
  },
  {
    note: "G4",
    frequency: 392.0,
    keyboardKey: "g",
    isBlack: false,
    sectionId: "contact",
    sectionLabel: "Contacto",
    sectionDesc: "Hablemos",
    color: "#14b8a6",
    icon: "mail",
  },
];

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  tx: number;
  ty: number;
  size: number;
};

type FloatingLabel = {
  id: number;
  label: string;
  x: number;
  color: string;
};

type WaveBar = {
  id: number;
  height: number;
  color: string;
};

function KeyIcon({ icon, className }: { icon: string; className?: string }) {
  if (icon === "home")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  if (icon === "code")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  if (icon === "book")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  if (icon === "user")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  if (icon === "zap")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  if (icon === "music")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    );
  if (icon === "star")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  if (icon === "mail")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  return null;
}

export default function PianoSection() {
  const { dictionary } = useLanguage();
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);
  const [navigatedSection, setNavigatedSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [playedKeys, setPlayedKeys] = useState<Set<string>>(new Set());
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingLabels, setFloatingLabels] = useState<FloatingLabel[]>([]);
  const [waveBars, setWaveBars] = useState<WaveBar[]>([]);
  const [volume, setVolume] = useState(0.35);
  const [showHint, setShowHint] = useState(true);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const particleIdRef = useRef(0);
  const labelIdRef = useRef(0);

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

  // Ocultar el hint despues de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Generar barras de onda cuando hay nota activa
  useEffect(() => {
    if (activeNote) {
      const key = pianoKeys.find((k) => k.note === activeNote);
      const bars = Array.from({ length: 14 }, (_, i) => ({
        id: i,
        height: Math.random() * 70 + 15,
        color: key?.color ?? "#10b981",
      }));
      setWaveBars(bars);
      const interval = setInterval(() => {
        setWaveBars(
          Array.from({ length: 14 }, (_, i) => ({
            id: i,
            height: Math.random() * 70 + 15,
            color: key?.color ?? "#10b981",
          }))
        );
      }, 150);
      return () => clearInterval(interval);
    } else {
      setWaveBars([]);
    }
  }, [activeNote]);

  const spawnParticles = useCallback(
    (x: number, y: number, color: string) => {
      const burst: Particle[] = Array.from({ length: 12 }, () => ({
        id: particleIdRef.current++,
        x,
        y,
        color,
        tx: (Math.random() - 0.5) * 120,
        ty: -(Math.random() * 100 + 30),
        size: Math.random() * 6 + 3,
      }));
      setParticles((prev) => [...prev, ...burst]);
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !burst.find((b) => b.id === p.id))
        );
      }, 700);
    },
    []
  );

  const spawnLabel = useCallback(
    (label: string, x: number, color: string) => {
      const id = labelIdRef.current++;
      setFloatingLabels((prev) => [...prev, { id, label, x, color }]);
      setTimeout(() => {
        setFloatingLabels((prev) => prev.filter((l) => l.id !== id));
      }, 900);
    },
    []
  );

  const playAndNavigate = useCallback(
    (keyData: (typeof pianoKeys)[0], triggerElement?: HTMLElement) => {
      // Inicializar audio context
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;

      // Crear nodos de audio
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(keyData.frequency, ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2400, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.8);

      // Efectos visuales
      if (triggerElement) {
        const rect = triggerElement.getBoundingClientRect();
        const containerRect = sectionRef.current?.getBoundingClientRect();
        if (containerRect) {
          const x = rect.left - containerRect.left + rect.width / 2;
          const y = rect.top - containerRect.top + rect.height / 3;
          spawnParticles(x, y, keyData.color);
          spawnLabel(keyData.sectionLabel, x, keyData.color);
        }
      }

      // Estado de la nota activa
      setActiveNote(keyData.note);
      setNavigatedSection(keyData.sectionId);
      setPlayedKeys((prev) => new Set(prev).add(keyData.note));

      // Navegar a la seccion despues de un pequeño delay para que se vea la animacion
      setTimeout(() => {
        const target = document.getElementById(keyData.sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 180);

      setTimeout(() => {
        setActiveNote(null);
      }, 200);
    },
    [volume, spawnParticles, spawnLabel]
  );

  // Listener de teclado
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const keyData = pianoKeys.find(
        (k) => k.keyboardKey === e.key.toLowerCase()
      );
      if (keyData) {
        const el = document.querySelector(
          `[data-piano-note="${keyData.note}"]`
        ) as HTMLElement | null;
        playAndNavigate(keyData, el ?? undefined);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [playAndNavigate]);

  const whiteKeys = pianoKeys.filter((k) => !k.isBlack);
  const blackKeys = pianoKeys.filter((k) => k.isBlack);

  // Posiciones de las teclas negras (sobre el grid de 5 teclas blancas)
  // Blancas: C D E F G (indices 0-4) => negras C# sobre 0-1, D# sobre 1-2, F# sobre 3-4, (no hay en E-F)
  const blackKeyPositions: Record<string, number> = {
    "C#4": 1,
    "D#4": 2,
    "F#4": 5,
    "G#4": 6,
  };

  // Para este piano de 8 teclas blancas: C D E F(piano) G(contact) => ajustamos
  // Blancas en orden: C4(hero), D4(edu), E4(skills), F4(piano), G4(contact)
  // Negras: C#4(projects), D#4(about), F#4(testimonials)
  const blackKeyLeftMap: Record<string, string> = {
    "C#4": "calc(100% / 5 * 1 - 18px)",
    "D#4": "calc(100% / 5 * 2 - 18px)",
    "F#4": "calc(100% / 5 * 4 - 18px)",
  };

  const activeKeyData = pianoKeys.find((k) => k.note === (hoveredNote ?? navigatedSection ? pianoKeys.find(pk => pk.sectionId === navigatedSection)?.note : null));
  const displayKey = hoveredNote
    ? pianoKeys.find((k) => k.note === hoveredNote)
    : navigatedSection
    ? pianoKeys.find((k) => k.sectionId === navigatedSection)
    : null;

  return (
    <section
      ref={sectionRef}
      id="piano"
      className="relative overflow-hidden border-b border-border py-24 sm:py-28 lg:py-32"
      style={{ background: "var(--background)" }}
    >
      {/* Fondo con gradiente radial */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Particulas flotantes */}
      {particles.map((p) => (
        <div
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
            animation: "particle-float 0.7s ease-out forwards",
          }}
        />
      ))}

      {/* Etiquetas flotantes de seccion */}
      {floatingLabels.map((fl) => (
        <div
          key={fl.id}
          className="pointer-events-none absolute z-30 rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow-lg animate-note-wave"
          style={{
            left: fl.x,
            top: 260,
            color: fl.color,
            backgroundColor: `${fl.color}20`,
            border: `1px solid ${fl.color}40`,
            transform: "translateX(-50%)",
            backdropFilter: "blur(8px)",
          }}
        >
          {fl.label}
        </div>
      ))}

      <Container>
        {/* Header */}
        <div
          className={`max-w-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Navegacion Musical
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-balance">
            Navega tocando el piano
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Cada tecla te lleva a una seccion diferente del portafolio. Usa el mouse o el teclado{" "}
            <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
              A S D F G
            </kbd>{" "}
            para las teclas blancas y{" "}
            <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
              W E T
            </kbd>{" "}
            para las negras.
          </p>
        </div>

        {/* Piano principal */}
        <div
          className={`relative mt-12 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          <div className="relative mx-auto max-w-4xl overflow-visible">
            {/* Panel de visualizacion */}
            <div className="relative mb-4 overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                {/* Info de la seccion activa */}
                <div className="flex min-h-[60px] flex-1 items-center gap-4">
                  {displayKey ? (
                    <>
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300"
                        style={{
                          backgroundColor: `${displayKey.color}15`,
                          borderColor: `${displayKey.color}40`,
                          boxShadow: `0 0 20px ${displayKey.color}20`,
                        }}
                      >
                        <KeyIcon
                          icon={displayKey.icon}
                          className="h-6 w-6"
                          style={{ color: displayKey.color } as React.CSSProperties}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-widest text-muted">
                          Navegando a
                        </p>
                        <h3
                          className="mt-0.5 text-2xl font-bold transition-colors duration-200"
                          style={{ color: displayKey.color }}
                        >
                          {displayKey.sectionLabel}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {displayKey.sectionDesc}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-accent">
                        <svg
                          className="h-6 w-6 text-muted"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted">
                          Toca una tecla para navegar
                        </p>
                        <p className="mt-0.5 text-xs text-muted/70">
                          Cada nota lleva a una seccion
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visualizador de onda */}
                <div className="flex h-16 shrink-0 items-end gap-0.5">
                  {waveBars.length > 0
                    ? waveBars.map((bar) => (
                        <div
                          key={bar.id}
                          className="w-1.5 rounded-full transition-all duration-100"
                          style={{
                            height: `${bar.height}%`,
                            backgroundColor: bar.color,
                            boxShadow: `0 0 6px ${bar.color}60`,
                          }}
                        />
                      ))
                    : Array.from({ length: 14 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 rounded-full bg-border"
                          style={{ height: "20%" }}
                        />
                      ))}
                </div>

                {/* Control de volumen */}
                <div className="flex shrink-0 items-center gap-2">
                  <svg
                    className="h-4 w-4 text-muted"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    {volume > 0.15 && (
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    )}
                    {volume > 0.3 && (
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    )}
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="0.6"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    aria-label="Volumen"
                    className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-border [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                </div>
              </div>

              {/* Mapa de secciones descubiertas */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {pianoKeys.map((k) => {
                  const visited = playedKeys.has(k.note);
                  return (
                    <button
                      key={k.note}
                      type="button"
                      onClick={() => {
                        const el = document.querySelector(
                          `[data-piano-note="${k.note}"]`
                        ) as HTMLElement | null;
                        playAndNavigate(k, el ?? undefined);
                      }}
                      className="rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-300"
                      style={
                        visited
                          ? {
                              backgroundColor: `${k.color}18`,
                              borderColor: `${k.color}50`,
                              color: k.color,
                              border: "1px solid",
                              boxShadow: `0 0 10px ${k.color}20`,
                            }
                          : {
                              backgroundColor: "var(--accent)",
                              borderColor: "var(--border)",
                              color: "var(--muted)",
                              border: "1px solid",
                            }
                      }
                    >
                      {k.sectionLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cuerpo del piano */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/90 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              {/* Brillo superior */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              {/* Indicador de grabacion / hint */}
              {showHint && (
                <div className="mb-5 flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 py-2.5 text-xs text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Toca las teclas para navegar por el portafolio
                </div>
              )}

              {/* Teclado */}
              <div className="relative">
                {/* Teclas blancas */}
                <div className="relative flex h-52 gap-1.5 sm:h-60">
                  {whiteKeys.map((keyData, idx) => {
                    const isActive = activeNote === keyData.note;
                    const wasPlayed = playedKeys.has(keyData.note);
                    const isHovered = hoveredNote === keyData.note;

                    return (
                      <button
                        key={keyData.note}
                        type="button"
                        data-piano-note={keyData.note}
                        onClick={(e) =>
                          playAndNavigate(keyData, e.currentTarget)
                        }
                        onMouseEnter={() => setHoveredNote(keyData.note)}
                        onMouseLeave={() => setHoveredNote(null)}
                        className="group relative flex flex-1 flex-col items-center justify-end rounded-b-2xl border transition-all duration-100 focus:outline-none"
                        style={{
                          backgroundColor: isActive
                            ? keyData.color
                            : isHovered
                            ? `${keyData.color}18`
                            : wasPlayed
                            ? `${keyData.color}08`
                            : "var(--card)",
                          borderColor: isActive
                            ? keyData.color
                            : isHovered
                            ? `${keyData.color}60`
                            : wasPlayed
                            ? `${keyData.color}30`
                            : "var(--border)",
                          boxShadow: isActive
                            ? `0 0 40px ${keyData.color}60, 0 8px 20px ${keyData.color}30, inset 0 -4px 0 ${keyData.color}80`
                            : isHovered
                            ? `0 0 20px ${keyData.color}25, inset 0 -3px 0 ${keyData.color}40`
                            : wasPlayed
                            ? `inset 0 -2px 0 ${keyData.color}30`
                            : "inset 0 -2px 0 rgba(0,0,0,0.12)",
                          transform: isActive ? "translateY(3px) scaleY(0.98)" : "none",
                        }}
                      >
                        {/* Efecto ripple al presionar */}
                        {isActive && (
                          <span
                            className="absolute inset-0 rounded-b-2xl animate-ripple"
                            style={{ backgroundColor: `${keyData.color}25` }}
                          />
                        )}

                        {/* Icono de la seccion */}
                        <div
                          className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200"
                          style={{
                            backgroundColor: isActive
                              ? "rgba(255,255,255,0.2)"
                              : `${keyData.color}15`,
                            color: isActive ? "#fff" : keyData.color,
                          }}
                        >
                          <KeyIcon icon={keyData.icon} className="h-4 w-4" />
                        </div>

                        {/* Nombre de la seccion */}
                        <span
                          className="mb-1 text-[9px] font-bold uppercase tracking-widest transition-colors duration-100 sm:text-[10px]"
                          style={{
                            color: isActive
                              ? "#fff"
                              : isHovered || wasPlayed
                              ? keyData.color
                              : "var(--muted)",
                          }}
                        >
                          {keyData.sectionLabel}
                        </span>

                        {/* Tecla de teclado */}
                        <span
                          className="mb-3 flex h-5 w-5 items-center justify-center rounded-md border text-[9px] font-mono font-semibold uppercase transition-all duration-100"
                          style={{
                            backgroundColor: isActive
                              ? "rgba(255,255,255,0.2)"
                              : "var(--accent)",
                            borderColor: isActive
                              ? "rgba(255,255,255,0.3)"
                              : "var(--border)",
                            color: isActive ? "#fff" : "var(--muted-foreground)",
                          }}
                        >
                          {keyData.keyboardKey.toUpperCase()}
                        </span>

                        {/* Indicador de secciones visitadas */}
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
                    const wasPlayed = playedKeys.has(keyData.note);
                    const isHovered = hoveredNote === keyData.note;
                    const leftVal = blackKeyLeftMap[keyData.note];
                    if (!leftVal) return null;

                    return (
                      <button
                        key={keyData.note}
                        type="button"
                        data-piano-note={keyData.note}
                        onClick={(e) =>
                          playAndNavigate(keyData, e.currentTarget)
                        }
                        onMouseEnter={() => setHoveredNote(keyData.note)}
                        onMouseLeave={() => setHoveredNote(null)}
                        className="absolute top-0 z-20 flex flex-col items-center justify-end rounded-b-xl pb-2 focus:outline-none"
                        style={{
                          left: leftVal,
                          width: "10%",
                          maxWidth: 52,
                          minWidth: 36,
                          height: "60%",
                          backgroundColor: isActive
                            ? keyData.color
                            : isHovered
                            ? `${keyData.color}40`
                            : wasPlayed
                            ? "#1e2530"
                            : "#111722",
                          boxShadow: isActive
                            ? `0 0 30px ${keyData.color}70, 0 6px 16px rgba(0,0,0,0.5)`
                            : isHovered
                            ? `0 0 20px ${keyData.color}30, 0 4px 12px rgba(0,0,0,0.6)`
                            : "0 4px 12px rgba(0,0,0,0.6)",
                          borderBottom: `2px solid ${isActive ? keyData.color : wasPlayed ? keyData.color + "60" : "rgba(255,255,255,0.05)"}`,
                          transform: isActive ? "translateY(3px)" : "none",
                          transition: "all 0.08s ease-out",
                        }}
                      >
                        {isActive && (
                          <span
                            className="absolute inset-0 rounded-b-xl animate-ripple"
                            style={{ backgroundColor: `${keyData.color}30` }}
                          />
                        )}
                        <span
                          className="text-[8px] font-bold uppercase tracking-wider sm:text-[9px]"
                          style={{
                            color: isActive
                              ? "#fff"
                              : wasPlayed
                              ? keyData.color
                              : "rgba(255,255,255,0.5)",
                          }}
                        >
                          {keyData.sectionLabel.slice(0, 3)}
                        </span>
                        <span
                          className="mt-1 text-[8px] font-mono font-semibold uppercase"
                          style={{
                            color: isActive
                              ? "rgba(255,255,255,0.8)"
                              : "rgba(255,255,255,0.3)",
                          }}
                        >
                          {keyData.keyboardKey.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sombra inferior del piano */}
                <div className="mt-3 h-3 rounded-full bg-background/60 blur-sm" />
              </div>
            </div>

            {/* Mapa visual de secciones */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {pianoKeys.map((k) => {
                const visited = playedKeys.has(k.note);
                return (
                  <button
                    key={k.sectionId}
                    type="button"
                    onClick={() => {
                      const el = document.querySelector(
                        `[data-piano-note="${k.note}"]`
                      ) as HTMLElement | null;
                      playAndNavigate(k, el ?? undefined);
                    }}
                    className="group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      backgroundColor: visited
                        ? `${k.color}10`
                        : "var(--card)",
                      borderColor: visited
                        ? `${k.color}40`
                        : "var(--border)",
                      boxShadow: visited
                        ? `0 0 20px ${k.color}15`
                        : undefined,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
                        style={{
                          backgroundColor: `${k.color}15`,
                          color: k.color,
                        }}
                      >
                        <KeyIcon icon={k.icon} className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="truncate text-xs font-semibold"
                          style={{ color: visited ? k.color : "var(--foreground)" }}
                        >
                          {k.sectionLabel}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-muted">
                          {k.keyboardKey.toUpperCase()} —{" "}
                          {k.isBlack ? "Negra" : "Blanca"}
                        </p>
                      </div>
                    </div>
                    {visited && (
                      <span
                        className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full text-[9px]"
                        style={{
                          backgroundColor: `${k.color}20`,
                          color: k.color,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Progreso */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                {playedKeys.size}
              </div>
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>Secciones visitadas</span>
                  <span>{playedKeys.size}/{pianoKeys.length}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(playedKeys.size / pianoKeys.length) * 100}%`,
                      background:
                        "linear-gradient(to right, var(--primary), var(--secondary))",
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                / {pianoKeys.length} secciones
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
