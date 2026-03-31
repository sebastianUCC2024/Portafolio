import Container from "../components/layout/container";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-white/5 py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Base del proyecto
            </span>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Estructura inicial del portafolio
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Esta es la base inicial del proyecto. A partir de aquí vamos a construir
              una experiencia premium, moderna y profesional inspirada en el diseño de referencia.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}