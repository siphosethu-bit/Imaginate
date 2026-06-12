import clsx from 'clsx'

export function ShapeTile({ shape, disabled }) {
  return (
    <button
      type="button"
      draggable={!disabled}
      disabled={disabled}
      onDragStart={(event) => event.dataTransfer.setData('shapeId', shape.id)}
      className="group flex min-h-36 flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-white/80 bg-white/80 p-4 shadow-soft transition hover:-translate-y-1 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral disabled:cursor-not-allowed disabled:opacity-45"
      aria-label={`Drag ${shape.name}`}
    >
      <ShapeVisual id={shape.id} className="h-16 w-20 transition group-hover:scale-105" />
      <span className="text-lg font-black">{shape.name}</span>
    </button>
  )
}

export function ShapeVisual({ id, className }) {
  if (id === 'circle') {
    return <span className={clsx('block rounded-full bg-sky-300 shadow-soft', className)} />
  }

  if (id === 'square') {
    return <span className={clsx('block aspect-square rounded-[1rem] bg-yellow-300 shadow-soft', className)} />
  }

  if (id === 'triangle') {
    return <span className={clsx('triangle-solid block text-coral', className)} />
  }

  return <span className={clsx('block rounded-[1rem] bg-mint shadow-soft', className)} />
}
