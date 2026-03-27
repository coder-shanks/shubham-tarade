import { useEffect } from "react"

type UseScrollToHashOptions = {
  maxAttempts?: number
  behavior?: ScrollBehavior
}

export function useScrollToHash(options: UseScrollToHashOptions = {}) {
  const { maxAttempts = 12, behavior = "smooth" } = options

  useEffect(() => {
    let frameId: number | null = null

    const scrollToCurrentHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""))
      if (!hash) return

      let attempts = 0

      const tryScroll = () => {
        const target = document.getElementById(hash)
        if (target) {
          target.scrollIntoView({ behavior, block: "start" })
          return
        }

        attempts += 1
        if (attempts < maxAttempts) {
          frameId = window.requestAnimationFrame(tryScroll)
        }
      }

      tryScroll()
    }

    scrollToCurrentHash()
    window.addEventListener("hashchange", scrollToCurrentHash)

    return () => {
      window.removeEventListener("hashchange", scrollToCurrentHash)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [behavior, maxAttempts])
}
