import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LockKeyhole, UserRound } from 'lucide-react'
import clsx from 'clsx'
import { Button } from '../../components/ui/Button.jsx'

const validUsername = 'testingName'
const validPassword = '12345'
const storageKey = 'kid-math-ai-logged-in'

export function LoginGate({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem(storageKey) === 'true')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  function handleLogout() {
    localStorage.removeItem(storageKey)
    setLoggedIn(false)
    setUsername('')
    setPassword('')
    setError('')
    setLoading(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (loading) return

    if (username !== validUsername || password !== validPassword) {
      setError('That does not match our test login. Try again.')
      setShakeKey((current) => current + 1)
      return
    }

    setError('')
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      localStorage.setItem(storageKey, 'true')
      setLoggedIn(true)
    }, 1000)
  }

  return (
    <>
      <motion.div
        animate={{
          filter: loggedIn ? 'blur(0px)' : 'blur(10px)',
          opacity: loggedIn ? 1 : 0.65,
        }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={clsx(loggedIn ? 'pointer-events-auto' : 'pointer-events-none select-none')}
        aria-hidden={!loggedIn}
      >
        {typeof children === 'function' ? children({ onLogout: handleLogout }) : children}
      </motion.div>

      <AnimatePresence>
        {!loggedIn && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-navy/24 px-5 py-8 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <motion.form
              key={shakeKey}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={
                error
                  ? {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      x: [0, -8, 8, -5, 5, 0],
                    }
                  : { opacity: 1, scale: 1, y: 0, x: 0 }
              }
              exit={{ opacity: 0, scale: 0.92, y: -80 }}
              transition={
                error
                  ? { x: { duration: 0.34 }, opacity: { duration: 0.28 }, scale: { duration: 0.28 }, y: { duration: 0.28 } }
                  : { type: 'spring', stiffness: 260, damping: 22 }
              }
              className="w-full max-w-md rounded-[2rem] border border-white/80 bg-white/82 p-6 text-left shadow-card backdrop-blur-xl sm:p-8"
            >
              <div className="mb-7 text-center">
                <motion.div
                  className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[1.35rem] bg-sky-100 text-navy shadow-soft"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="h-8 w-8 rounded-[0.7rem] bg-coral shadow-coral" />
                </motion.div>
                <h1 className="text-3xl font-black leading-tight text-navy sm:text-4xl">
                  Welcome to your learning world
                </h1>
                <p className="mt-3 text-base font-bold leading-relaxed text-navy/65">
                  Sign in to start your Grade 1 shapes adventure.
                </p>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-black text-navy/70">Username</span>
                  <span className="flex min-h-14 items-center gap-3 rounded-[1.2rem] border border-navy/10 bg-cream/80 px-4 shadow-inner-soft focus-within:border-coral">
                    <UserRound size={20} className="text-coral" aria-hidden="true" />
                    <input
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      className="w-full bg-transparent font-extrabold text-navy outline-none placeholder:text-navy/35"
                      placeholder="Enter username"
                      autoComplete="username"
                      disabled={loading}
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-black text-navy/70">Password</span>
                  <span className="flex min-h-14 items-center gap-3 rounded-[1.2rem] border border-navy/10 bg-cream/80 px-4 shadow-inner-soft focus-within:border-coral">
                    <LockKeyhole size={20} className="text-coral" aria-hidden="true" />
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full bg-transparent font-extrabold text-navy outline-none placeholder:text-navy/35"
                      placeholder="Enter password"
                      autoComplete="current-password"
                      disabled={loading}
                    />
                  </span>
                </label>
              </div>

              <div className="mt-5 min-h-7" aria-live="polite">
                {error && <p className="font-extrabold text-coral">{error}</p>}
              </div>

              <Button type="submit" variant="coral" className="mt-2 w-full" disabled={loading}>
                {loading && (
                  <motion.span
                    className="h-3 w-3 rounded-full bg-white"
                    animate={{ scale: [1, 1.45, 1], opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  />
                )}
                {loading ? 'Opening your lesson world' : 'Enter lesson world'}
              </Button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
