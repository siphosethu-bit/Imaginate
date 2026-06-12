import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BarChart3, ShieldCheck, UserCog } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button.jsx'
import { LanguagePreferenceCard } from './LanguagePreferenceCard.jsx'
import { ProfileCard } from './ProfileCard.jsx'
import { SettingsSection } from './SettingsSection.jsx'
import { SettingToggle } from './SettingToggle.jsx'

const languages = ['English', 'isiZulu', 'Sesotho', 'South African Sign Language sample']
const paces = ['Gentle', 'Standard', 'Quick']
const motionLevels = ['Calm', 'Playful']

export function SettingsPage({ appState }) {
  const navigate = useNavigate()
  const [language, setLanguage] = useState(appState.selectedLanguage?.name || 'English')
  const [pace, setPace] = useState('Standard')
  const [motionLevel, setMotionLevel] = useState('Playful')
  const [sound, setSound] = useState(true)
  const [largeText, setLargeText] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [signLanguageSupport, setSignLanguageSupport] = useState(false)
  const [captions, setCaptions] = useState(true)
  const [notice, setNotice] = useState('')

  const completedActivities = appState.lessonProgress?.completedActivities || 0

  const languageOptions = useMemo(
    () =>
      languages.map((option) => (
        <LanguagePreferenceCard
          key={option}
          label={option}
          selected={language === option}
          onSelect={setLanguage}
        />
      )),
    [language],
  )

  function handleResetProgress() {
    appState.setLessonProgress?.({
      completedActivities: 0,
      learnedShapes: [],
    })
    setNotice('Progress has been reset for this demo.')
  }

  function handleComingSoon() {
    setNotice('Parent dashboard coming soon.')
  }

  function handleSignOut() {
    appState.onLogout?.()
    navigate('/')
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full py-6"
    >
      <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-black uppercase text-coral">Profile and settings</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-navy sm:text-6xl">
            Learning settings
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-semibold leading-relaxed text-navy/70">
            Personalise the lesson world for your learner.
          </p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/')}>
          <ArrowLeft size={20} aria-hidden="true" />
          Back to learning
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ProfileCard teacherImage={appState.teacherImage} language={language} />

        <SettingsSection
          title="Learning preferences"
          description="Choose how lessons feel, sound and move."
          delay={0.08}
        >
          <div className="space-y-5">
            <div>
              <p className="mb-3 text-sm font-black text-navy/55">Preferred language</p>
              <div className="grid gap-3 sm:grid-cols-2">{languageOptions}</div>
            </div>
            <SegmentedChoice label="Lesson pace" value={pace} options={paces} onChange={setPace} />
            <SegmentedChoice
              label="Motion level"
              value={motionLevel}
              options={motionLevels}
              onChange={setMotionLevel}
            />
            <SettingToggle
              label="Sound"
              description="Play warm lesson sounds and voice prompts."
              checked={sound}
              onChange={setSound}
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title="Accessibility and inclusion"
          description="Make learning easier to see, hear and follow."
          delay={0.14}
        >
          <div className="grid gap-3">
            <SettingToggle
              label="Large text"
              description="Increase lesson text size for easier reading."
              checked={largeText}
              onChange={setLargeText}
            />
            <SettingToggle
              label="High contrast"
              description="Use stronger contrast for key learning areas."
              checked={highContrast}
              onChange={setHighContrast}
            />
            <SettingToggle
              label="Sign language video support"
              description="Prepare lessons for a video support layer."
              checked={signLanguageSupport}
              onChange={setSignLanguageSupport}
            />
            <SettingToggle
              label="Captions"
              description="Show written guidance alongside audio."
              checked={captions}
              onChange={setCaptions}
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title="Parent or teacher area"
          description="A simple view for grown-ups helping the learner."
          delay={0.2}
        >
          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <SummaryBadge label="Shapes lesson progress" value="4 shapes planned" icon={BarChart3} />
            <SummaryBadge label="Completed activities" value={completedActivities} icon={UserCog} />
            <SummaryBadge label="Accuracy" value="Preview mode" icon={ShieldCheck} />
            <SummaryBadge label="Last active" value="Today" icon={BarChart3} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="coral" onClick={handleComingSoon}>View progress</Button>
            <Button variant="secondary" onClick={handleComingSoon}>Manage learner</Button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Safety and account"
          description="Manage this demo profile and test session."
          delay={0.26}
          className="lg:col-span-2"
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="grid gap-3 sm:grid-cols-2">
              <SummaryBadge label="Signed in as" value="testingName" icon={UserCog} />
              <SummaryBadge label="Mode" value="Test login" icon={ShieldCheck} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button variant="secondary" onClick={handleResetProgress}>Reset progress</Button>
              <Button variant="primary" onClick={handleSignOut}>Sign out</Button>
            </div>
          </div>
        </SettingsSection>
      </div>

      <div className="mt-5 min-h-12" aria-live="polite">
        {notice && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full bg-white/80 px-5 py-3 font-black text-navy shadow-soft"
          >
            {notice}
          </motion.p>
        )}
      </div>
    </motion.section>
  )
}

function SegmentedChoice({ label, value, options, onChange }) {
  return (
    <div>
      <p className="mb-3 text-sm font-black text-navy/55">{label}</p>
      <div className="grid gap-2 rounded-[1.25rem] bg-cream/75 p-2 shadow-inner-soft sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className="relative rounded-[1rem] px-4 py-3 text-sm font-black text-navy transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
          >
            {value === option && (
              <motion.span
                layoutId={`${label}-active-option`}
                className="absolute inset-0 rounded-[1rem] bg-white shadow-soft"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SummaryBadge({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.25rem] bg-cream/85 p-4 shadow-inner-soft">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[1rem] bg-sky-100 text-coral">
        <Icon size={21} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm font-black text-navy/45">{label}</span>
        <span className="mt-1 block text-lg font-black text-navy">{value}</span>
      </span>
    </div>
  )
}
