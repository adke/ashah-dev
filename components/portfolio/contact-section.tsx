"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Send, Github, Linkedin, MapPin, Calendar, Phone, ExternalLink } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/adke",
    label: "GitHub",
    username: "adke",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/adish-shah/",
    label: "LinkedIn",
    username: "adish-shah",
  },
  {
    icon: ExternalLink,
    href: "https://adishs.netlify.app",
    label: "Website",
    username: "Portfolio",
  },
  {
    icon: Mail,
    href: "mailto:adish.shah2003@gmail.com",
    label: "Email",
    username: "adish.shah2003@gmail.com",
  },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
  }
  
  return (
    <section id="contact" ref={sectionRef} className="py-12 lg:py-16 relative paper-texture">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="paper-card p-6 md:p-8 inline-block folder-tab" data-label="Contact">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-balance">
              {"Let's"} <span className="marker-highlight">work together</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg">
              Open to software engineering roles, including new grad opportunities. Based in Waterloo, ON.
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Contact form */}
          <div 
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="paper-card p-6 lined-paper" style={{ transform: 'rotate(-0.3deg)' }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider">
                      Name
                    </label>
                    <input 
                      id="name"
                      placeholder="John Doe"
                      required
                      className="w-full px-3 py-2.5 bg-transparent border-2 border-border font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">
                      Email
                    </label>
                    <input 
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="w-full px-3 py-2.5 bg-transparent border-2 border-border font-mono text-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider">
                    Subject
                  </label>
                  <input 
                    id="subject"
                    placeholder="Project inquiry"
                    required
                    className="w-full px-3 py-2.5 bg-transparent border-2 border-border font-mono text-sm"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="w-full px-3 py-2.5 bg-transparent border-2 border-border font-mono text-sm resize-none"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full px-6 py-3 border-2 border-border bg-primary text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 btn-press disabled:opacity-50"
                  style={{ boxShadow: '4px 4px 0 var(--border)' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact info */}
          <div 
            className={`space-y-5 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Quick info */}
            <div className="post-it yellow hover-lift" style={{ transform: 'rotate(0.8deg)' }}>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">
                Quick Info
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-bold text-xs">Location</p>
                    <p className="text-xs text-foreground/70">Waterloo, ON, Canada</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-bold text-xs">Phone</p>
                    <Link href="tel:+15879663595" className="text-xs text-primary font-mono underline">
                      +1 587 966 3595
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-bold text-xs">Availability</p>
                    <p className="text-xs text-foreground/70">New grad & full-time</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-bold text-xs">Email</p>
                    <Link
                      href="mailto:adish.shah2003@gmail.com"
                      className="text-xs text-primary font-mono underline break-all"
                    >
                      adish.shah2003@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="post-it blue hover-lift" style={{ transform: 'rotate(-1.5deg)' }}>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">
                Connect With Me
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((social, index) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="paper-card p-2.5 bg-background/40 flex items-center gap-2 hover:bg-background transition-colors sticker"
                    style={{ transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)` }}
                  >
                    <social.icon className="h-4 w-4" />
                    <div>
                      <p className="font-bold text-[10px]">{social.label}</p>
                      <p className="text-[10px] text-foreground/70 font-mono">{social.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
