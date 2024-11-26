'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update header background based on scroll position
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ['home', 'projects', 'careers', 'about', 'contact']
      
      // Set home as active when at the top
      if (window.scrollY < 100) {
        setActiveSection('home')
        return
      }

      // Find the current section in view
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const isInView = rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3
          if (isInView) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#careers', label: 'Careers', id: 'careers' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ]

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Adjust this value based on your header height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={twMerge(
          "fixed top-0 left-0 right-0 z-[9999] transition-all duration-500",
          isScrolled ? "py-4 backdrop-blur-lg bg-gray-900/60" : "py-6"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center md:justify-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-gray-800/50 rounded-full backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-white transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white transition-all"
              />
            </button>

            {/* Desktop Navigation */}
            <nav
              className={twMerge(
                "hidden md:flex gap-2 p-1.5 rounded-full transition-all duration-300",
                isScrolled 
                  ? "bg-gray-800/50 border border-white/10 shadow-lg" 
                  : "bg-white/5 backdrop-blur-sm"
              )}
            >
              {navItems.map(({ href, label, id }) => (
                <a
                  key={id}
                  href={href}
                  onClick={(e) => handleNavClick(e, id)}
                  className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  {activeSection === id && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-300/90 to-sky-400/90 rounded-full shadow-lg shadow-emerald-500/20"
                      transition={{ 
                        type: "spring", 
                        stiffness: 400,
                        damping: 30
                      }}
                    />
                  )}
                  <span className={twMerge(
                    "relative z-10 transition-colors duration-300",
                    activeSection === id ? "text-gray-900 font-semibold" : "text-white/70 hover:text-white"
                  )}>
                    {label}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-gray-900/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map(({ href, label, id }) => (
                <motion.a
                  key={id}
                  href={href}
                  onClick={(e) => handleNavClick(e, id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={twMerge(
                    "text-2xl font-medium transition-all duration-300 relative",
                    activeSection === id 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-400" 
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      layoutId="active-mobile"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-300 to-sky-400"
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
