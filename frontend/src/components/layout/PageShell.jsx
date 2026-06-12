import { FloatingShapes } from './FloatingShapes.jsx'
import { TopNav } from './TopNav.jsx'

export function PageShell({ children, onLogout }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[var(--color-cream)] text-[var(--color-navy)]">
      <FloatingShapes />
      <TopNav onLogout={onLogout} />
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl flex-col px-5 pb-8 pt-4 sm:px-8 lg:px-10">
        {children}
      </main>
    </div>
  )
}
