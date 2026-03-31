type ProjectCardProps = {
  project: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    features: string[];
    technologies: string[];
    primaryAction: string;
    secondaryAction: string;
  };
  previewLabel: string;
  reverse?: boolean;
};

export default function ProjectCard({
  project,
  previewLabel,
  reverse = false,
}: ProjectCardProps) {
  return (
    <article
      className={`grid items-center gap-8 border-t border-white/6 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14 ${
        reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
      }`}
    >
      <div className="max-w-xl">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
          {project.eyebrow}
        </span>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {project.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
          {project.description}
        </p>

        <ul className="mt-5 space-y-2">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-white/75"
            >
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02]"
          >
            {project.primaryAction}
          </a>

          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white/80 transition-all duration-300 hover:border-primary/40 hover:text-primary"
          >
            {project.secondaryAction}
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(20,28,38,0.96),rgba(12,16,23,0.98))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(25,230,179,0.10),transparent_45%)] opacity-80" />

          <div className="relative flex min-h-[220px] items-center justify-center rounded-[1.25rem] border border-white/6 bg-white/[0.03] sm:min-h-[260px]">
            <div className="absolute left-5 top-5 h-10 w-10 rounded-xl border border-primary/15 bg-primary/10" />
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                {previewLabel}
              </p>
              <p className="mt-3 text-lg font-medium text-white/80">
                {project.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}