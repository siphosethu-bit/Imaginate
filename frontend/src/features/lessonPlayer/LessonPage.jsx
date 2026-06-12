import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { grade1ShapesLesson } from '../../data/lessons/grade1Shapes.js'
import { ShapeDragGame } from '../shapeGame/ShapeDragGame.jsx'
import { LessonCard } from './LessonCard.jsx'
import { TeacherAvatar } from './TeacherAvatar.jsx'

export function LessonPage({ appState }) {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [teacherLine, setTeacherLine] = useState(grade1ShapesLesson.steps[0].teacherLine)
  const step = grade1ShapesLesson.steps[stepIndex]

  const handleComplete = useCallback(
    (learnedShapes) => {
      appState.setLessonProgress({
        completedActivities: learnedShapes.length,
        learnedShapes,
      })
      setStepIndex(3)
      setTeacherLine('You completed the shapes lesson. I am proud of your learning today.')
      window.setTimeout(() => navigate('/complete'), 700)
    },
    [appState, navigate],
  )

  function nextStep() {
    const next = Math.min(stepIndex + 1, 2)
    setStepIndex(next)
    setTeacherLine(grade1ShapesLesson.steps[next].teacherLine)
  }

  return (
    <section className="grid flex-1 gap-6 py-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <Card className="text-center">
          <TeacherAvatar image={appState.teacherImage} compact />
          <div className="mt-5 rounded-[1.25rem] bg-white/75 p-4 text-left shadow-soft">
            <p className="text-sm font-black uppercase text-coral">Teacher says</p>
            <p className="mt-2 text-lg font-black leading-snug">{teacherLine}</p>
          </div>
        </Card>
      </aside>
      <div className="space-y-5">
        <LessonCard
          step={step}
          index={stepIndex}
          total={grade1ShapesLesson.steps.length}
          language={appState.selectedLanguage.name}
        />
        <Card>
          {stepIndex < 2 ? (
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div className="grid gap-3 sm:grid-cols-2">
                {grade1ShapesLesson.shapes.map((shape) => (
                  <div key={shape.id} className="rounded-[1.4rem] bg-cream p-5 shadow-inner-soft">
                    <p className="text-2xl font-black">{shape.name}</p>
                    <p className="mt-2 font-semibold text-navy/65">{shape.clue}</p>
                  </div>
                ))}
              </div>
              <Button variant="coral" onClick={nextStep}>
                {stepIndex === 0 ? 'Meet the shapes' : 'Play game'}
              </Button>
            </div>
          ) : (
            <ShapeDragGame
              lesson={grade1ShapesLesson}
              onTeacherLine={setTeacherLine}
              onComplete={handleComplete}
            />
          )}
        </Card>
      </div>
    </section>
  )
}
