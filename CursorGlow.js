'use client'
import { useEffect, useState } from 'react'

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 })

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-[9999] rounded-full opacity-40 mix-blend-screen"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(0,245,255,0.25) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)',
        transition: 'left 0.08s ease-out, top 0.08s ease-out',
      }}
    />
  )
}
