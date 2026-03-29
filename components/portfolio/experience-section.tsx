"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Building2 } from "lucide-react"
import Link from "next/link"

const experiences: {
  company: string
  role: string
  period: string
  location: string
  summary: string
  technologies: string[]
  link?: string
  type?: string
  current?: boolean
}[] = [
  {
    company: "Boosted.ai",
    role: "Software Engineer",
    period: "Sep 2025 to Apr 2026",
    location: "Toronto, ON",
    summary:
      "Full stack work on a financial analytics platform. Shipped a React Excel export tool saving clients ~10 hrs/week, a Prompt Library that cut agentic workflow time by 30%, and a Pydantic AI powered Earnings feature that doubled the speed of stock insights. Also built a PostgreSQL backed admin system for in app banners.",
    technologies: ["React", "TypeScript", "Python", "PostgreSQL", "Pydantic AI"],
    current: true,
  },
  {
    company: "CharacterQuilt",
    role: "Software Engineer",
    period: "Jan 2025 to Apr 2025",
    location: "San Francisco, CA",
    summary:
      "Owned an AI product end to end. Automated ingestion of 100+ weekly transcripts via AWS Lambda, embedded 2,000+ vectors/month in Pinecone (~15 hrs/week saved), and built a FastAPI context assembly layer across Pinecone, S3, and Typesense. Added a multi model router (GPT, Claude, Gemini, Llama, Sonar) that cut token costs by 35% and restructured the backend with OpenAI multi tool support, reducing query time by 55%. Redesigned the React chat UI to surface AI reasoning and search context.",
    technologies: ["React", "FastAPI", "AWS", "TypeScript", "Pinecone", "LLMs"],
    current: false,
  },
  {
    company: "Constant Contact",
    role: "Software Engineer",
    period: "Jan 2024 to Apr 2024",
    location: "Brookline, MA",
    summary:
      "Built Spring APIs and React components for the BrandKit product, supporting 1,000+ monthly asset interactions. Automated CI/CD with Jenkins, added Prometheus/Grafana observability, and containerized the app on EKS with Docker and Kubernetes, improving cost efficiency by 20%.",
    technologies: ["Java Spring", "React", "Jenkins", "Docker", "Kubernetes", "Prometheus"],
    current: false,
  },
  {
    company: "CoreAVI",
    role: "Machine Learning Engineer",
    period: "May 2023 to Aug 2023",
    location: "Tampa, FL",
    summary:
      "Built a decoder only Transformer for C code generation. Finetuned with Hugging Face and PyTorch for a 50% performance boost, then applied LoRA with quantization to cut training time by 82% on 6,000 samples. Deploying the model into team workflows lifted productivity by 40%.",
    technologies: ["Python", "PyTorch", "Hugging Face", "NLP", "LoRA"],
    current: false,
  },
  {
    company: "OpenText",
    role: "Software Engineer",
    period: "Sep 2022 to Dec 2022",
    location: "Toronto, ON",
    summary:
      "Developed React/TypeScript UI and Node.js/Express APIs for the Case Management product, driving a 15% gain in user satisfaction. Containerized with Docker and deployed on GCP via Kubernetes and Helm, contributing to a 30% improvement in business agility.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "GCP"],
    current: false,
  },
  {
    company: "CGI",
    role: "Software Engineer",
    period: "Jan 2022 to Apr 2022",
    location: "Toronto, ON",
    summary:
      "Wrote KornShell scripts that cut backup durations by 80% and freed 45% more storage. Built a Java Spring Tableau migration tool that automated server data transfers, reducing manual tracking time by 70%.",
    technologies: ["Java Spring", "KornShell", "Tableau"],
    current: false,
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-12 lg:py-16 relative bg-secondary/40 paper-texture">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="paper-card p-6 md:p-8 inline-block folder-tab" data-label="Experience">
            <h2 className="text-2xl lg:text-3xl font-bold text-balance">
              {"Where I've"} <span className="marker-highlight">worked</span>
            </h2>
          </div>
        </div>

        <div className="space-y-5">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${index}`}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="paper-card p-5 lg:p-6 relative hover-lift color-transition"
                style={{ transform: `rotate(${index % 2 === 0 ? -0.3 : 0.3}deg)` }}
              >
                {exp.current && (
                  <div className="absolute -top-2 -right-2 stamp bg-[var(--paper-green)]">Current</div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-6">
                  <div className="lg:w-40 shrink-0">
                    <span className="font-mono text-xs text-muted-foreground block">{exp.period}</span>
                    <span className="font-mono text-[10px] text-muted-foreground/80 mt-1 block">{exp.location}</span>
                  </div>

                  <div className="flex-1">
                    <div className="mb-3">
                      {exp.link ? (
                        <Link
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 flex-wrap group"
                        >
                          <h4 className="text-base font-bold">{exp.role}</h4>
                          <span className="text-muted-foreground text-sm">@</span>
                          <span className="text-primary font-bold text-sm underline underline-offset-2 decoration-2">
                            {exp.company}
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold">{exp.role}</h4>
                          <span className="text-muted-foreground text-sm">@</span>
                          <span className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Building2 className="h-3.5 w-3.5" />
                            {exp.company}
                          </span>
                          {exp.type && <span className="stamp text-[10px]">{exp.type}</span>}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{exp.summary}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border-2 border-border bg-background"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
