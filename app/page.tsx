import { Navigation } from "@/components/portfolio/navigation"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { GitHubSection } from "@/components/portfolio/github-section"
import { EducationSection } from "@/components/portfolio/education-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { SectionDivider } from "@/components/portfolio/section-divider"
import { AnimatedBackground } from "@/components/portfolio/animated-background"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground paper-texture relative overflow-x-hidden">
      {/* Animated stationery background */}
      <AnimatedBackground />
      
      <Navigation />
      <HeroSection />
      <SectionDivider variant="code" />
      <AboutSection />
      <SectionDivider variant="circuit" />
      <ExperienceSection />
      <SectionDivider variant="brackets" />
      <ProjectsSection />
      <SectionDivider variant="terminal" />
      <SkillsSection />
      <SectionDivider variant="wave" />
      <GitHubSection />
      <SectionDivider variant="grid" />
      <EducationSection />
      <SectionDivider variant="code" />
      <ContactSection />
      <Footer />
    </main>
  )
}
