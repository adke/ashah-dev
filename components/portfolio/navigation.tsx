"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = navItems.map(item => item.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          isScrolled 
            ? "bg-background/95 backdrop-blur-sm border-b-2 border-border py-3" 
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="paper-card px-3 py-1.5 font-bold text-sm tracking-tight"
            >
              <span className="font-mono text-primary">{"<"}</span>
              <span>AS</span>
              <span className="font-mono text-primary">{" />"}</span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-all duration-200 icon-bounce",
                    activeSection === item.href.replace('#', '')
                      ? "bg-primary text-primary-foreground border-border shadow-[2px_2px_0_0] shadow-border"
                      : "border-transparent hover:border-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:-translate-y-0.5"
                  )}
                  style={{ transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden paper-card p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          className="absolute inset-0 bg-background/95"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="absolute top-20 left-6 right-6">
          <div className="paper-card p-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-2.5 text-sm font-bold uppercase tracking-wider border-2 border-border transition-colors",
                  activeSection === item.href.replace('#', '')
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
