'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, Github } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/demo', label: 'Live Demo' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/datasets', label: 'Datasets' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong py-3' : 'py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-[#00F5FF] rounded-lg blur-md opacity-60 group-hover:opacity-100 transition" />
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#050816]" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">TrustGate<span className="text-[#00F5FF]">.ai</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition ${pathname === l.href ? 'text-[#00F5FF]' : 'text-slate-300 hover:text-white'}`}
            >
              {pathname === l.href && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-[#00F5FF]/10 border border-[#00F5FF]/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white transition">
            <Github className="w-5 h-5" />
          </a>
          <Link href="/demo" className="btn-glow px-5 py-2 rounded-lg bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] text-[#050816] font-semibold text-sm">
            Try Demo
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-strong overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`px-4 py-3 rounded-lg ${pathname === l.href ? 'bg-[#00F5FF]/10 text-[#00F5FF]' : 'text-slate-300'}`}>
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
