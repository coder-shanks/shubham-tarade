import { useState } from 'react'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { HackerMode } from './HackerMode'

export function EasterEggManager() {
  const [hackerModeActive, setHackerModeActive] = useState(false)

  useKonamiCode(() => {
    setHackerModeActive((prev) => !prev)
  })

  return (
    <>
      <HackerMode isActive={hackerModeActive} />
    </>
  )
}
