import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ShapeVisual } from './ShapeTile.jsx'

export function DropZone({ target, status, onDropShape }) {
  function handleDrop(event) {
    event.preventDefault()
    onDropShape(event.dataTransfer.getData('shapeId'))
  }

  return (
    <motion.div
      animate={status === 'wrong' ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className={clsx(
        'grid min-h-64 place-items-center rounded-[2rem] border-4 border-dashed p-6 text-center transition',
        status === 'success' ? 'border-mint bg-mint/25' : 'border-sky-200 bg-white/55',
        status === 'wrong' && 'border-coral bg-coral/10',
      )}
      aria-label={`Drop zone for ${target.name}`}
    >
      <div className="space-y-4">
        <div className="mx-auto grid h-32 w-40 place-items-center rounded-[1.5rem] bg-cream shadow-inner-soft">
          {status === 'success' ? (
            <ShapeVisual id={target.id} className="h-20 w-24" />
          ) : (
            <span className="text-lg font-black text-navy/45">Magic frame</span>
          )}
        </div>
        <p className="text-xl font-black">Drop the {target.name.toLowerCase()} here</p>
      </div>
    </motion.div>
  )
}
