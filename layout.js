import './globals.css'
import CursorGlow from '@/components/CursorGlow'

export const metadata = {
  title: 'TrustGate AI — Verify AI Before You Trust It',
  description: 'Real-time AI hallucination detection layer. TrustGate AI verifies claims using trusted sources, scores confidence, and flags suspicious outputs instantly.',
  keywords: 'AI, hallucination detection, trust, verification, LLM, AI safety',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-[#050816] text-[#F8FAFC] antialiased">
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
