import { Card, CardContent } from "@/components/ui/card"
import { resume } from "@/lib/resume"

export function Summary() {
  return (
    <section id="summary" className="px-6 max-w-5xl mx-auto py-16">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Summary</h2>
        <p className="text-base text-muted-foreground mt-2 max-w-3xl">
          A concise overview of experience, impact, and technical focus.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {resume.highlights.map((h) => (
          <Card
            key={h.label}
            className="border-border text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-primary/15"
          >
            <CardContent className="p-6">
              <p className="text-xl font-bold mb-1" style={{ color: "var(--cli-orange)" }}>
                {h.value}
              </p>
              <p className="text-sm text-muted-foreground">{h.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="p-6">
          <ul className="space-y-2">
            {resume.summary.map((point, i) => (
              <li key={i} className="flex gap-3 text-base text-foreground/90 leading-relaxed">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
