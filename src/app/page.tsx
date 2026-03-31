import Navbar from "@/src/components/layout/navbar";
import Container from "@/src/components/layout/container";
import HeroSection from "@/src/components/sections/hero-section";
import ProjectsSection from "@/src/components/sections/projects-section";
import EducationSection from "@/src/components/sections/education-section";
import AboutSection from "@/src/components/sections/about-section";
import SkillsSection from "@/src/components/sections/skills-section";
import TestimonialsSection from "@/src/components/sections/testimonials-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <HeroSection />

      <ProjectsSection />

      <EducationSection />

      <AboutSection />

      <SkillsSection />

      <TestimonialsSection />

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