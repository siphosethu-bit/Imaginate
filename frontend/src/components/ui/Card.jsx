import { motion } from 'framer-motion'
import clsx from 'clsx'

export function Card({ children, className, delay = 0, ...props }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={clsx(
        'rounded-[1.75rem] border border-white/75 bg-white/78 p-6 shadow-card backdrop-blur-md',
        className,
      )}
      {...props}
    >
      {children}
    </motion.section>
  )
}
