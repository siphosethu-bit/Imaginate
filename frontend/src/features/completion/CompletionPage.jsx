import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, RotateCcw } from 'lucide-react'
import { Button } from '../../components/ui/Button.jsx'
import { Card } from '../../components/ui/Card.jsx'

const particles = ['bg-sky-300', 'bg-yellow-300', 'bg-coral', 'bg-mint', 'bg-lavender']

export function CompletionPage({ appState }) {
  const shapesLearned = appState.lessonProgress.learnedShapes.length || 4
  const activitiesCompleted = appState.lessonProgress.completedActivities || 4

  return (
    <section className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-8 text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((color, index) => (
          <motion.span
            key={color}
            className={`absolute h-10 w-10 rounded-[0.8rem] ${color} shadow-soft`}
            style={{ left: `${12 + index * 18}%`, top: `${12 + (index % 2) * 12}%` }}
            animate={{ y: [0, -24, 0], rotate: [0, 18, 0] }}
            transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <Card className="relative space-y-7 p-8 sm:p-10">
        <div>
          <p className="text-sm font-black uppercase text-coral">Lesson complete</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">You completed your first shapes lesson.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-semibold leading-relaxed text-navy/70">
            Your teacher is proud of your learning today.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <SummaryItem label="Shapes learned" value={shapesLearned} />
          <SummaryItem label="Activities completed" value={activitiesCompleted} />
          <SummaryItem label="Language" value={appState.selectedLanguage.name} />
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button as={Link} to="/lesson" variant="coral">
            <RotateCcw size={20} aria-hidden="true" />
            Try again
          </Button>
          <Button as={Link} to="/" variant="secondary">
            <Home size={20} aria-hidden="true" />
            Back home
          </Button>
        </div>
      </Card>
    </section>
  )
}

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-[1.4rem] bg-cream p-5 shadow-inner-soft">
      <p className="text-sm font-black uppercase text-navy/45">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  )
}
