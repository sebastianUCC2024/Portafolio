import Container from "../components/layout/container";
import Navbar from "../components/layout/navbar";
import HeroSection from "../components/sections/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <HeroSection />

      <section
        id="projects"
        className="border-b border-white/5 py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Proyectos
          </h2>
        </Container>
      </section>

      <section
        id="education"
        className="border-b border-white/5 py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Formación
          </h2>
        </Container>
      </section>

      <section
        id="about"
        className="border-b border-white/5 py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Conóceme
          </h2>
        </Container>
      </section>

      <section id="contact" className="py-24 sm:py-28 lg:py-32">
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Contacto
          </h2>
        </Container>
      </section>
    </main>
  );
}