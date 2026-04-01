"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/src/components/layout/container";
import { useLanguage } from "@/src/components/providers/language-provider";

const pianoNotes = [
  { note: "C4", frequency: 261.63, key: "a" },
  { note: "C#4", frequency: 277.18, key: "w", isBlack: true },
  { note: "D4", frequency: 293.66, key: "s" },
  { note: "D#4", frequency: 311.13, key: "e", isBlack: true },
  { note: "E4", frequency: 329.63, key: "d" },
  { note: "F4", frequency: 349.23, key: "f" },
  { note: "F#4", frequency: 369.99, key: "t", isBlack: true },
  { note: "G4", frequency: 392.0, key: "g" },
  { note: "G#4", frequency: 415.3, key: "y", isBlack: true },
  { note: "A4", frequency: 440.0, key: "h" },
  { note: "A#4", frequency: 466.16, key: "u", isBlack: true },
  { note: "B4", frequency: 493.88, key: "j" },
  { note: "C5", frequency: 523.25, key: "k" },
];

type Skill = {
  name: string;
  description: string;
  level: number;
};

const skillsData: Record<string, Skill> = {
  C4: { name: "HTML", description: "Estructura y semántica web", level: 90 },
  "C#4": { name: "Git", description: "Control de versiones", level: 75 },
  D4: { name: "CSS", description: "Estilos y diseño responsivo", level: 85 },
  "D#4": { name: "APIs REST", description: "Integración de servicios", level: 70 },
  E4: { name: "JavaScript", description: "Lógica e interactividad", level: 80 },
  F4: { name: "TypeScript", description: "Tipado estático", level: 75 },
  "F#4": { name: "SQL", description: "Bases de datos relacionales", level: 70 },
  G4: { name: "Python", description: "Backend y automatización", level: 85 },
  "G#4": { name: "PostgreSQL", description: "Gestión de datos", level: 65 },
  A4: { name: "Django", description: "Framework web Python", level: 80 },
  "A#4": { name: "Tailwind", description: "CSS utilitario", level: 85 },
  B4: { name: "Next.js", description: "Framework React", level: 75 },
  C5: { name: "React", description: "Interfaces de usuario", level: 78 },
};

export default function PianoSection() {
  const { dictionary } = useLanguage();
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [playedNotes, setPlayedNotes] = useState<Set<string>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  const playNote = useCallback((frequency: number, note: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1);

    setActiveNote(note);
    setSelectedSkill(skillsData[note] || null);
    setPlayedNotes((prev) => new Set(prev).add(note));

    setTimeout(() => {
      setActiveNote(null);
    }, 200);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const noteData = pianoNotes.find((n) => n.key === e.key.toLowerCase());
      if (noteData && activeNote !== noteData.note) {
        playNote(noteData.frequency, noteData.note);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeNote, playNote]);

  const whiteKeys = pianoNotes.filter((n) => !n.isBlack);
  const blackKeys = pianoNotes.filter((n) => n.isBlack);

  const blackKeyPositions: Record<string, string> = {
    "C#4": "left-[calc(100%/8*1-12px)]",
    "D#4": "left-[calc(100%/8*2-12px)]",
    "F#4": "left-[calc(100%/8*4-12px)]",
    "G#4": "left-[calc(100%/8*5-12px)]",
    "A#4": "left-[calc(100%/8*6-12px)]",
  };

  return (
    <section
      ref={sectionRef}
      id="piano"
      className="border-b border-border bg-accent py-24 sm:py-28 lg:py-32 overflow-hidden"
    >
      <Container>
        <div className={`max-w-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            {dictionary.pianoSection?.badge || "Interactivo"}
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {dictionary.pianoSection?.title || "Piano de Habilidades"}
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            {dictionary.pianoSection?.description ||
              "Cada tecla representa una de mis habilidades. Toca el piano con el mouse o usa las teclas A, S, D, F, G, H, J, K (blancas) y W, E, T, Y, U (negras) para descubrir mi stack tecnológico."}
          </p>
        </div>

        <div
          className={`mt-12 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(25,230,179,0.08),transparent_50%)]" />

            <div className="relative">
              <div className="relative flex h-48 sm:h-56">
                {whiteKeys.map((noteData, index) => {
                  const skill = skillsData[noteData.note];
                  const isActive = activeNote === noteData.note;
                  const wasPlayed = playedNotes.has(noteData.note);

                  return (
                    <button
                      key={noteData.note}
                      type="button"
                      onClick={() => playNote(noteData.frequency, noteData.note)}
                      className={`relative flex flex-1 flex-col items-center justify-end rounded-b-lg border transition-all duration-150 pb-3 ${
                        isActive
                          ? "bg-primary border-primary scale-[0.98] shadow-[0_0_30px_rgba(25,230,179,0.5)]"
                          : wasPlayed
                          ? "bg-background border-primary/30 hover:bg-primary/10"
                          : "bg-background border-border hover:bg-accent"
                      } ${index > 0 ? "-ml-px" : ""}`}
                      style={{
                        animationDelay: `${300 + index * 50}ms`,
                      }}
                    >
                      <span
                        className={`text-[10px] font-medium uppercase tracking-wider transition-colors duration-150 ${
                          isActive ? "text-black" : "text-muted"
                        }`}
                      >
                        {skill?.name}
                      </span>
                      <span
                        className={`mt-1 text-[9px] transition-colors duration-150 ${
                          isActive ? "text-black/70" : "text-muted/60"
                        }`}
                      >
                        {noteData.key.toUpperCase()}
                      </span>
                    </button>
                  );
                })}

                {blackKeys.map((noteData) => {
                  const skill = skillsData[noteData.note];
                  const isActive = activeNote === noteData.note;
                  const wasPlayed = playedNotes.has(noteData.note);

                  return (
                    <button
                      key={noteData.note}
                      type="button"
                      onClick={() => playNote(noteData.frequency, noteData.note)}
                      className={`absolute top-0 z-10 flex h-28 w-8 flex-col items-center justify-end rounded-b-md pb-2 transition-all duration-150 sm:h-32 sm:w-10 ${
                        blackKeyPositions[noteData.note]
                      } ${
                        isActive
                          ? "bg-primary scale-[0.96] shadow-[0_0_20px_rgba(25,230,179,0.6)]"
                          : wasPlayed
                          ? "bg-foreground/80 hover:bg-foreground/90"
                          : "bg-foreground hover:bg-foreground/90"
                      }`}
                    >
                      <span
                        className={`text-[8px] font-medium uppercase tracking-wider transition-colors duration-150 ${
                          isActive ? "text-black" : "text-background"
                        }`}
                      >
                        {skill?.name}
                      </span>
                      <span
                        className={`mt-0.5 text-[8px] transition-colors duration-150 ${
                          isActive ? "text-black/70" : "text-background/60"
                        }`}
                      >
                        {noteData.key.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className={`mt-6 flex items-center justify-between rounded-xl border border-border bg-accent p-4 transition-all duration-300 ${
                selectedSkill ? "opacity-100" : "opacity-50"
              }`}
            >
              {selectedSkill ? (
                <>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">
                      {selectedSkill.name}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedSkill.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-2xl font-bold text-primary">
                      {selectedSkill.level}%
                    </span>
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
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

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded border border-border bg-background" />
                {dictionary.pianoSection?.whiteKeys || "Teclas blancas: A-K"}
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded bg-foreground" />
                {dictionary.pianoSection?.blackKeys || "Teclas negras: W,E,T,Y,U"}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {Object.entries(skillsData).map(([note, skill]) => {
              const wasPlayed = playedNotes.has(note);
              return (
                <span
                  key={note}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
                    wasPlayed
                      ? "border border-primary/30 bg-primary/10 text-primary"
                      : "border border-border bg-accent text-muted"
                  }`}
                >
                  {skill.name}
                </span>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs text-muted">
            {dictionary.pianoSection?.progress ||
              `${playedNotes.size} / ${Object.keys(skillsData).length} habilidades descubiertas`}
          </p>
        </div>
      </Container>
    </section>
  );
}
