"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/src/components/layout/container";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

interface TechMetric {
  name: string;
  projects: number;
  experience: number;
}

function CounterStat({
  value,
  suffix,
  duration = 2000,
}: {
  value: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress === 1) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isVisible, value, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const stats: StatItem[] = [
    {
      label: "Proyectos Completados",
      value: 15,
      suffix: "+",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4m0 6V4m0 0L8 4m6 16l-4-4"
          />
        </svg>
      ),
    },
    {
      label: "Tecnologías Dominadas",
      value: 13,
      suffix: "",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Líneas de Código",
      value: 50,
      suffix: "K+",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
    },
    {
      label: "Horas de Aprendizaje",
      value: 2500,
      suffix: "+",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const techMetrics: TechMetric[] = [
    { name: "Frontend", projects: 8, experience: 85 },
    { name: "Backend", projects: 7, experience: 75 },
    { name: "Databases", projects: 6, experience: 70 },
    { name: "DevOps", projects: 4, experience: 60 },
  ];

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

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="border-b border-border py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div className="space-y-4 text-center">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              Estadísticas
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Números que Cuentan
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Un vistazo a mi trayecto como desarrollador: proyectos, tecnologías
              dominadas y horas invertidas en mejorar constantemente.
            </p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative space-y-3">
                  <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:scale-110">
                    {stat.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                      <CounterStat
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={2000}
                      />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Metrics */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold tracking-tight">
                Dominio por Categoría
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {techMetrics.map((metric, index) => (
                <div
                  key={metric.name}
                  className={`rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${400 + index * 75}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">
                        {metric.name}
                      </h4>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        {metric.projects} proyectos
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="relative h-2 overflow-hidden rounded-full border border-border/50 bg-accent">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary-light shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                          style={{
                            width: `${isVisible ? metric.experience : 0}%`,
                            transition: "width 2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            transitionDelay: `${400 + index * 75}ms`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Experiencia</span>
                        <span className="font-medium text-primary">
                          {metric.experience}%
                        </span>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {metric.name === "Frontend" && (
                        <>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            React
                          </span>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            TypeScript
                          </span>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            Tailwind
                          </span>
                        </>
                      )}
                      {metric.name === "Backend" && (
                        <>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            Python
                          </span>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            Django
                          </span>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            APIs REST
                          </span>
                        </>
                      )}
                      {metric.name === "Databases" && (
                        <>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            PostgreSQL
                          </span>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            SQL
                          </span>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            Modelado
                          </span>
                        </>
                      )}
                      {metric.name === "DevOps" && (
                        <>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            Git
                          </span>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            CI/CD
                          </span>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                            Deploy
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Insight */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Camino de Aprendizaje
                </h3>
                <p className="text-sm text-muted-foreground">
                  Desde fundamentos hasta especialización en desarrollo full-stack
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { phase: "Fundamentos", year: "2022", skills: "HTML, CSS, JS" },
                  {
                    phase: "Especialización",
                    year: "2023",
                    skills: "React, TypeScript, Python",
                  },
                  {
                    phase: "Full-Stack",
                    year: "2024",
                    skills: "Django, PostgreSQL, Next.js",
                  },
                  {
                    phase: "Hoy",
                    year: "2025+",
                    skills: "Arquitectura, DevOps, Innovación",
                  },
                ].map((item, index) => (
                  <div key={item.phase} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-card">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      {index < 3 && (
                        <div className="h-8 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
                      )}
                    </div>
                    <div className="pb-4 pt-1">
                      <p className="font-semibold text-foreground">{item.phase}</p>
                      <p className="text-xs text-primary">{item.year}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.skills}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
