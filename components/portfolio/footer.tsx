"use client"

import { ArrowUp } from "lucide-react"
import Link from "next/link"

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <footer className="relative py-10 border-t-2 border-border bg-secondary/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link 
              href="/" 
              className="paper-card px-3 py-1.5 font-bold text-sm tracking-tight"
            >
              <span className="font-mono text-primary">{"<"}</span>
              <span>AS</span>
              <span className="font-mono text-primary">{" />"}</span>
            </Link>
            <p className="text-xs text-muted-foreground font-mono">
              Building experiences that matter
            </p>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-1">
            {footerLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider border-2 border-transparent hover:border-border transition-colors"
                style={{ transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="paper-card p-2 hover:bg-secondary transition-colors btn-press"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
        
        {/* Divider */}
        <div className="paper-divider my-6" />
        
        {/* Copyright */}
        <div className="flex items-center justify-center text-xs">
          <p className="font-mono text-muted-foreground">
            © {new Date().getFullYear()} Adish Shah
          </p>
        </div>
      </div>
    </footer>
  )
}
