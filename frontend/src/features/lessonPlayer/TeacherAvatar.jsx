import { motion } from 'framer-motion'

export function TeacherAvatar({ image, compact = false }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={compact ? 'mx-auto w-28' : 'mx-auto w-44 sm:w-56'}
      aria-label="Your teacher avatar"
    >
      <div className="relative aspect-[4/5] rounded-[2rem] bg-gradient-to-b from-sky-100 to-lavender/70 p-3 shadow-card">
        {image ? (
          <img src={image} alt="Uploaded teacher" className="h-full w-full rounded-[1.5rem] object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-end rounded-[1.5rem] bg-cream">
            <div className="mb-2 h-20 w-20 rounded-full bg-coral/85 shadow-soft sm:h-24 sm:w-24" />
            <div className="h-24 w-32 rounded-t-[3rem] bg-mint shadow-soft sm:h-28 sm:w-40" />
            <div className="absolute left-1/2 top-[28%] h-4 w-4 -translate-x-7 rounded-full bg-navy" />
            <div className="absolute left-1/2 top-[28%] h-4 w-4 translate-x-3 rounded-full bg-navy" />
            <div className="absolute left-1/2 top-[38%] h-3 w-10 -translate-x-1/2 rounded-b-full border-b-4 border-navy/75" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
