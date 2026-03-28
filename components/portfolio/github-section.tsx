"use client"

import { useEffect, useRef, useState } from "react"
import { Github, GitPullRequest, Star, Users } from "lucide-react"
import Link from "next/link"

const stats = [
  { icon: GitPullRequest, label: "Focus", value: "Full-stack" },
  { icon: Star, label: "Interests", value: "ML · LLMs" },
  { icon: Users, label: "Open source", value: "GitHub" },
]

// Static contribution levels (0-4) for consistent SSR/client rendering
// 0 = none, 1 = low, 2 = medium, 3 = high, 4 = very high
const staticContributions: number[][] = [
  [0,2,3,2,1,0,0],[1,2,2,3,2,1,0],[0,1,3,4,2,0,0],[1,2,2,3,3,1,0],[0,3,4,3,2,1,0],[1,2,3,2,1,0,0],[0,2,2,4,3,0,0],
  [1,3,2,3,2,1,0],[0,2,4,3,2,0,0],[1,2,3,4,3,1,0],[0,1,2,3,2,0,0],[1,3,3,2,2,1,0],[0,2,4,4,3,0,0],[1,2,2,3,2,1,0],
  [0,3,3,4,2,0,0],[1,2,4,3,3,1,0],[0,1,2,2,2,0,0],[1,2,3,4,2,1,0],[0,3,4,3,3,0,0],[1,2,2,3,2,1,0],[0,2,3,4,2,0,0],
  [1,3,4,3,3,1,0],[0,2,2,3,2,0,0],[1,2,3,4,3,1,0],[0,1,4,3,2,0,0],[1,3,2,2,2,1,0],[0,2,3,4,3,0,0],[1,2,4,3,2,1,0],
  [0,3,2,4,3,0,0],[1,2,3,3,2,1,0],[0,2,4,4,3,0,0],[1,3,2,3,2,1,0],[0,1,3,3,2,0,0],[1,2,4,4,3,1,0],[0,2,2,3,2,0,0],
  [1,3,3,4,3,1,0],[0,2,4,3,2,0,0],[1,2,2,3,3,1,0],[0,3,3,4,2,0,0],[1,2,4,3,2,1,0],[0,1,2,3,3,0,0],[1,2,3,4,2,1,0],
  [0,3,4,3,2,0,0],[1,2,2,3,3,1,0],[0,2,3,4,2,0,0],[1,3,4,3,2,1,0],[0,2,2,3,3,0,0],[1,2,3,4,3,1,0],[0,1,4,3,2,0,0],
  [1,3,2,4,3,1,0],[0,2,3,3,2,0,0],[1,2,4,4,3,1,0]
]

const contributionColors = [
  "bg-muted",
  "bg-primary/25", 
  "bg-primary/45",
  "bg-primary/65",
  "bg-primary/90"
] as const

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
          <div className="paper-card p-6 md:p-8 folder-tab" data-label="GitHub">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-balance">
              Open Source <span className="marker-highlight">Contributions</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Building in public and contributing to open source.
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div 
          className={`flex flex-wrap justify-center gap-4 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="paper-card p-5 text-center sticker hover-lift"
              style={{ transform: `rotate(${index === 1 ? 1.5 : index === 2 ? -1 : -1.5}deg)` }}
            >
              <stat.icon className="h-5 w-5 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Contribution graph */}
        <div 
          className={`paper-card p-5 overflow-x-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="paper-card p-1.5">
              <Github className="h-4 w-4" />
            </div>
            <span className="font-bold font-mono text-sm">Adish Shah</span>
            <Link 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary font-bold uppercase tracking-wider hover:underline ml-auto"
            >
              View Profile
            </Link>
          </div>
          
          {/* Contribution grid */}
          <div className="grid-paper p-3 border-2 border-border">
            <div className="flex gap-[2px] min-w-max">
              {staticContributions.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {week.map((level, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-2.5 h-2.5 border border-border/50 ${contributionColors[level]} transition-all duration-300`}
                      style={{ 
                        transitionDelay: isVisible ? `${(weekIndex * 7 + dayIndex) * 2}ms` : '0ms',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'scale(1)' : 'scale(0)'
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-0.5">
              <div className="w-2.5 h-2.5 border border-border/50 bg-muted" />
              <div className="w-2.5 h-2.5 border border-border/50 bg-primary/25" />
              <div className="w-2.5 h-2.5 border border-border/50 bg-primary/45" />
              <div className="w-2.5 h-2.5 border border-border/50 bg-primary/65" />
              <div className="w-2.5 h-2.5 border border-border/50 bg-primary/90" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  )
}
