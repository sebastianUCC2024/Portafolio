"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

const pianoNotes = [
  { note: "C4", frequency: 261.63, key: "a", color: "#10b981" },
  { note: "C#4", frequency: 277.18, key: "w", isBlack: true, color: "#06b6d4" },
  { note: "D4", frequency: 293.66, key: "s", color: "#8b5cf6" },
  { note: "D#4", frequency: 311.13, key: "e", isBlack: true, color: "#f59e0b" },
  { note: "E4", frequency: 329.63, key: "d", color: "#ec4899" },
  { note: "F4", frequency: 349.23, key: "f", color: "#3b82f6" },
  { note: "F#4", frequency: 369.99, key: "t", isBlack: true, color: "#ef4444" },
  { note: "G4", frequency: 392.0, key: "g", color: "#14b8a6" },
  { note: "G#4", frequency: 415.3, key: "y", isBlack: true, color: "#a855f7" },
  { note: "A4", frequency: 440.0, key: "h", color: "#f97316" },
  { note: "A#4", frequency: 466.16, key: "u", isBlack: true, color: "#06b6d4" },
  { note: "B4", frequency: 493.88, key: "j", color: "#84cc16" },
  { note: "C5", frequency: 523.25, key: "k", color: "#10b981" },
];

type Skill = {
  name: string;
  description: string;
  level: number;
  icon: string;
};

const skillsData: Record<string, Skill> = {
  C4: { name: "HTML", description: "Estructura y semantica web", level: 90, icon: "code" },
  "C#4": { name: "Git", description: "Control de versiones", level: 75, icon: "git" },
  D4: { name: "CSS", description: "Estilos y diseno responsivo", level: 85, icon: "palette" },
  "D#4": { name: "APIs REST", description: "Integracion de servicios", level: 70, icon: "api" },
  E4: { name: "JavaScript", description: "Logica e interactividad", level: 80, icon: "js" },
  F4: { name: "TypeScript", description: "Tipado estatico", level: 75, icon: "ts" },
  "F#4": { name: "SQL", description: "Bases de datos relacionales", level: 70, icon: "database" },
  G4: { name: "Python", description: "Backend y automatizacion", level: 85, icon: "python" },
  "G#4": { name: "PostgreSQL", description: "Gestion de datos", level: 65, icon: "db" },
  A4: { name: "Django", description: "Framework web Python", level: 80, icon: "django" },
  "A#4": { name: "Tailwind", description: "CSS utilitario", level: 85, icon: "wind" },
  B4: { name: "Next.js", description: "Framework React", level: 75, icon: "next" },
  C5: { name: "React", description: "Interfaces de usuario", level: 78, icon: "react" },
};

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  tx: number;
  ty: number;
};

type FloatingNote = {
  id: number;
  note: string;
  x: number;
  color: string;
};

export default function PianoSection() {
  const { dictionary } = useLanguage();
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [playedNotes, setPlayedNotes] = useState<Set<string>>(new Set());
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingNotes, setFloatingNotes] = useState<FloatingNote[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState<{ note: string; time: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundWaves, setSoundWaves] = useState<number[]>([]);
  const [volume, setVolume] = useState(0.3);
  const [waveType, setWaveType] = useState<OscillatorType>("sine");
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const recordStartTimeRef = useRef<number>(0);
  const particleIdRef = useRef(0);
  const noteIdRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Sound wave animation
  useEffect(() => {
    if (activeNote) {
      const waves = Array.from({ length: 5 }, () => Math.random());
      setSoundWaves(waves);
    } else {
      setSoundWaves([]);
    }
  }, [activeNote]);

  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = Array.from({ length: 8 }, () => ({
      id: particleIdRef.current++,
      x,
      y,
      color,
      tx: (Math.random() - 0.5) * 100,
      ty: -Math.random() * 80 - 20,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 600);
  }, []);

  const createFloatingNote = useCallback((note: string, x: number, color: string) => {
    const id = noteIdRef.current++;
    setFloatingNotes((prev) => [...prev, { id, note, x, color }]);

    setTimeout(() => {
      setFloatingNotes((prev) => prev.filter((n) => n.id !== id));
    }, 800);
  }, []);

  const playNote = useCallback((frequency: number, note: string, keyElement?: HTMLElement) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Configure oscillator
    oscillator.type = waveType;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Configure filter for warmer sound
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.Q.setValueAtTime(1, ctx.currentTime);

    // Configure envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.5);

    const noteData = pianoNotes.find((n) => n.note === note);
    
    // Create visual effects
    if (keyElement && noteData) {
      const rect = keyElement.getBoundingClientRect();
      const containerRect = sectionRef.current?.getBoundingClientRect();
      if (containerRect) {
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top;
        createParticles(x, y, noteData.color);
        createFloatingNote(note, x, noteData.color);
      }
    }

    setActiveNote(note);
    setSelectedSkill(skillsData[note] || null);
    setPlayedNotes((prev) => new Set(prev).add(note));

    // Recording
    if (isRecording) {
      const time = Date.now() - recordStartTimeRef.current;
      setRecordedNotes((prev) => [...prev, { note, time }]);
    }

    setTimeout(() => {
      setActiveNote(null);
    }, 150);
  }, [volume, waveType, isRecording, createParticles, createFloatingNote]);

  const handleKeyPress = useCallback((noteData: typeof pianoNotes[0], element?: HTMLElement) => {
    playNote(noteData.frequency, noteData.note, element);
  }, [playNote]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const noteData = pianoNotes.find((n) => n.key === e.key.toLowerCase());
      if (noteData) {
        const keyElement = document.querySelector(`[data-note="${noteData.note}"]`) as HTMLElement;
        handleKeyPress(noteData, keyElement || undefined);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  const startRecording = () => {
    setRecordedNotes([]);
    recordStartTimeRef.current = Date.now();
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const playRecording = async () => {
    if (recordedNotes.length === 0) return;
    setIsPlaying(true);

    for (let i = 0; i < recordedNotes.length; i++) {
      const note = recordedNotes[i];
      const delay = i === 0 ? 0 : note.time - recordedNotes[i - 1].time;
      
      await new Promise((resolve) => setTimeout(resolve, delay));
      
      const noteData = pianoNotes.find((n) => n.note === note.note);
      if (noteData) {
        const keyElement = document.querySelector(`[data-note="${noteData.note}"]`) as HTMLElement;
        playNote(noteData.frequency, noteData.note, keyElement || undefined);
      }
    }

    setIsPlaying(false);
  };

  const whiteKeys = pianoNotes.filter((n) => !n.isBlack);
  const blackKeys = pianoNotes.filter((n) => n.isBlack);

  const blackKeyPositions: Record<string, string> = {
    "C#4": "left-[calc(100%/8*1-16px)]",
    "D#4": "left-[calc(100%/8*2-16px)]",
    "F#4": "left-[calc(100%/8*4-16px)]",
    "G#4": "left-[calc(100%/8*5-16px)]",
    "A#4": "left-[calc(100%/8*6-16px)]",
  };

  const waveTypes: { type: OscillatorType; label: string }[] = [
    { type: "sine", label: "Suave" },
    { type: "triangle", label: "Brillante" },
    { type: "square", label: "Retro" },
    { type: "sawtooth", label: "Agudo" },
  ];

  return (
    <section
      ref={sectionRef}
      id="piano"
      className="relative border-b border-border bg-gradient-to-b from-accent via-background to-accent py-24 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />

      <Container>
        <div className={`max-w-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {dictionary.pianoSection?.badge || "Interactivo"}
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-balance">
            {dictionary.pianoSection?.title || "Piano de Habilidades"}
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            {dictionary.pianoSection?.description ||
              "Cada tecla representa una de mis habilidades. Toca el piano con el mouse o usa las teclas A, S, D, F, G, H, J, K (blancas) y W, E, T, Y, U (negras) para descubrir mi stack tecnologico."}
          </p>
        </div>

        <div
          className={`relative mt-12 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          {/* Floating particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="pointer-events-none absolute h-2 w-2 rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
                ["--tx" as string]: `${particle.tx}px`,
                ["--ty" as string]: `${particle.ty}px`,
                animation: "particle-float 0.6s ease-out forwards",
              }}
            />
          ))}

          {/* Floating notes */}
          {floatingNotes.map((fn) => (
            <div
              key={fn.id}
              className="pointer-events-none absolute text-lg font-bold animate-note-wave"
              style={{
                left: fn.x,
                top: 200,
                color: fn.color,
                transform: "translateX(-50%)",
              }}
            >
              {skillsData[fn.note]?.name}
            </div>
          ))}

          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-border bg-card/80 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.1),transparent_50%)]" />
            
            {/* Sound wave visualizer */}
            {soundWaves.length > 0 && (
              <div className="absolute top-4 right-4 flex items-end gap-1 h-8">
                {soundWaves.map((height, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-primary animate-sound-wave"
                    style={{
                      height: `${height * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="relative mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isPlaying}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    isRecording
                      ? "bg-error text-background animate-pulse"
                      : "border border-border bg-accent text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isRecording ? "bg-background" : "bg-error"}`} />
                  {isRecording ? "Detener" : "Grabar"}
                </button>

                <button
                  type="button"
                  onClick={playRecording}
                  disabled={recordedNotes.length === 0 || isPlaying || isRecording}
                  className="flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {isPlaying ? "Reproduciendo..." : `Reproducir ${recordedNotes.length > 0 ? `(${recordedNotes.length})` : ""}`}
                </button>
              </div>

              <div className="flex items-center gap-4">
                {/* Wave type selector */}
                <div className="flex items-center gap-1 rounded-full border border-border bg-accent p-1">
                  {waveTypes.map((w) => (
                    <button
                      key={w.type}
                      type="button"
                      onClick={() => setWaveType(w.type)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
                        waveType === w.type
                          ? "bg-primary text-background"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>

                {/* Volume control */}
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    {volume > 0.5 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
                    {volume > 0.2 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-border [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                </div>
              </div>
            </div>

            {/* Piano keyboard */}
            <div className="relative">
              <div className="relative flex h-56 sm:h-64">
                {whiteKeys.map((noteData, index) => {
                  const skill = skillsData[noteData.note];
                  const isActive = activeNote === noteData.note;
                  const wasPlayed = playedNotes.has(noteData.note);

                  return (
                    <button
                      key={noteData.note}
                      type="button"
                      data-note={noteData.note}
                      onClick={(e) => handleKeyPress(noteData, e.currentTarget)}
                      className={`relative flex flex-1 flex-col items-center justify-end rounded-b-xl border-x border-b transition-all duration-100 pb-4 ${
                        isActive
                          ? "animate-piano-press shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                          : ""
                      } ${
                        isActive
                          ? "bg-primary border-primary z-10"
                          : wasPlayed
                          ? "bg-gradient-to-b from-background to-accent border-primary/30 hover:border-primary/50"
                          : "bg-gradient-to-b from-background to-accent border-border hover:border-primary/30"
                      } ${index === 0 ? "rounded-bl-xl" : ""} ${index === whiteKeys.length - 1 ? "rounded-br-xl" : ""}`}
                      style={{
                        boxShadow: isActive
                          ? `0 0 30px ${noteData.color}40, inset 0 -4px 0 ${noteData.color}80`
                          : wasPlayed
                          ? `inset 0 -2px 0 ${noteData.color}40`
                          : "inset 0 -2px 0 rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Ripple effect */}
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-b-xl animate-ripple"
                          style={{ backgroundColor: `${noteData.color}30` }}
                        />
                      )}
                      
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-100 ${
                          isActive ? "text-background" : wasPlayed ? "text-primary" : "text-muted"
                        }`}
                      >
                        {skill?.name}
                      </span>
                      <span
                        className={`mt-1.5 flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-medium transition-colors duration-100 ${
                          isActive
                            ? "bg-background/20 text-background"
                            : "bg-accent text-muted-foreground"
                        }`}
                      >
                        {noteData.key.toUpperCase()}
                      </span>
                    </button>
                  );
                })}

                {/* Black keys */}
                {blackKeys.map((noteData) => {
                  const skill = skillsData[noteData.note];
                  const isActive = activeNote === noteData.note;
                  const wasPlayed = playedNotes.has(noteData.note);

                  return (
                    <button
                      key={noteData.note}
                      type="button"
                      data-note={noteData.note}
                      onClick={(e) => handleKeyPress(noteData, e.currentTarget)}
                      className={`absolute top-0 z-20 flex h-32 w-10 flex-col items-center justify-end rounded-b-lg pb-3 transition-all duration-100 sm:h-36 sm:w-12 ${
                        blackKeyPositions[noteData.note]
                      } ${
                        isActive
                          ? "animate-piano-press"
                          : ""
                      } ${
                        isActive
                          ? "bg-primary"
                          : wasPlayed
                          ? "bg-gradient-to-b from-foreground to-foreground/80 hover:from-foreground/90"
                          : "bg-gradient-to-b from-foreground to-foreground/90 hover:from-foreground/80"
                      }`}
                      style={{
                        boxShadow: isActive
                          ? `0 0 25px ${noteData.color}60, 0 4px 8px rgba(0,0,0,0.4)`
                          : wasPlayed
                          ? `0 4px 12px rgba(0,0,0,0.5), inset 0 -2px 0 ${noteData.color}60`
                          : "0 4px 12px rgba(0,0,0,0.5), inset 0 -2px 0 rgba(0,0,0,0.3)",
                      }}
                    >
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-b-lg animate-ripple"
                          style={{ backgroundColor: `${noteData.color}40` }}
                        />
                      )}
                      
                      <span
                        className={`text-[8px] font-semibold uppercase tracking-wider transition-colors duration-100 ${
                          isActive ? "text-background" : wasPlayed ? "text-primary" : "text-background/80"
                        }`}
                      >
                        {skill?.name}
                      </span>
                      <span
                        className={`mt-1 text-[9px] font-medium transition-colors duration-100 ${
                          isActive ? "text-background/80" : "text-background/50"
                        }`}
                      >
                        {noteData.key.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected skill display */}
            <div
              className={`mt-6 overflow-hidden rounded-2xl border transition-all duration-500 ${
                selectedSkill
                  ? "border-primary/30 bg-gradient-to-r from-primary/10 via-accent to-primary/10"
                  : "border-border bg-accent"
              }`}
            >
              <div className="flex items-center justify-between p-5">
                {selectedSkill ? (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                        <span className="text-2xl font-bold text-primary">
                          {selectedSkill.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-foreground">
                          {selectedSkill.name}
                        </h4>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {selectedSkill.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {selectedSkill.level}%
                      </span>
                      <div className="h-2.5 w-32 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-700 ease-out"
                          style={{ width: `${selectedSkill.level}%` }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="w-full text-center text-sm text-muted">
                    {dictionary.pianoSection?.placeholder ||
                      "Toca una tecla para ver la habilidad"}
                  </p>
                )}
              </div>
            </div>

            {/* Keyboard hints */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-6 rounded border border-border bg-background shadow-sm" />
                {dictionary.pianoSection?.whiteKeys || "Teclas blancas: A-K"}
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-6 rounded bg-foreground shadow-sm" />
                {dictionary.pianoSection?.blackKeys || "Teclas negras: W,E,T,Y,U"}
              </span>
            </div>
          </div>

          {/* Skills discovered */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {Object.entries(skillsData).map(([note, skill]) => {
              const wasPlayed = playedNotes.has(note);
              const noteData = pianoNotes.find((n) => n.note === note);
              return (
                <span
                  key={note}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-500 ${
                    wasPlayed
                      ? "border border-primary/30 bg-primary/15 text-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "border border-border bg-accent text-muted"
                  }`}
                  style={{
                    borderColor: wasPlayed && noteData ? `${noteData.color}50` : undefined,
                    backgroundColor: wasPlayed && noteData ? `${noteData.color}15` : undefined,
                    color: wasPlayed && noteData ? noteData.color : undefined,
                  }}
                >
                  {skill.name}
                </span>
              );
            })}
          </div>

          {/* Progress */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card/50 px-5 py-2.5 backdrop-blur-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {playedNotes.size}
              </div>
              <span className="text-sm text-muted-foreground">
                / {Object.keys(skillsData).length} {dictionary.pianoSection?.progress || "habilidades descubiertas"}
              </span>
              <div className="h-2 w-24 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${(playedNotes.size / Object.keys(skillsData).length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
