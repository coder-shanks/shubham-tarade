import { motion, AnimatePresence } from 'motion/react'

interface HackerModeProps {
  isActive: boolean
}

export function HackerMode({ isActive }: HackerModeProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Glitch Effect Overlay */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-40 bg-gradient-to-br from-green-500/10 via-transparent to-green-600/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Scanlines */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Glitch bars animated */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="fixed left-0 right-0 h-px pointer-events-none z-40 bg-green-500/50"
              initial={{ top: '0%', opacity: 0 }}
              animate={{
                top: ['0%', '100%'],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}

          {/* Activation message */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="text-center font-mono text-2xl font-bold text-green-500 drop-shadow-lg"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(0, 255, 0, 0.5)',
                    '0 0 20px rgba(0, 255, 0, 0.8)',
                    '0 0 10px rgba(0, 255, 0, 0.5)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                »» HACKER MODE ACTIVATED ««
              </motion.div>
              <motion.p
                className="text-center font-mono text-green-500/70 text-sm mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                $ sudo portfolio_unlock
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
