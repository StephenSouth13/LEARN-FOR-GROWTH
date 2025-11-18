'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, ArrowUp, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/i18n'
import { LanguageSwitcher } from './language-switcher'
import Image from 'next/image'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)

      // Highlight active section
      const sections = ['event', 'speakers', 'register', 'faq']
      let current = ''
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            current = section
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isActive = (section: string) => activeSection === section

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
                <Image
                  src="/logo-07.png"
                  alt="LEARN FOR GROWTH logo"
                  width={100}
                  height={100}
                  className="object-cover"
                />
            </div>

            <div className="hidden md:flex gap-8">
              <a
                href="#event"
                className={`transition font-medium ${isActive('event') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t.nav.event}
              </a>
              <a
                href="#speakers"
                className={`transition font-medium ${isActive('speakers') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t.nav.speakers}
              </a>
              <a
                href="#register"
                className={`transition font-medium ${isActive('register') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t.nav.register}
              </a>
              <a
                href="#faq"
                className={`transition font-medium ${isActive('faq') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t.nav.faq}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex">
                <LanguageSwitcher />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="hidden md:flex"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </Button>

              <Button className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                {t.nav.register}
              </Button>

              <button
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#event" className="block px-2 py-2 text-muted-foreground hover:text-foreground">
                {t.nav.event}
              </a>
              <a href="#speakers" className="block px-2 py-2 text-muted-foreground hover:text-foreground">
                {t.nav.speakers}
              </a>
              <a href="#register" className="block px-2 py-2 text-muted-foreground hover:text-foreground">
                {t.nav.register}
              </a>
              <a href="#faq" className="block px-2 py-2 text-muted-foreground hover:text-foreground">
                {t.nav.faq}
              </a>
              <div className="flex gap-2 pt-2">
                <LanguageSwitcher />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  {t.nav.register}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-accent hover:bg-accent/90 text-accent-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  )
}
