interface SectionCommandProps {
  command: string
  className?: string
}

export function SectionCommand({ command, className = "" }: SectionCommandProps) {
  return (
    <div className={`flex items-center gap-2 font-mono text-base mb-8 ${className}`}>
      <span style={{ color: "var(--cli-prompt)" }}>❯</span>
      <span className="text-muted-foreground">$</span>
      <span className="text-foreground/80">{command}</span>
      <span className="inline-block w-2 h-5 align-middle ml-0.5" style={{ backgroundColor: "var(--cli-orange)", animation: "blink 1.1s step-start infinite" }} />
    </div>
  )
}
