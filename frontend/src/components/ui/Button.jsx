import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const variants = {
  primary: 'bg-navy text-white shadow-navy hover:bg-[#142345]',
  secondary: 'border border-navy/10 bg-white/80 text-navy shadow-soft hover:bg-white',
  coral: 'bg-coral text-white shadow-coral hover:bg-[#e6685d]',
  mint: 'bg-mint text-navy shadow-soft hover:bg-[#9fe9ca]',
}

const MotionButton = motion.button
const MotionLink = motion.create(Link)

export function Button({ as = 'button', className, variant = 'primary', children, ...props }) {
  const MotionComponent = props.to || as !== 'button' ? MotionLink : MotionButton

  return (
    <MotionComponent
      type={props.to ? undefined : props.type || 'button'}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ y: 1, scale: 0.98 }}
      className={clsx(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-[1.2rem] px-6 py-3 text-base font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}
