import Navbar from "@/src/components/layout/navbar";
import HeroSection from "@/src/components/sections/hero-section";
import ProjectsSection from "@/src/components/sections/projects-section";
import EducationSection from "@/src/components/sections/education-section";
import AboutSection from "@/src/components/sections/about-section";
import SkillsSection from "@/src/components/sections/skills-section";
import TestimonialsSection from "@/src/components/sections/testimonials-section";
import ContactSection from "@/src/components/sections/contact-section";

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
      <ContactSection />
    </main>
  );
}