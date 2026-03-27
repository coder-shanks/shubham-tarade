import { useEffect, useRef, useState } from "react"

export function useTypewriter(text: string, speed = 60, delay = 0) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null
    const start = setTimeout(() => {
      indexRef.current = 0
      setDisplayed("")
      setDone(false)

      intervalId = setInterval(() => {
        indexRef.current += 1
        setDisplayed(text.slice(0, indexRef.current))
        if (indexRef.current >= text.length) {
          if (intervalId) {
            clearInterval(intervalId)
          }
          setDone(true)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(start)
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [text, speed, delay])

  return { displayed, done }
}
