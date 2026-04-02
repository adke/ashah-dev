"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Send, Github, Linkedin, MapPin, Calendar, Phone, ExternalLink } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { CONTACT_EMAIL, copyContactEmail } from "@/lib/contact"

const WEB3FORMS_URL = "https://api.web3forms.com/submit"

type Web3FormsResponse = {
  success?: boolean
  message?: string
  body?: { message?: string }
}

type ContactSocialLink =
  | {
      icon: typeof Github | typeof Linkedin | typeof ExternalLink
      href: string
      label: string
      username: string
    }
  | {
      icon: typeof Mail
      label: string
      username: string
      copyEmail: true
    }

const socialLinks: ContactSocialLink[] = [
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
    label: "Email",
    username: CONTACT_EMAIL,
    copyEmail: true,
  },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  
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
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey?.trim()) {
      toast.error("Contact form is not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      })

      let data: Web3FormsResponse = {}
      try {
        data = (await res.json()) as Web3FormsResponse
      } catch {
        toast.error("Invalid response from the form service. Please try again.")
        return
      }

      const errMsg =
        data.body?.message ?? data.message ?? "Something went wrong. Please try again."

      if (data.success === true) {
        toast.success(data.body?.message ?? "Message sent successfully.")
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
      } else {
        toast.error(errMsg)
      }
    } catch {
      toast.error("Network error. Check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyEmail = async () => {
    const ok = await copyContactEmail()
    if (ok) {
      toast.success("Email copied to clipboard")
    } else {
      toast.error("Couldn't copy email. Try again or copy it manually.")
    }
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
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
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
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="shrink-0 rounded-sm border-0 bg-transparent p-0 text-foreground transition-colors hover:text-primary cursor-pointer"
                    aria-label="Copy email address"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                  <div>
                    <p className="font-bold text-xs">Email</p>
                    <p className="text-xs text-primary font-mono break-all">{CONTACT_EMAIL}</p>
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
                {socialLinks.map((social, index) => {
                  const cardClass =
                    "paper-card p-2.5 bg-background/40 flex items-center gap-2 hover:bg-background transition-colors sticker text-left w-full"
                  const rotation = { transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)` }
                  if ("copyEmail" in social && social.copyEmail) {
                    return (
                      <button
                        key={social.label}
                        type="button"
                        onClick={handleCopyEmail}
                        className={cardClass}
                        style={rotation}
                        aria-label="Copy email address"
                      >
                        <social.icon className="h-4 w-4 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-[10px]">{social.label}</p>
                          <p className="text-[10px] text-foreground/70 font-mono break-all">
                            {social.username}
                          </p>
                        </div>
                      </button>
                    )
                  }
                  const linkSocial = social as Extract<
                    ContactSocialLink,
                    { href: string }
                  >
                  const openInNewTab =
                    linkSocial.href.startsWith("http://") ||
                    linkSocial.href.startsWith("https://")
                  return (
                    <Link
                      key={linkSocial.label}
                      href={linkSocial.href}
                      {...(openInNewTab
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={cardClass}
                      style={rotation}
                    >
                      <linkSocial.icon className="h-4 w-4 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-[10px]">{linkSocial.label}</p>
                        <p className="text-[10px] text-foreground/70 font-mono break-all">
                          {linkSocial.username}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
