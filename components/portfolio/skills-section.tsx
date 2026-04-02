"use client"

import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    name: "Languages",
    skills: [
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "C++", level: 80 },
      { name: "SQL", level: 85 },
    ],
    variant: "red" as const,
  },
  {
    name: "Frameworks & stacks",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Java Spring", level: 85 },
      { name: "FastAPI", level: 85 },
      { name: "Node.js / Express", level: 80 },
    ],
    variant: "blue" as const,
  },
  {
    name: "ML & data",
    skills: [
      { name: "PyTorch", level: 80 },
      { name: "TensorFlow", level: 70 },
      { name: "NumPy / Pandas", level: 85 },
      { name: "Sklearn", level: 75 },
    ],
    variant: "green" as const,
  },
  {
    name: "Platform & ops",
    skills: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 80 },
      { name: "Git / CI/CD", level: 90 },
      { name: "AWS / GCP", level: 75 },
    ],
    variant: "yellow" as const,
  },
]

const technologies = [
  "Java",
  "Python",
  "C++",
  "TypeScript",
  "JavaScript",
  "SQL",
  "React",
  "Next.js",
  "Java Spring",
  "FastAPI",
  "Docker",
  "Kubernetes",
  "Redis",
  "DynamoDB",
  "PostgreSQL",
  "AWS",
  "Google Cloud",
  "PyTorch",
  "TensorFlow",
  "LLMs",
  "Microservices",
  "Agile",
  "Git",
  "Figma",
]

export function SkillsSection() {
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
    <section id="skills" ref={sectionRef} className="py-12 lg:py-16 relative bg-secondary/40 paper-texture">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="paper-card p-6 md:p-8 folder-tab" data-label="Skills">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-balance">
              Technologies I <span className="marker-highlight">work with</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Tools and frameworks I use across projects and professional work.
            </p>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-5 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className={`post-it ${category.variant} p-5 sticker hover-lift color-transition`}
              style={{ transform: `rotate(${categoryIndex % 2 === 0 ? -1 : 1}deg)` }}
            >
              <h4 className="text-sm font-bold mb-5 uppercase tracking-wider">{category.name}</h4>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold text-foreground">{skill.name}</span>
                      <span className="text-[10px] font-mono font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-background/40 border border-border overflow-hidden">
                      <div
                        className="h-full bg-foreground/80 transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${(categoryIndex * 4 + skillIndex) * 50}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="paper-card p-6">
            <h4 className="text-center text-sm font-bold mb-6 uppercase tracking-wider">Also familiar with</h4>
            <div className={`flex flex-wrap justify-center gap-2 ${isVisible ? "stagger-children" : ""}`}>
              {technologies.map((tech, index) => (
                <span
                  key={tech}
                  className="stamp sticker pop-hover"
                  style={
                    {
                      transform: `rotate(${index % 3 === 0 ? -2 : index % 3 === 1 ? 1.5 : -0.5}deg)`,
                      "--rotation": `${index % 3 === 0 ? -2 : index % 3 === 1 ? 1.5 : -0.5}deg`,
                    } as React.CSSProperties
                  }
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
