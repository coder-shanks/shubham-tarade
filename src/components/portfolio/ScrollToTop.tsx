import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { FaArrowUp } from "react-icons/fa6"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 z-50 p-2.5 rounded-full border border-border bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-200 shadow-md"
              aria-label="Back to top"
            >
              <FaArrowUp className="h-6 w-6" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={10}>
            Scroll to top
          </TooltipContent>
        </Tooltip>
      )}
    </AnimatePresence>
  )
}