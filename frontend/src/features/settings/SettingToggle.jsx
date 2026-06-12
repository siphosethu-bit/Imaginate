import { motion } from 'framer-motion'
import clsx from 'clsx'

export function SettingToggle({ label, description, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-[1.25rem] bg-cream/80 p-4 text-left shadow-inner-soft transition hover:bg-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
      aria-pressed={checked}
    >
      <span>
        <span className="block text-lg font-black text-navy">{label}</span>
        <span className="mt-1 block text-sm font-bold leading-relaxed text-navy/58">{description}</span>
      </span>
      <span
        className={clsx(
          'relative h-8 w-14 shrink-0 rounded-full p-1 transition',
          checked ? 'bg-navy' : 'bg-navy/14',
        )}
      >
        <motion.span
          className={clsx('block h-6 w-6 rounded-full shadow-soft', checked ? 'bg-mint' : 'bg-white')}
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        />
      </span>
    </button>
  )
}
