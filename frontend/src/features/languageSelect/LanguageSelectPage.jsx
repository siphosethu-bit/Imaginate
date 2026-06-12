import { useNavigate } from 'react-router-dom'
import { Check, Languages } from 'lucide-react'
import clsx from 'clsx'
import { Button } from '../../components/ui/Button.jsx'
import { Card } from '../../components/ui/Card.jsx'

const languages = [
  { name: 'English', description: 'Start with English audio' },
  { name: 'isiZulu', description: 'Coming with local voice support' },
  { name: 'Sesotho', description: 'Coming with local voice support' },
  { name: 'South African Sign Language sample', description: 'Video overlay sample' },
]

export function LanguageSelectPage({ appState }) {
  const navigate = useNavigate()

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-7 py-6">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase text-coral">Choose a language</p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">Pick how your teacher will speak.</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {languages.map((language, index) => {
          const isSelected = appState.selectedLanguage.name === language.name
          return (
            <Card key={language.name} delay={index * 0.06} className="p-0">
              <button
                type="button"
                onClick={() => appState.setSelectedLanguage(language)}
                className={clsx(
                  'flex min-h-40 w-full items-center gap-5 rounded-[1.75rem] p-6 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral',
                  isSelected ? 'bg-navy text-white shadow-navy' : 'bg-white/35 hover:bg-white/80',
                )}
              >
                <span className={clsx('grid h-14 w-14 shrink-0 place-items-center rounded-[1.1rem]', isSelected ? 'bg-white text-navy' : 'bg-sky-100 text-coral')}>
                  {isSelected ? <Check size={26} aria-hidden="true" /> : <Languages size={26} aria-hidden="true" />}
                </span>
                <span>
                  <span className="block text-2xl font-black">{language.name}</span>
                  <span className={clsx('mt-2 block font-bold', isSelected ? 'text-white/75' : 'text-navy/60')}>
                    {language.description}
                  </span>
                </span>
              </button>
            </Card>
          )
        })}
      </div>
      <div className="flex justify-end">
        <Button variant="coral" onClick={() => navigate('/lesson')}>
          Continue to lesson
        </Button>
      </div>
    </section>
  )
}
