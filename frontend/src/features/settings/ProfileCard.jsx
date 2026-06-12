import { Sparkles } from 'lucide-react'
import { SettingsSection } from './SettingsSection.jsx'
import { TeacherAvatar } from '../lessonPlayer/TeacherAvatar.jsx'

export function ProfileCard({ teacherImage, language }) {
  return (
    <SettingsSection
      title="testingName's learning profile"
      description="A friendly snapshot of this learner's Grade 1 shapes world."
      className="lg:col-span-2"
    >
      <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
        <div className="rounded-[1.5rem] bg-gradient-to-b from-sky-100 to-lavender/70 p-5 text-center shadow-soft">
          {teacherImage ? (
            <TeacherAvatar image={teacherImage} compact />
          ) : (
            <div className="mx-auto grid h-28 w-28 place-items-center rounded-[1.5rem] bg-navy text-cream shadow-navy">
              <Sparkles size={44} aria-hidden="true" />
            </div>
          )}
          <p className="mt-4 text-sm font-black text-navy/58">Learning guide</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ProfileFact label="Learner name" value="testingName" />
          <ProfileFact label="Grade" value="Grade 1" />
          <ProfileFact label="Current lesson" value="Shapes" />
          <ProfileFact label="Learning guide" value="My drawn teacher" />
          <ProfileFact label="Language" value={language || 'English'} />
        </div>
      </div>
    </SettingsSection>
  )
}

function ProfileFact({ label, value }) {
  return (
    <div className="rounded-[1.25rem] bg-cream/85 p-4 shadow-inner-soft">
      <p className="text-sm font-black text-navy/45">{label}</p>
      <p className="mt-1 text-xl font-black text-navy">{value}</p>
    </div>
  )
}
