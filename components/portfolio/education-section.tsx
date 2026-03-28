"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap } from "lucide-react"

const education = [
  {
    institution: "University of Waterloo",
    degree: "Bachelor of Applied Science — Computer Engineering",
    period: "Sep 2021 – Present",
    description:
      "Studying systems programming, data structures, databases, and large-scale software design. Performance in coursework has stayed consistently strong.",
    logo: "UW",
    variant: "blue" as const,
  },
]

export function EducationSection() {
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
    <section ref={sectionRef} className="py-12 lg:py-16 relative bg-secondary/40 paper-texture">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="paper-card p-6 md:p-8 inline-block folder-tab" data-label="Education">
            <h2 className="text-2xl lg:text-3xl font-bold text-balance">
              Academic <span className="marker-highlight">background</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-5 max-w-2xl">
          {education.map((edu, index) => (
            <div
              key={edu.institution}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`post-it ${edu.variant} p-5 sticker hover-lift`}
                style={{ transform: `rotate(${index === 0 ? -1 : 1}deg)` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 border-2 border-foreground/20 flex items-center justify-center bg-background/40 font-bold text-sm">
                    {edu.logo}
                  </div>
                  <div className="stamp text-[10px]">{edu.period}</div>
                </div>

                <h4 className="text-sm font-bold mb-1.5 uppercase tracking-wide">{edu.institution}</h4>

                <div className="flex items-center gap-1.5 mb-3">
                  <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                  <span className="font-semibold text-xs leading-snug">{edu.degree}</span>
                </div>

                <p className="text-xs text-foreground/70 leading-relaxed">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
