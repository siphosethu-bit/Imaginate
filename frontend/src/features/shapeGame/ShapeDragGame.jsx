import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button.jsx'
import { DropZone } from './DropZone.jsx'
import { ShapeTile } from './ShapeTile.jsx'

export function ShapeDragGame({ lesson, onTeacherLine, onComplete }) {
  const [targetIndex, setTargetIndex] = useState(0)
  const [status, setStatus] = useState('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [matchedIds, setMatchedIds] = useState([])

  const target = lesson.shapes[targetIndex]
  const isComplete = matchedIds.length === lesson.shapes.length

  const orderedShapes = useMemo(
    () => [...lesson.shapes].sort((a, b) => a.name.localeCompare(b.name)),
    [lesson.shapes],
  )
  const instruction = feedbackMessage || `Drag the ${target?.name.toLowerCase()} into the magic frame.`

  function handleDropShape(shapeId) {
    if (!target || isComplete) return

    if (shapeId === target.id) {
      setStatus('success')
      setFeedbackMessage(target.success)
      onTeacherLine(target.success)
      setMatchedIds((current) => [...current, target.id])

      window.setTimeout(() => {
        if (targetIndex + 1 < lesson.shapes.length) {
          const nextTarget = lesson.shapes[targetIndex + 1]
          setTargetIndex((index) => index + 1)
          setFeedbackMessage('')
          setStatus('idle')
          onTeacherLine(`Find the ${nextTarget.name.toLowerCase()}. ${nextTarget.clue}`)
        } else {
          onComplete(lesson.shapes.map((shape) => shape.name))
        }
      }, 950)
      return
    }

    setStatus('wrong')
    setFeedbackMessage(`Good try. ${target.clue}`)
    onTeacherLine(`Good try. ${target.clue}`)
    window.setTimeout(() => {
      setStatus('idle')
      setFeedbackMessage('')
    }, 650)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase text-coral">Shape game</p>
          <h2 className="mt-1 text-2xl font-black">{instruction}</h2>
        </div>
        <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-black text-navy/65 shadow-soft">
          {matchedIds.length} of {lesson.shapes.length} matched
        </span>
      </div>

      {target && <DropZone target={target} status={status} onDropShape={handleDropShape} />}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {orderedShapes.map((shape) => (
          <ShapeTile key={shape.id} shape={shape} disabled={matchedIds.includes(shape.id) || isComplete} />
        ))}
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="rounded-[1.5rem] bg-mint/30 p-4 text-center text-xl font-black text-navy"
          >
            Wonderful work. You matched the shape.
          </motion.div>
        )}
      </AnimatePresence>

      {isComplete && (
        <div className="text-right">
          <Button variant="coral" onClick={() => onComplete(lesson.shapes.map((shape) => shape.name))}>
            Finish lesson
          </Button>
        </div>
      )}
    </div>
  )
}
