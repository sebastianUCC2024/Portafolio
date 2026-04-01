import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import ScrollNav from "@/src/components/layout/scroll-nav";
import HeroSection from "@/src/components/sections/hero-section";
import ProjectsSection from "@/src/components/sections/projects-section";
import EducationSection from "@/src/components/sections/education-section";
import AboutSection from "@/src/components/sections/about-section";
import SkillsSection from "@/src/components/sections/skills-section";
import StatsSection from "@/src/components/sections/stats-section";
import PianoSection from "@/src/components/sections/piano-section";
import TestimonialsSection from "@/src/components/sections/testimonials-section";
import ContactSection from "@/src/components/sections/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ScrollNav />
      <HeroSection />
      <ProjectsSection />
      <EducationSection />
      <AboutSection />
      <SkillsSection />
      <StatsSection />
      <PianoSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
