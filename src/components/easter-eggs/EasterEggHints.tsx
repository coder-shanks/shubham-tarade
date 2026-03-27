import { toast } from 'sonner'
import { useBottomScrollDetection } from '@/hooks/useBottomScrollDetection'

const KEYBOARD_HINTS = [
  '🎮 Try pressing G three times fast to unlock the MEMORY GAME!',
  '🔮 Enter the Konami code (↑↑↓↓←→←→BA) to activate HACKER MODE!',
]

const TOUCH_FRIENDLY_HINTS = [
  '✨ Click my name in the hero section for a hidden click counter + particle burst!',
]

export function EasterEggHints() {
  useBottomScrollDetection({
    threshold: 15,
    onReach: () => {
      const isMobileDevice =
        typeof window !== 'undefined' &&
        (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)

      const availableHints = isMobileDevice
        ? TOUCH_FRIENDLY_HINTS
        : [...TOUCH_FRIENDLY_HINTS, ...KEYBOARD_HINTS]

      // Pick a random hint
      const randomHint = availableHints[Math.floor(Math.random() * availableHints.length)]
      toast(randomHint, {
        duration: 6000,
      })
    },
  })

  return null
}
