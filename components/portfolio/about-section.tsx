"use client"

import { useEffect, useRef, useState } from "react"
import { Gamepad2, Code2, Keyboard, Brain, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const interests = [
  {
    icon: Code2,
    title: "Full stack",
    description: "React, TypeScript, Python APIs",
    variant: "red" as const,
  },
  {
    icon: Brain,
    title: "ML & LLMs",
    description: "RAG, agents, PyTorch",
    variant: "blue" as const,
  },
  {
    icon: Keyboard,
    title: "Systems",
    description: "Docker, Kubernetes, cloud",
    variant: "green" as const,
  },
  {
    icon: Gamepad2,
    title: "Product",
    description: "Shipping features end to end",
    variant: "yellow" as const,
  },
]

export function AboutSection() {
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
    <section id="about" ref={sectionRef} className="py-12 lg:py-16 relative paper-texture">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div 
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="paper-card p-6 md:p-8 folder-tab" data-label="About">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-balance">
              Building digital experiences
              <br />
              <span className="marker-highlight">that matter</span>
            </h2>
          </div>
        </div>
        
        {/* Two column layout */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">
          {/* Left column - Main text */}
          <div 
            className={`lg:col-span-3 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="paper-card p-6 md:p-8 lined-paper">
              <div className="space-y-5">
                <p className="text-base text-foreground leading-relaxed">
                  I study Computer Engineering at Waterloo and have worked at companies ranging from enterprise software to smaller AI focused teams. Day to day that has meant a mix of web clients,
                  APIs, data stores, and cloud deploys.
                </p>

                <p className="text-base text-foreground leading-relaxed">
                  I am especially interested when the problem needs both a thoughtful interface and a dependable backend, often integrating ML or generative models into the stack.
                </p>

                <p className="text-base text-foreground leading-relaxed">
                  I care about measurable quality: fast iteration, observable systems, and UX that does not get in the way.
                </p>
                
                <div className="pt-4">
                  <Link 
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-3 border-2 border-border bg-primary text-white font-bold uppercase tracking-wider text-xs btn-press"
                    style={{ boxShadow: '4px 4px 0 var(--border)' }}
                  >
                    {"Let's work together"}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Interest cards */}
          <div 
            className={`lg:col-span-2 grid grid-cols-2 gap-3 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {interests.map((interest, index) => (
              <div
                key={interest.title}
                className={`post-it ${interest.variant} p-4 sticker hover-lift color-transition`}
                style={{ 
                  transform: `rotate(${index % 2 === 0 ? -1.5 : 2}deg)`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="w-9 h-9 border-2 border-foreground/20 flex items-center justify-center mb-3 bg-background/30 transition-transform duration-300 group-hover:scale-110">
                  <interest.icon className="h-4 w-4 text-foreground" />
                </div>
                <h4 className="font-bold text-foreground mb-1 text-xs uppercase tracking-wide">
                  {interest.title}
                </h4>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
