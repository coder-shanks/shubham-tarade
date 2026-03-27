import { Nav } from "@/components/portfolio/Nav"
import { Hero } from "@/components/portfolio/Hero"
import { Summary } from "@/components/portfolio/Summary"
import { Skills } from "@/components/portfolio/Skills"
import { Experience } from "@/components/portfolio/Experience"
import { ScrollToTop } from "@/components/portfolio/ScrollToTop"

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div>
        <Nav />
        <main>
          <Hero />
          <Summary />
          <Skills />
          <Experience />
        </main>
      </div>
      <ScrollToTop />
    </div>
  )
}

export default App

