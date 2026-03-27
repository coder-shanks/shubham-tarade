import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

interface Particle {
  id: number
  x: number
  y: number
  fallY: number
  driftX: number
  duration: number
  delay: number
  size: number
}

export function ParticleEffect({ x, y, burstKey }: { x: number; y: number; burstKey: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const particleCount = 36
    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const spreadX = (Math.random() - 0.5) * 220
      const startYOffset = -Math.random() * 40
      return {
        id: burstKey * 1000 + i,
        x: x + spreadX,
        y: y + startYOffset,
        fallY: 220 + Math.random() * 220,
        driftX: (Math.random() - 0.5) * 120,
        duration: 1.8 + Math.random() * 1.1,
        delay: Math.random() * 0.35,
        size: 4 + Math.random() * 6,
      }
    })

    setParticles(newParticles)

    const timeout = setTimeout(() => setParticles([]), 3400)
    return () => clearTimeout(timeout)
  }, [x, y, burstKey])

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed left-0 top-0 pointer-events-none z-50"
          initial={{ x: particle.x, y: particle.y, opacity: 0, scale: 0.7 }}
          animate={{
            x: particle.x + particle.driftX,
            y: particle.y + particle.fallY,
            opacity: [0, 1, 1, 0],
            scale: 1,
          }}
          transition={{ duration: particle.duration, delay: particle.delay, ease: 'easeOut' }}
        >
          <div
            className="rounded-full bg-primary shadow-[0_0_12px_rgba(255,153,51,0.45)]"
            style={{ width: `${particle.size}px`, height: `${particle.size}px` }}
          />
        </motion.div>
      ))}
    </>
  )
}
