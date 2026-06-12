import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { CircleUserRound, LogOut } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/create-teacher', label: 'Teacher' },
  { to: '/language', label: 'Language' },
  { to: '/lesson', label: 'Lesson' },
]

export function TopNav({ onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isSettingsActive = location.pathname === '/settings'
  const activeIndex = Math.max(
    0,
    links.findIndex((link) => link.to === location.pathname),
  )
  const mobileWindowStart = activeIndex <= 1 ? 0 : 1
  const mobileLinks = links.slice(mobileWindowStart, mobileWindowStart + 3)

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-5 sm:px-8 lg:px-10">
      <motion.button
        type="button"
        onClick={() => navigate('/settings')}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ y: 1, scale: 0.98 }}
        className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral sm:gap-3"
        aria-label="Open profile settings"
      >
        <span
          className={clsx(
            'grid h-10 w-10 place-items-center rounded-[1rem] bg-navy text-cream shadow-soft ring-2 ring-white/65 transition group-hover:shadow-navy group-hover:ring-coral/35 sm:h-12 sm:w-12 sm:rounded-[1.2rem]',
            isSettingsActive && 'ring-coral/55 shadow-navy',
          )}
        >
          <CircleUserRound className="h-5 w-5 sm:h-[25px] sm:w-[25px]" aria-hidden="true" strokeWidth={2.2} />
        </span>
        <span>
          <span className="block text-sm font-black leading-none min-[390px]:text-base sm:text-lg">Profile</span>
          <span className="hidden text-xs font-bold uppercase text-navy/55 min-[390px]:block">Learning Settings</span>
        </span>
      </motion.button>
      <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-soft backdrop-blur sm:flex">
        {links.map((link) => (
          <NavItem key={link.to} link={link} layoutId="top-nav-active-pill" desktop />
        ))}
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="ml-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-navy/60 transition hover:bg-white/80 hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral sm:ml-1 sm:h-9 sm:w-9"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut className="h-4 w-4 sm:h-[17px] sm:w-[17px]" aria-hidden="true" />
          </button>
        )}
      </nav>
      <nav className="flex min-w-0 shrink items-center gap-0.5 overflow-hidden rounded-full border border-white/70 bg-white/70 p-1 shadow-soft backdrop-blur sm:hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {mobileLinks.map((link) => (
            <motion.div
              key={link.to}
              layout
              initial={{ opacity: 0, x: mobileWindowStart === 0 ? -12 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mobileWindowStart === 0 ? 12 : -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <NavItem link={link} layoutId="mobile-top-nav-active-pill" />
            </motion.div>
          ))}
        </AnimatePresence>
      </nav>
    </header>
  )
}

function NavItem({ link, layoutId, desktop = false }) {
  return (
    <NavLink
      to={link.to}
      className={({ isActive }) =>
        clsx(
          'relative isolate block whitespace-nowrap rounded-full font-extrabold transition-colors duration-300',
          desktop ? 'px-3 py-2 text-sm lg:px-4' : 'px-2 py-2 text-[11px] min-[380px]:px-2.5 min-[380px]:text-xs',
          isActive ? 'text-white' : 'text-navy/65 hover:bg-white/70 hover:text-navy',
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 -z-10 rounded-full bg-navy shadow-soft"
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            />
          )}
          <span className="relative z-10">{link.label}</span>
        </>
      )}
    </NavLink>
  )
}
