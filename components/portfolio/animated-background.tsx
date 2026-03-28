"use client"

import { useEffect, useState } from "react"

// Floating code snippets - subtle but recognizable
const codeSnippets = [
  { id: 1, code: "const", x: 5, y: 15, delay: 0 },
  { id: 2, code: "=>", x: 88, y: 25, delay: 2 },
  { id: 3, code: "{ }", x: 12, y: 55, delay: 4 },
  { id: 4, code: "< />", x: 85, y: 72, delay: 1 },
  { id: 5, code: "[ ]", x: 45, y: 88, delay: 3 },
  { id: 6, code: "( )", x: 72, y: 40, delay: 5 },
]

// Geometric tech shapes
const shapes = [
  { id: 1, type: 'square', x: 8, y: 20, size: 40, rotate: 12, color: 'var(--paper-blue)' },
  { id: 2, type: 'square', x: 90, y: 35, size: 32, rotate: -8, color: 'var(--paper-green)' },
  { id: 3, type: 'square', x: 15, y: 70, size: 28, rotate: 45, color: 'var(--paper-yellow)' },
  { id: 4, type: 'square', x: 82, y: 80, size: 36, rotate: -15, color: 'var(--paper-red)' },
]

// Connection nodes for network effect
const nodes = [
  { id: 1, x: 20, y: 30 },
  { id: 2, x: 35, y: 18 },
  { id: 3, x: 75, y: 25 },
  { id: 4, x: 60, y: 45 },
  { id: 5, x: 25, y: 65 },
  { id: 6, x: 80, y: 60 },
  { id: 7, x: 50, y: 75 },
]

// Connection lines between nodes
const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 6 },
  { from: 1, to: 5 },
  { from: 5, to: 7 },
  { from: 6, to: 7 },
]

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* Network connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from)!
          const toNode = nodes.find(n => n.id === conn.to)!
          return (
            <line
              key={i}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="var(--foreground)"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s`, animationDuration: '4s' }}
            />
          )
        })}
      </svg>

      {/* Network nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute w-2 h-2 border border-border/20 bg-primary/10 opacity-20"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Floating code snippets */}
      {codeSnippets.map((snippet) => (
        <div
          key={snippet.id}
          className="absolute font-mono text-xs text-foreground/[0.06] paper-float select-none"
          style={{
            left: `${snippet.x}%`,
            top: `${snippet.y}%`,
            animationDelay: `${snippet.delay}s`,
            animationDuration: '20s',
          }}
        >
          {snippet.code}
        </div>
      ))}

      {/* Geometric shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute border-2 opacity-[0.06] float"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            borderColor: shape.color,
            transform: `rotate(${shape.rotate}deg)`,
            animationDelay: `${shape.id * 2}s`,
            animationDuration: '15s',
          }}
        />
      ))}

      {/* Corner accents - top left */}
      <div className="absolute top-8 left-8 opacity-[0.08]">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path d="M0 0 L30 0 L30 6 L6 6 L6 30 L0 30 Z" fill="var(--primary)" />
        </svg>
      </div>

      {/* Corner accents - bottom right */}
      <div className="absolute bottom-8 right-8 opacity-[0.08]">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path d="M60 60 L30 60 L30 54 L54 54 L54 30 L60 30 Z" fill="var(--primary)" />
        </svg>
      </div>

      {/* Subtle grid pattern in center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <div className="grid grid-cols-5 gap-4">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-3 h-3 border border-foreground" />
          ))}
        </div>
      </div>

      {/* Decorative brackets */}
      <div className="absolute left-[10%] top-[45%] text-4xl font-mono text-foreground/[0.04] float" style={{ animationDuration: '18s' }}>
        {'{ }'}
      </div>
      <div className="absolute right-[12%] top-[55%] text-4xl font-mono text-foreground/[0.04] float-delayed" style={{ animationDuration: '22s' }}>
        {'< />'}
      </div>

      {/* Progress bar accent */}
      <div className="absolute top-[20%] right-[5%] w-24 h-1.5 bg-muted/20 overflow-hidden opacity-30">
        <div className="h-full w-3/4 bg-primary/30 animate-pulse" style={{ animationDuration: '3s' }} />
      </div>
      <div className="absolute bottom-[25%] left-[5%] w-20 h-1.5 bg-muted/20 overflow-hidden opacity-30">
        <div className="h-full w-1/2 bg-primary/30 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>
    </div>
  )
}
