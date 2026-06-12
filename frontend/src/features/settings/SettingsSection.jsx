import { motion } from 'framer-motion'
import clsx from 'clsx'

export function SettingsSection({ title, description, children, className, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={clsx('rounded-[1.75rem] border border-white/75 bg-white/78 p-6 shadow-card backdrop-blur-md', className)}
    >
      <div className="mb-5">
        <h2 className="text-2xl font-black text-navy">{title}</h2>
        <p className="mt-2 font-bold leading-relaxed text-navy/62">{description}</p>
      </div>
      {children}
    </motion.section>
  )
}
