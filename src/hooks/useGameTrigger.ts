import { useEffect, useCallback } from 'react'

export function useGameTrigger(onTrigger: () => void) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key.toLowerCase() === 'g') {
      const sequence = JSON.parse(localStorage.getItem('gameTrigger') || '[]') as number[]
      const now = Date.now()

      // Add timestamp of this G press
      sequence.push(now)

      // Keep only G presses from the last 1 second
      const filtered = sequence.filter(ts => now - ts < 1000)

      localStorage.setItem('gameTrigger', JSON.stringify(filtered))

      // Trigger if 3 G presses within 1 second
      if (filtered.length >= 3) {
        onTrigger()
        localStorage.setItem('gameTrigger', '[]')
      }
    }
  }, [onTrigger])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
