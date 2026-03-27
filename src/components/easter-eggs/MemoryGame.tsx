import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { ParticleEffect } from './ParticleEffect'

interface Card {
  id: number
  emoji: string
  matched: boolean
}

const CARD_EMOJIS = ['🎮', '🎯', '🎪', '🎨', '🎭', '🎲', '🎸', '🎬']

export function MemoryGame({ isActive, onClose }: { isActive: boolean; onClose: () => void }) {
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matches, setMatches] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameWon, setGameWon] = useState(false)
  const [confettiBurstKey, setConfettiBurstKey] = useState(0)
  const gameBoardRef = useRef<HTMLDivElement>(null)

  // Initialize game
  useEffect(() => {
    if (isActive) {
      initializeGame()
    }
  }, [isActive])

  const initializeGame = () => {
    const shuffled = [...CARD_EMOJIS, ...CARD_EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, matched: false }))
    setCards(shuffled)
    setFlipped([])
    setMatches(0)
    setMoves(0)
    setGameWon(false)
  }

  // Check for matches
  useEffect(() => {
    if (flipped.length !== 2) return

    const [first, second] = flipped
    const firstCard = cards[first]
    const secondCard = cards[second]

    if (firstCard.emoji === secondCard.emoji) {
      // Match found
      setCards((prev) =>
        prev.map((card) =>
          card.id === first || card.id === second ? { ...card, matched: true } : card
        )
      )
      setMatches((prev) => prev + 1)
      setFlipped([])

      // Check win condition
      if (matches + 1 === CARD_EMOJIS.length) {
        setGameWon(true)
        // Trigger confetti burst from game board center
        if (gameBoardRef.current) {
          // Use a key to trigger particle re-render
          setConfettiBurstKey((prev) => prev + 1)
        }
      }
    } else {
      // No match, flip back
      setTimeout(() => setFlipped([]), 600)
    }

    setMoves((prev) => prev + 1)
  }, [flipped, cards, matches])

  const handleCardClick = (id: number) => {
    if (flipped.includes(id) || cards[id].matched || flipped.length === 2 || gameWon) return
    setFlipped((prev) => [...prev, id])
  }

  const isFlipped = (id: number) => flipped.includes(id) || cards[id].matched

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-background border-2 border-primary rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary">MEMORY GAME</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>

            {/* Stats */}
            <div className="flex justify-between gap-4 mb-6 text-sm font-mono">
              <div className="flex-1 text-center">
                <div className="text-primary font-bold">{matches}</div>
                <div className="text-muted-foreground text-xs">PAIRS</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-primary font-bold">{moves}</div>
                <div className="text-muted-foreground text-xs">MOVES</div>
              </div>
            </div>

            {/* Game Board */}
            <div ref={gameBoardRef} className="grid grid-cols-4 gap-2 mb-6">
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className="relative w-full aspect-square rounded-lg font-2xl font-bold transition-all"
                  whileHover={!isFlipped(card.id) ? { scale: 1.05 } : {}}
                  whileTap={!isFlipped(card.id) ? { scale: 0.95 } : {}}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotateY: isFlipped(card.id) ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {isFlipped(card.id) ? (
                      <div className="absolute inset-0 bg-primary rounded-lg flex items-center justify-center text-background">
                        {card.emoji}
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-card border-2 border-primary/30 rounded-lg flex items-center justify-center text-2xl hover:bg-muted/50 transition-colors">
                        ?
                      </div>
                    )}
                  </motion.div>
                </motion.button>
              ))}
            </div>

            {/* Win State */}
            {gameWon && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-4 p-4 bg-primary/10 border border-primary/30 rounded-lg"
              >
                <p className="text-2xl font-bold text-primary mb-2">🎉 YOU WIN!</p>
                <p className="text-sm font-mono text-muted-foreground">
                  Completed in {moves} moves
                </p>
              </motion.div>
            )}

            <Button
              onClick={initializeGame}
              className="w-full font-mono"
              variant={gameWon ? 'default' : 'outline'}
            >
              {gameWon ? 'PLAY AGAIN' : 'NEW GAME'}
            </Button>

            <div className="text-center text-xs text-muted-foreground font-mono mt-4">
              Press 'G' three times to toggle
            </div>
          </motion.div>
        </motion.div>
      )}
      {gameWon && gameBoardRef.current && (
        <ParticleEffect
          x={gameBoardRef.current.getBoundingClientRect().left + gameBoardRef.current.getBoundingClientRect().width / 2}
          y={gameBoardRef.current.getBoundingClientRect().top + gameBoardRef.current.getBoundingClientRect().height / 2}
          burstKey={confettiBurstKey}
        />
      )}
    </AnimatePresence>
  )
}
