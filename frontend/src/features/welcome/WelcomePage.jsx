import { Link } from 'react-router-dom'
import { BookOpen, Languages, Palette, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { TeacherAvatar } from '../lessonPlayer/TeacherAvatar.jsx'

const features = [
  { title: 'Create your teacher', text: 'Upload a drawing or start with a friendly guide.', icon: Palette },
  { title: 'Choose your language', text: 'Begin in English and preview local language support.', icon: Languages },
  { title: 'Play a shapes lesson', text: 'Match circles, squares, triangles and rectangles.', icon: BookOpen },
]

export function WelcomePage() {
  return (
    <section className="grid flex-1 items-center gap-8 py-6 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-black uppercase text-coral">Premium Grade 1 maths</p>
          <h1 className="text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
            Draw your teacher. Learn with your creation.
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-navy/70">
            A playful Grade 1 maths lesson where your own character guides you through shapes.
          </p>
        </motion.div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button as={Link} to="/create-teacher" variant="coral">
            <Play size={20} aria-hidden="true" />
            Start learning
          </Button>
          <Button as={Link} to="/lesson" variant="secondary">
            Preview lesson
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} delay={0.1 + index * 0.08} className="p-5">
                <Icon className="mb-5 text-coral" size={28} aria-hidden="true" />
                <h2 className="text-xl font-black">{feature.title}</h2>
                <p className="mt-2 text-sm font-bold leading-relaxed text-navy/60">{feature.text}</p>
              </Card>
            )
          })}
        </div>
      </div>
      <Card className="relative mx-auto w-full max-w-md overflow-hidden p-7">
        <div className="absolute right-6 top-7 h-20 w-20 rounded-full bg-yellow-200/80" />
        <div className="absolute bottom-12 left-8 h-16 w-24 rounded-[1.2rem] bg-mint/70" />
        <div className="relative space-y-5 text-center">
          <p className="text-sm font-black uppercase text-navy/50">Your learning guide</p>
          <TeacherAvatar />
          <div className="rounded-[1.25rem] bg-white/70 p-4 text-left shadow-soft">
            <p className="text-lg font-black">Ready for shapes</p>
            <p className="mt-1 font-semibold text-navy/65">A warm, focused first lesson for early maths confidence.</p>
          </div>
        </div>
      </Card>
    </section>
  )
}
