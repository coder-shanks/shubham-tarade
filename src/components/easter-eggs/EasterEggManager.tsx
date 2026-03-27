import { useState } from 'react'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { useGameTrigger } from '@/hooks/useGameTrigger'
import { HackerMode } from './HackerMode'
import { MemoryGame } from './MemoryGame'
import { EasterEggHints } from './EasterEggHints'

export function EasterEggManager() {
  const [hackerModeActive, setHackerModeActive] = useState(false)
  const [gameActive, setGameActive] = useState(false)

  useKonamiCode(() => {
    setHackerModeActive((prev) => !prev)
  })

  useGameTrigger(() => {
    setGameActive((prev) => !prev)
  })

  return (
    <>
      <HackerMode isActive={hackerModeActive} />
      <MemoryGame isActive={gameActive} onClose={() => setGameActive(false)} />
      <EasterEggHints />
    </>
  )
}
