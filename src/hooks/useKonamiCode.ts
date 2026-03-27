import { useEffect, useCallback } from 'react'

const KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useKonamiCode(onTrigger: () => void) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key === 'b' || event.key === 'a' ? event.key : event.code

    // Push current key to the sequence tracker in localStorage
    const sequence = JSON.parse(localStorage.getItem('konamiSequence') || '[]') as string[]
    sequence.push(key)

    // Keep only the last 10 keys
    if (sequence.length > KONAMI_SEQUENCE.length) {
      sequence.shift()
    }

    localStorage.setItem('konamiSequence', JSON.stringify(sequence))

    // Check if sequence matches
    if (
      sequence.length === KONAMI_SEQUENCE.length &&
      sequence.every((k, i) => k === KONAMI_SEQUENCE[i])
    ) {
      onTrigger()
      localStorage.setItem('konamiSequence', '[]')
    }
  }, [onTrigger])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
