import { Card } from '../../components/ui/Card.jsx'
import { ProgressDots } from '../../components/ui/ProgressDots.jsx'

export function LessonCard({ step, index, total, language }) {
  return (
    <Card className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ProgressDots total={total} active={index} />
        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-black text-navy/75">
          {language}
        </span>
      </div>
      <div>
        <p className="text-sm font-black uppercase text-coral">Shape lesson</p>
        <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">{step.title}</h1>
      </div>
      <p className="text-xl font-bold leading-relaxed text-navy/75">{step.instruction}</p>
      <div className="rounded-[1.25rem] bg-sky-100/80 p-4 text-lg font-extrabold text-navy">
        Teacher says: {step.teacherLine}
      </div>
    </Card>
  )
}
