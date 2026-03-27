import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Timeline } from "@/components/ui/timeline"
import { resume } from "@/lib/resume"

export function Experience() {
  const timelineData = resume.experience.map((job) => ({
    title: job.period,
    content: (
      <Card className="relative overflow-hidden border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-primary/15">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-semibold text-base" style={{ color: "var(--cli-orange)" }}>
                  {job.title}
                </span>
                {job.current && (
                  <Badge variant="default" className="text-xs px-1.5 py-0 font-mono">
                    current
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mt-1 font-mono">{job.company}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 border-t border-border">
          <ul className="space-y-2.5 mt-4 font-mono">
            {job.bullets.map((b, bulletIndex) => (
              <li
                key={`${job.company}-${bulletIndex}`}
                className="flex gap-2.5 text-base leading-relaxed text-foreground/80"
              >
                <span
                  style={{ color: "var(--cli-prompt)" }}
                  className="shrink-0 mt-0.5 text-sm"
                >
                  ›
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {!!job.achievements?.length && (
            <div className="mt-5 border-t border-border/70 pt-4 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Recognitions</p>
              {job.achievements.map((award) => (
                <div
                  key={`${job.company}-${award.title}`}
                  className="group relative overflow-hidden rounded-lg border border-primary/25 bg-gradient-to-r from-primary/12 via-primary/5 to-transparent px-3.5 py-2.5"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary/70" />
                  <div className="flex items-start justify-between gap-3 pl-2">
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      <span className="mr-1.5" role="img" aria-label="trophy">🏆</span>
                      <span className="font-semibold" style={{ color: "var(--cli-orange)" }}>{award.title}</span>
                      <span className="text-foreground/75"> - {award.description}</span>
                    </p>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs font-bold px-2 shrink-0 border-primary/40 bg-background/60"
                      style={{ color: "var(--cli-orange)" }}
                    >
                      {award.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    ),
  }))

  return (
    <section id="experience" className="px-6 max-w-5xl mx-auto py-16">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Experience</h2>
        <p className="text-base text-muted-foreground mt-2 max-w-3xl">
          Roles, outcomes and recognition across full-stack product development.
        </p>
      </div>

      <Timeline data={timelineData} className="font-mono" />
    </section>
  )
}
