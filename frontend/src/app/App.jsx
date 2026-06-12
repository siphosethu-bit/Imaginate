import { useMemo, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoginGate } from '../features/auth/LoginGate.jsx'
import { AppRoutes } from './routes.jsx'

const defaultLanguage = {
  name: 'English',
  description: 'Start with English audio',
}

function App() {
  const [teacherImage, setTeacherImage] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage)
  const [lessonProgress, setLessonProgress] = useState({
    completedActivities: 0,
    learnedShapes: [],
  })

  const appState = useMemo(
    () => ({
      teacherImage,
      setTeacherImage,
      selectedLanguage,
      setSelectedLanguage,
      lessonProgress,
      setLessonProgress,
    }),
    [teacherImage, selectedLanguage, lessonProgress],
  )

  return (
    <BrowserRouter>
      <LoginGate>
        {({ onLogout }) => (
          <AppRoutes appState={{ ...appState, onLogout }} />
        )}
      </LoginGate>
    </BrowserRouter>
  )
}

export default App
