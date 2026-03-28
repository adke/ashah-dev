"use client"

type DividerVariant = 'code' | 'circuit' | 'wave' | 'brackets' | 'terminal' | 'grid'

interface SectionDividerProps {
  variant?: DividerVariant
  className?: string
}

export function SectionDivider({ variant = 'code', className = '' }: SectionDividerProps) {
  
  // Code snippet style divider
  if (variant === 'code') {
    return (
      <div className={`flex items-center justify-center py-4 ${className}`}>
        <div className="flex items-center gap-4 px-6 py-2 border-2 border-border bg-card">
          <span className="text-xs font-mono text-muted-foreground">{'<'}</span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-[var(--paper-red)] border border-border" />
            <div className="w-3 h-3 bg-[var(--paper-yellow)] border border-border" />
            <div className="w-3 h-3 bg-[var(--paper-green)] border border-border" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">{'/>'}</span>
        </div>
      </div>
    )
  }

  // Circuit board style
  if (variant === 'circuit') {
    return (
      <div className={`relative py-6 overflow-hidden ${className}`}>
        <svg className="w-full h-8" viewBox="0 0 1200 32" preserveAspectRatio="none">
          {/* Main horizontal line */}
          <line x1="0" y1="16" x2="500" y2="16" stroke="var(--border)" strokeWidth="2" />
          <line x1="700" y1="16" x2="1200" y2="16" stroke="var(--border)" strokeWidth="2" />
          
          {/* Center circuit node */}
          <g transform="translate(600, 16)">
            {/* Outer square */}
            <rect x="-40" y="-12" width="80" height="24" fill="none" stroke="var(--border)" strokeWidth="2" />
            {/* Inner elements */}
            <rect x="-30" y="-6" width="12" height="12" fill="var(--paper-blue)" stroke="var(--border)" strokeWidth="1" />
            <rect x="-12" y="-6" width="24" height="12" fill="var(--primary)" stroke="var(--border)" strokeWidth="1" />
            <rect x="18" y="-6" width="12" height="12" fill="var(--paper-green)" stroke="var(--border)" strokeWidth="1" />
          </g>
          
          {/* Connection dots */}
          <circle cx="500" cy="16" r="4" fill="var(--border)" />
          <circle cx="700" cy="16" r="4" fill="var(--border)" />
          
          {/* Branch lines */}
          <path d="M480,16 L480,8 L440,8" stroke="var(--border)" strokeWidth="1.5" fill="none" />
          <path d="M720,16 L720,24 L760,24" stroke="var(--border)" strokeWidth="1.5" fill="none" />
          <rect x="430" y="4" width="8" height="8" fill="var(--paper-yellow)" stroke="var(--border)" strokeWidth="1" />
          <rect x="762" y="20" width="8" height="8" fill="var(--paper-red)" stroke="var(--border)" strokeWidth="1" />
        </svg>
      </div>
    )
  }

  // Geometric wave pattern
  if (variant === 'wave') {
    return (
      <div className={`flex items-center justify-center py-4 gap-1 ${className}`}>
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="w-3 bg-primary/20 border border-border/50"
            style={{ 
              height: `${12 + Math.sin(i * 0.8) * 8}px`,
              transform: `translateY(${Math.cos(i * 0.8) * 2}px)`
            }}
          />
        ))}
        <div className="mx-2 w-4 h-4 bg-primary border-2 border-border rotate-45" />
        {[...Array(12)].map((_, i) => (
          <div 
            key={i + 12}
            className="w-3 bg-primary/20 border border-border/50"
            style={{ 
              height: `${12 + Math.sin((11 - i) * 0.8) * 8}px`,
              transform: `translateY(${Math.cos((11 - i) * 0.8) * 2}px)`
            }}
          />
        ))}
      </div>
    )
  }

  // Code brackets style
  if (variant === 'brackets') {
    return (
      <div className={`flex items-center justify-center py-4 ${className}`}>
        <div className="flex items-center gap-6">
          <span className="text-3xl font-mono text-border font-light">{'{'}</span>
          <div className="flex items-center gap-3">
            <div className="w-16 h-1 bg-[var(--paper-blue)]" />
            <div className="w-2 h-2 bg-primary border border-border" />
            <div className="w-20 h-1 bg-[var(--paper-green)]" />
            <div className="w-2 h-2 bg-primary border border-border" />
            <div className="w-12 h-1 bg-[var(--paper-red)]" />
          </div>
          <span className="text-3xl font-mono text-border font-light">{'}'}</span>
        </div>
      </div>
    )
  }

  // Terminal prompt style
  if (variant === 'terminal') {
    return (
      <div className={`flex items-center justify-center py-4 ${className}`}>
        <div className="flex items-center gap-3 px-5 py-2 bg-foreground/5 border-2 border-border">
          <span className="text-xs font-mono text-primary font-bold">$</span>
          <span className="text-xs font-mono text-muted-foreground">section</span>
          <span className="text-xs font-mono text-foreground/60">--next</span>
          <div className="w-2 h-4 bg-primary animate-pulse" />
        </div>
      </div>
    )
  }

  // Grid pattern with focal point
  if (variant === 'grid') {
    return (
      <div className={`relative py-6 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* Grid background */}
            <div className="grid grid-cols-7 gap-1">
              {[...Array(21)].map((_, i) => {
                const isCenter = i === 10
                const isNearCenter = [9, 11, 3, 17].includes(i)
                return (
                  <div 
                    key={i}
                    className={`w-3 h-3 border transition-all duration-300 ${
                      isCenter 
                        ? 'bg-primary border-border scale-125' 
                        : isNearCenter 
                          ? 'bg-primary/40 border-border/60' 
                          : 'bg-muted/50 border-border/30'
                    }`}
                  />
                )
              })}
            </div>
            {/* Decorative lines */}
            <div className="absolute left-1/2 top-0 w-px h-2 bg-border -translate-x-1/2 -translate-y-full" />
            <div className="absolute left-1/2 bottom-0 w-px h-2 bg-border -translate-x-1/2 translate-y-full" />
          </div>
        </div>
      </div>
    )
  }

  return null
}
