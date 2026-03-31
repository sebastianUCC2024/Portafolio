import Navbar from "@/src/components/layout/navbar";
import Container from "@/src/components/layout/container";
import HeroSection from "@/src/components/sections/hero-section";
import ProjectsSection from "@/src/components/sections/projects-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <HeroSection />

      <ProjectsSection />

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