import { Navigate, Route, Routes } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell.jsx'
import { CharacterCreatorPage } from '../features/characterCreator/CharacterCreatorPage.jsx'
import { CompletionPage } from '../features/completion/CompletionPage.jsx'
import { LanguageSelectPage } from '../features/languageSelect/LanguageSelectPage.jsx'
import { LessonPage } from '../features/lessonPlayer/LessonPage.jsx'
import { SettingsPage } from '../features/settings/SettingsPage.jsx'
import { WelcomePage } from '../features/welcome/WelcomePage.jsx'

export function AppRoutes({ appState }) {
  return (
    <PageShell onLogout={appState.onLogout}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/create-teacher"
          element={<CharacterCreatorPage appState={appState} />}
        />
        <Route
          path="/language"
          element={<LanguageSelectPage appState={appState} />}
        />
        <Route path="/lesson" element={<LessonPage appState={appState} />} />
        <Route path="/settings" element={<SettingsPage appState={appState} />} />
        <Route
          path="/complete"
          element={<CompletionPage appState={appState} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageShell>
  )
}
