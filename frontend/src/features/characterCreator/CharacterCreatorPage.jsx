import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageUp, Paintbrush, WandSparkles } from 'lucide-react'
import { Button } from '../../components/ui/Button.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { TeacherAvatar } from '../lessonPlayer/TeacherAvatar.jsx'

export function CharacterCreatorPage({ appState }) {
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  function handleUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => appState.setTeacherImage(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <section className="grid flex-1 items-center gap-6 py-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-5">
        <p className="text-sm font-black uppercase text-coral">Create your teacher</p>
        <h1 className="text-4xl font-black leading-tight sm:text-6xl">Make a guide that feels like yours.</h1>
        <p className="max-w-2xl text-xl font-semibold leading-relaxed text-navy/70">
          Upload a drawing now, or use the polished placeholder teacher for this MVP lesson.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-5">
            <ImageUp className="mb-4 text-coral" size={30} aria-hidden="true" />
            <h2 className="text-2xl font-black">Upload drawing</h2>
            <p className="mt-2 font-semibold text-navy/65">Choose a teacher drawing from this device.</p>
            <Button className="mt-5 w-full" variant="secondary" onClick={() => fileInputRef.current?.click()}>
              Choose image
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </Card>
          <Card className="p-5">
            <Paintbrush className="mb-4 text-coral" size={30} aria-hidden="true" />
            <h2 className="text-2xl font-black">Draw on app</h2>
            <p className="mt-2 font-semibold text-navy/65">A drawing canvas will come next. Start with the sample today.</p>
            <Button className="mt-5 w-full" variant="mint" onClick={() => appState.setTeacherImage('')}>
              Use sample
            </Button>
          </Card>
        </div>
      </div>
      <Card className="space-y-6 p-7 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-[1.2rem] bg-yellow-200 text-navy shadow-soft">
          <WandSparkles size={26} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-3xl font-black">Preview teacher area</h2>
          <p className="mt-2 font-semibold text-navy/65">This character will guide the shapes lesson.</p>
        </div>
        <TeacherAvatar image={appState.teacherImage} />
        <Button className="w-full" variant="coral" onClick={() => navigate('/language')}>
          Use this teacher
        </Button>
      </Card>
    </section>
  )
}
