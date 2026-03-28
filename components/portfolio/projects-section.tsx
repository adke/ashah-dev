"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredProjects = [
  {
    title: "GavelAI",
    description:
      "A platform for running structured reviews with language models: configure rubrics, kick off batches, and inspect results in a web UI, with a Python API and local model runtime.",
    technologies: ["React", "TypeScript", "FastAPI", "Python", "SQLite", "Ollama"],
    period: "Project",
  },
]

export function ProjectsSection() {
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

  const variants = ["red", "blue", "green", "yellow", "peach", "sage"] as const

  return (
    <section id="projects" ref={sectionRef} className="py-12 lg:py-16 relative paper-texture">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="paper-card p-6 md:p-8 folder-tab" data-label="Projects">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-balance">
              Featured <span className="marker-highlight">work</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Built end to end: UI, API, and model orchestration.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-5 mb-14 max-w-xl mx-auto">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="polaroid sticker h-full flex flex-col hover-lift color-transition"
                style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
              >
                <div
                  className={`aspect-[4/3] post-it ${variants[index % 3]} border-2 border-border flex items-center justify-center mb-4`}
                >
                  <span className="text-5xl font-bold text-foreground/15">{project.title.charAt(0)}</span>
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="font-mono text-[10px] text-muted-foreground mb-1">{project.period}</span>
                  <h4 className="text-base font-bold mb-2">{project.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 paper-card px-5 py-3 font-bold uppercase tracking-wider text-xs hover:bg-secondary transition-colors group btn-press"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
