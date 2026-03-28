"use client"

import { useEffect, useRef, useState } from "react"
import { Gamepad2, Music, Dumbbell, Plane, BookOpen, Coffee } from "lucide-react"

const interests = [
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "Story driven RPGs and competitive multiplayer, always up for a session.",
    variant: "blue" as const,
    rotation: -2,
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    description: "Lifting, running, and staying active to balance out the screen time.",
    variant: "green" as const,
    rotation: 1.5,
  },
  {
    icon: Music,
    title: "Music",
    description: "Enjoy discovering new artists and genres. Playlists are always evolving.",
    variant: "yellow" as const,
    rotation: -1,
  },
  {
    icon: Plane,
    title: "Travel",
    description: "Exploring new cities and cultures whenever I get the chance.",
    variant: "peach" as const,
    rotation: 2,
  },
  {
    icon: BookOpen,
    title: "Learning",
    description: "Picking up new tech, reading papers, and tinkering with side projects.",
    variant: "red" as const,
    rotation: -1.5,
  },
  {
    icon: Coffee,
    title: "Coffee",
    description: "A good espresso or pour over is non negotiable.",
    variant: "sage" as const,
    rotation: 1,
  },
]

export function GitHubSection() {
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
    <section ref={sectionRef} className="py-12 lg:py-16 relative paper-texture">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div 
          className={`mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="paper-card p-6 md:p-8 folder-tab" data-label="Interests">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-balance">
              Beyond the <span className="marker-highlight">code</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              A few things that keep me going when I'm not at a keyboard.
            </p>
          </div>
        </div>
        
        {/* Interest cards grid */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {interests.map((interest, index) => (
            <div
              key={interest.title}
              className={`post-it ${interest.variant} p-5 sticker hover-lift color-transition`}
              style={{ 
                transform: `rotate(${interest.rotation}deg)`,
                transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
                opacity: isVisible ? 1 : 0,
              }}
            >
              <div className="w-10 h-10 border-2 border-foreground/20 flex items-center justify-center mb-3 bg-background/30 transition-transform duration-300">
                <interest.icon className="h-5 w-5 text-foreground" />
              </div>
              <h4 className="font-bold text-foreground mb-1.5 text-sm uppercase tracking-wide">
                {interest.title}
              </h4>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
