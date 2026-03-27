import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import strawhatLogo from "@/assets/strawhat.png"

const SECTIONS = [
  { id: "hero", label: "~" },
  { id: "summary", label: "summary" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
]

export function Nav() {
  const [active, setActive] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current?.disconnect()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    observerRef.current = obs
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled
        ? "border-b border-border bg-background/90 backdrop-blur-sm"
        : "bg-transparent"
        }`}
    >
      <nav className="max-w-4xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
        <img src={strawhatLogo} alt="logo" className="mr-2 w-12 h-12" />

        <div className="hidden sm:flex items-center gap-4 font-mono text-xs">
          {SECTIONS.filter((s) => s.id !== "hero").map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`transition-colors duration-150 hover:text-foreground text-sm ${active === s.id ? "font-medium text-[var(--cli-orange)]" : "text-muted-foreground"
                }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="shrink-0 font-mono text-sm gap-1.5 text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? "☀" : "⏾"}
              <span className="hidden sm:inline text-sm">{theme === "dark" ? "light" : "dark"}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="font-mono text-xs">
            Switch to {theme === "dark" ? "light" : "dark"} mode · or press D
          </TooltipContent>
        </Tooltip>
      </nav>
    </header>
  )
}
