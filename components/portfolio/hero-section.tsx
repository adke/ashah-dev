"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ArrowDown, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const socialLinks = [
  { icon: Github, href: "https://github.com/adke", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:adish.shah2003@gmail.com", label: "Email" },
]

export function HeroSection() {
  const [yearsOnEarth, setYearsOnEarth] = useState("00.000000000")
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
    
    const birthDate = new Date("2003-02-08")
    
    const updateAge = () => {
      const now = new Date()
      const diff = now.getTime() - birthDate.getTime()
      const years = diff / (1000 * 60 * 60 * 24 * 365.25)
      setYearsOnEarth(years.toFixed(9))
    }
    
    updateAge()
    const interval = setInterval(updateAge, 50)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section className="relative min-h-screen flex items-center justify-center paper-texture overflow-hidden">
      {/* Grid paper background */}
      <div className="absolute inset-0 grid-paper opacity-50" />
      
      {/* Animated background shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-shape bg-[var(--paper-yellow)] drift hidden lg:block" style={{ '--rotate': '12deg' } as React.CSSProperties} />
      <div className="absolute top-40 right-20 w-12 h-12 bg-shape bg-[var(--paper-blue)] float hidden lg:block" style={{ '--rotate': '-8deg' } as React.CSSProperties} />
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-shape bg-[var(--paper-green)] float-delayed hidden lg:block" style={{ '--rotate': '5deg' } as React.CSSProperties} />
      <div className="absolute bottom-40 right-10 w-14 h-14 bg-shape bg-[var(--paper-red)] drift hidden lg:block" style={{ '--rotate': '-15deg', animationDelay: '-10s' } as React.CSSProperties} />
      
      {/* Decorative post-its with RGB colors */}
      <div className="absolute top-32 right-8 md:right-20 post-it yellow hidden lg:block float" style={{ transform: 'rotate(3deg)' }}>
        <p className="font-mono text-xs text-foreground/80">
          {"// TODO: Build amazing things"}
        </p>
      </div>
      
      <div className="absolute bottom-40 left-8 md:left-16 post-it green hidden lg:block float-delayed" style={{ transform: 'rotate(-2deg)' }}>
        <p className="font-mono text-xs text-foreground/80">
          React + Next.js
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-20">
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main paper card */}
          <div className="paper-card p-8 md:p-12 lg:p-16 relative paper-clip">
            {/* Profile and header row */}
            <div className="flex flex-col-reverse sm:flex-row items-start gap-6 mb-8">
              <div className="flex-1">
                {/* Available badge */}
                <div className="inline-flex items-center gap-2 mb-4 stamp bg-[var(--paper-green)]" style={{ transform: 'rotate(-3deg)' }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-green-600 opacity-75" style={{ borderRadius: '1px' }}></span>
                    <span className="relative inline-flex h-2 w-2 bg-green-600" style={{ borderRadius: '1px' }}></span>
                  </span>
                  <span>Open to work</span>
                </div>
                
                {/* Name */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  <span className="hand-underline">Hey, I'm</span>
                  <br />
                  <span className="marker-highlight">Adish Shah</span>
                </h1>
              </div>
              
              {/* Profile picture - polaroid style (top-right) */}
              <div className="polaroid sticker shrink-0 hover-lift sm:self-start" style={{ transform: 'rotate(3deg)' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[var(--paper-blue)] border-2 border-border flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/profile.jpg"
                    alt="Adish Shah"
                    width={400}
                    height={400}
                    quality={100}
                    className="w-full h-full object-cover scale-125"
                    priority
                    onError={(e) => {
                      // Fallback to initials if image fails
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = '<span class="text-3xl font-bold text-foreground/30">AS</span>'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Title */}
            <p className="text-lg sm:text-xl font-bold mb-8 uppercase tracking-wider">
              Computer Engineering @{" "}
              <span className="text-primary">University of Waterloo</span>
              <span className="block text-base sm:text-lg font-semibold normal-case tracking-normal mt-2 text-muted-foreground">
                Software engineer · Web, APIs, and applied ML
              </span>
            </p>
            
            {/* Years counter */}
            <div className="inline-flex items-center gap-3 paper-card px-4 py-3 mb-8 bg-secondary">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="font-mono text-sm">
                Earth resident for{" "}
                <span className="font-bold tabular-nums text-primary">{yearsOnEarth}</span>
                {" "}years
              </span>
            </div>
            
            {/* Description */}
            <div className="lined-paper py-4 px-3 mb-10 max-w-2xl">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                I like owning features across the stack: polished web UIs, solid APIs, and ML or LLM powered
                pieces when the roadmap calls for them. I am looking for teams where I can keep leveling up
                as an engineer.
              </p>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link 
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-border bg-primary text-white font-bold uppercase tracking-wider text-sm btn-press breathe shake-hover"
                style={{ boxShadow: '4px 4px 0 var(--border)' }}
              >
                <Sparkles className="h-4 w-4" />
                {"Let's Talk"}
              </Link>
              <Link 
                href="#projects"
                className="paper-card px-6 py-3 bg-card font-bold uppercase tracking-wider text-sm hover:bg-secondary transition-colors btn-press pop-hover"
              >
                View Projects
              </Link>
            </div>
            
            {/* Social links */}
            <div className="flex items-center gap-2 stagger-children">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-card p-3 hover:bg-secondary transition-all sticker icon-bounce pop-hover"
                  aria-label={social.label}
                  style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
                >
                  <social.icon className="h-5 w-5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="paper-card p-2 animate-bounce">
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  )
}
