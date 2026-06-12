import clsx from 'clsx'

export function ProgressDots({ total, active }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${active + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={clsx(
            'h-3 rounded-full transition-all',
            index <= active ? 'w-8 bg-coral' : 'w-3 bg-navy/15',
          )}
        />
      ))}
    </div>
  )
}
