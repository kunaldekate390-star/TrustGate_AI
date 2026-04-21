import Link from 'next/link'
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-20">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#050816]" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-lg">TrustGate<span className="text-[#00F5FF]">.ai</span></span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">The real-time hallucination detection layer powering safer AI for enterprises, developers, and critical domains.</p>
            <div className="flex gap-3 mt-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[#00F5FF]/50 hover:text-[#00F5FF] transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[#00F5FF]/50 hover:text-[#00F5FF] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[#00F5FF]/50 hover:text-[#00F5FF] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:contact@trustgate.ai" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[#00F5FF]/50 hover:text-[#00F5FF] transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/demo" className="hover:text-[#00F5FF]">Live Demo</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#00F5FF]">Dashboard</Link></li>
              <li><Link href="/datasets" className="hover:text-[#00F5FF]">Datasets</Link></li>
              <li><Link href="/about" className="hover:text-[#00F5FF]">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Team</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Kunal Dekate — Founder</li>
              <li>ML / Research</li>
              <li>Engineering</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-slate-500">
          <p>© 2025 TrustGate AI. All rights reserved.</p>
          <p>Built for a safer, more trustworthy AI future.</p>
        </div>
      </div>
    </footer>
  )
}
