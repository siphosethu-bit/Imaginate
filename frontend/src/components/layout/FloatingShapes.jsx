import { motion } from 'framer-motion'
import clsx from 'clsx'

const shapes = [
  { type: 'circle', className: 'left-[5%] top-[16%] bg-sky-200/75', size: 72 },
  { type: 'square', className: 'right-[8%] top-[18%] bg-yellow-200/80', size: 64 },
  { type: 'triangle', className: 'left-[12%] bottom-[18%] text-coral/35', size: 84 },
  { type: 'rect', className: 'right-[14%] bottom-[16%] bg-mint/55', size: 90 },
  { type: 'circle', className: 'left-[48%] top-[7%] bg-lavender/45', size: 52 },
]

export function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-coral/20 blur-3xl" />
      {shapes.map((shape, index) => (
        <motion.div
          key={`${shape.type}-${index}`}
          className={clsx('absolute drop-shadow-sm', shape.className)}
          style={{ width: shape.size, height: shape.size }}
          animate={{ y: [0, -16, 0], rotate: [0, index % 2 ? -5 : 6, 0] }}
          transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
        >
          {shape.type === 'triangle' ? (
            <div className="triangle-shape h-full w-full" />
          ) : (
            <div
              className={clsx(
                'h-full w-full border border-white/70 shadow-soft',
                shape.type === 'circle' && 'rounded-full',
                shape.type === 'square' && 'rounded-[1.4rem]',
                shape.type === 'rect' && 'h-[64%] rounded-[1.5rem]',
              )}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
