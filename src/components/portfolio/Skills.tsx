import { motion } from "motion/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  FaAngular,
  FaAws,
  FaBootstrap,
  FaCloud,
  FaCode,
  FaDatabase,
  FaDiagramProject,
  FaFlask,
  FaGears,
  FaGitlab,
  FaGoogle,
  FaJs,
  FaMobileScreenButton,
  FaNodeJs,
  FaPalette,
  FaReact,
  FaServer,
} from "react-icons/fa6"
import { resume } from "@/lib/resume"

// Icon mapping for technologies
const TECH_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  ReactJS: FaReact,
  "Next.js": FaCode,
  Angular: FaAngular,
  TypeScript: FaCode,
  JavaScript: FaJs,
  "Express.js": FaNodeJs,
  GraphQL: FaDiagramProject,
  "C# (.NET Core)": FaCode,
  "REST APIs": FaServer,
  "Material UI": FaPalette,
  "Tailwind CSS": FaPalette,
  "Shadcn/ui": FaPalette,
  "Chakra UI": FaPalette,
  Bootstrap: FaBootstrap,
  "Semantic UI": FaPalette,
  Ionic: FaMobileScreenButton,
  "React Native": FaReact,
  Jest: FaFlask,
  Cypress: FaFlask,
  NUnit: FaFlask,
  SpecFlow: FaFlask,
  ReportPortal: FaFlask,
  "GitHub Actions": FaGears,
  "GitLab CI": FaGitlab,
  Jenkins: FaGears,
  UCD: FaGears,
  GCP: FaGoogle,
  AWS: FaAws,
  PostgreSQL: FaDatabase,
  "Microsoft SQL Server": FaDatabase,
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: FaCode,
  Backend: FaServer,
  "UI & Styling": FaPalette,
  Mobile: FaMobileScreenButton,
  Testing: FaFlask,
  "DevOps & CI/CD": FaGears,
  Cloud: FaCloud,
  Databases: FaDatabase,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

const techVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
}

export function Skills() {
  return (
    <section id="skills" className="px-6 max-w-5xl mx-auto py-10">
      <div className="mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Core Skills</h2>
        <p className="text-base text-muted-foreground mt-2 max-w-3xl">
          Proficient across modern frontend frameworks, backend technologies, testing and cloud infrastructure.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {resume.skills.map(({ category, technologies }) => {
          const CategoryIcon = CATEGORY_ICONS[category]
          return (
            <motion.div key={category} variants={itemVariants}>
              <Card className="border-border overflow-hidden h-full transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-primary/15">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center gap-2">
                    {CategoryIcon && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="p-1.5 rounded-md"
                        style={{
                          background: "linear-gradient(135deg, var(--cli-orange) 0%, color-mix(in oklch, var(--cli-orange) 60%, transparent) 100%)",
                        }}
                      >
                        <CategoryIcon className="h-4 w-4 text-white" />
                      </motion.div>
                    )}
                    <h3 className="font-semibold text-base" style={{ color: "var(--cli-orange)" }}>
                      {category}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((skill, skillIdx) => {
                      const TechIcon = TECH_ICONS[skill]
                      return (
                        <motion.div
                          key={skill}
                          variants={techVariants}
                          custom={skillIdx}
                          transition={{ delay: skillIdx * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/40 border border-border/50 hover:border-primary/50 transition-colors duration-200 cursor-default"
                        >
                          {TechIcon && (
                            <TechIcon
                              className="h-4 w-4 shrink-0"
                            />
                          )}
                          <span className="text-sm font-mono text-foreground/80">{skill}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
