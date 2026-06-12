import clsx from 'clsx'

export function LanguagePreferenceCard({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(label)}
      className={clsx(
        'min-h-16 rounded-[1.15rem] border px-4 py-3 text-left font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral',
        selected
          ? 'border-navy bg-navy text-white shadow-navy'
          : 'border-white/80 bg-cream/80 text-navy hover:bg-white',
      )}
    >
      {label}
    </button>
  )
}
