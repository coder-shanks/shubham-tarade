import { useEffect, useRef } from 'react'

type UseBottomScrollDetectionOptions = {
  threshold?: number // percentage from bottom (0-100)
  onReach?: () => void
}

export function useBottomScrollDetection({
  threshold = 15,
  onReach,
}: UseBottomScrollDetectionOptions = {}) {
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    if (hasTriggeredRef.current) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight

      // Calculate how far down the page the user is (0-100%)
      const scrollPercentage = ((scrollTop + windowHeight) / docHeight) * 100

      // Trigger callback when user reaches threshold from bottom
      if (scrollPercentage >= 100 - threshold && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true
        onReach?.()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold, onReach])

  return { hasReachedBottom: hasTriggeredRef.current }
}
