import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { useTypewriter } from "@/hooks/useTypewriter"
import { resume } from "@/lib/resume"
import { ParticleEffect } from "@/components/easter-eggs/ParticleEffect"

const BOOT_LINES = [
  { text: "8+ years across frontend, backend, testing and CI/CD." },
  { text: "Proven track record of scaling platforms and driving significant revenue growth." },
  { text: "Leveraging AI-assisted development to ship robust, scalable and secure code." },
]

const bootVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    }
  }
}

const bootLineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
}

export function Hero() {
  const email = resume.contact.email
  const [bootDone, setBootDone] = useState(false)
  const [copied, setCopied] = useState(false)
  const [nameClickCount, setNameClickCount] = useState(0)
  const [countPopKey, setCountPopKey] = useState(0)
  const [particleBurstKey, setParticleBurstKey] = useState(0)
  const [particlePos, setParticlePos] = useState<{ x: number; y: number } | null>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const { displayed, done } = useTypewriter(bootDone ? resume.profile.title : "", 50, 200)

  useEffect(() => {
    const timer = setTimeout(() => setBootDone(true), 1600)
    return () => clearTimeout(timer)
  }, [])

  function handleNameClick(e: React.MouseEvent<HTMLHeadingElement>) {
    setNameClickCount((prev) => prev + 1)
    setCountPopKey((prev) => prev + 1)
    setParticleBurstKey((prev) => prev + 1)
    const rect = nameRef.current?.getBoundingClientRect()
    if (rect) {
      // Spawn particles from the bottom-right of the name.
      setParticlePos({ x: rect.right + 6, y: rect.bottom + 6 })
    } else {
      setParticlePos({ x: e.clientX, y: e.clientY })
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText(email).catch(() => { })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center px-6 max-w-5xl mx-auto pt-16 relative"
    >
      <div className="border border-border rounded-lg overflow-hidden w-full">
        {/* Titlebar */}
        <div className="flex items-center gap-1.5 px-3.5 py-2 bg-muted border-b border-border">
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28ca42" }} />
          <span className="font-mono text-sm text-muted-foreground ml-2 select-none">
            shubham@portfolio — zsh
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-green-500/40 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to work
          </span>
        </div>

        {/* Body */}
        <div className="relative p-8 sm:p-12 font-mono space-y-5 min-h-80">
          {/* Dark mode scanline overlay */}
          <div className="dark:absolute dark:inset-0 dark:pointer-events-none dark:z-20 dark:rounded-none dark:bg-repeat opacity-0 dark:opacity-100" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.04) 2px, rgba(0, 0, 0, 0.04) 4px)"
          }} />
          {/* Boot sequence lines - animated with framer motion */}
          <motion.div
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={bootVariants}
          >
            {BOOT_LINES.map((line, i) => (
              <motion.p
                key={i}
                className="text-lg leading-relaxed"
                style={{ color: "var(--cli-dim)" }}
                variants={bootLineVariants}
              >
                {line.text}
              </motion.p>
            ))}
          </motion.div>

          {/* Main content fades in after boot */}
          {bootDone && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1
                  ref={nameRef}
                  className="text-6xl sm:text-7xl font-bold tracking-tight leading-none cursor-pointer hover:opacity-80 transition-opacity relative"
                  style={{ color: "var(--cli-orange)" }}
                  onClick={handleNameClick}
                  title={nameClickCount > 0 ? `Clicks: ${nameClickCount}` : "Click me!"}
                >
                  {resume.profile.name}
                  {nameClickCount > 0 && (
                    <motion.span
                      key={countPopKey}
                      className="absolute -top-8 -right-8 text-sm font-mono text-primary"
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.5 }}
                      transition={{ duration: 1 }}
                    >
                      +{nameClickCount}
                    </motion.span>
                  )}
                </h1>
                <div className="flex items-center mt-4 text-3xl sm:text-4xl text-foreground/75 font-medium">
                  <span>{displayed}</span>
                  {!done && (
                    <span
                      className="inline-block w-[0.55ch] h-[1.1em] ml-0.5 align-text-bottom"
                      style={{
                        backgroundColor: "var(--cli-orange)",
                        animation: "blink 1.1s step-start infinite",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="font-mono text-base gap-2 border-primary/50 hover:border-primary hover:text-primary transition-all"
                  onClick={copyEmail}
                >
                  {copied ? "✓ email copied!" : "@ copy email"}
                </Button>
                <Button
                  asChild
                  variant="default"
                  className="font-mono text-base gap-2"
                >
                  <a href={resume.driveLink} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                    view resume
                  </a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground flex items-center gap-3 pt-1">
                <span style={{ color: "var(--cli-dim)" }}>scroll ↓ to explore</span>
                <span className="opacity-40">·</span>
                <span style={{ color: "var(--cli-dim)" }}>
                  <kbd className="px-1.5 py-0.5 border border-border rounded text-xs font-mono">d</kbd>{" "}
                  toggle theme
                </span>
              </p>
            </motion.div>
          )}

          {!bootDone && (
            <span
              className="inline-block w-[0.55ch] h-[1.1em] align-text-bottom ml-0.5"
              style={{
                backgroundColor: "var(--cli-orange)",
                animation: "blink 1.1s step-start infinite",
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      {particlePos && <ParticleEffect x={particlePos.x} y={particlePos.y} burstKey={particleBurstKey} />}
    </section>
  )
}
