import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import SignInPage from './components/SignInPage/SignInPage'
import CreateAccountPage from './components/CreateAccountPage/CreateAccountPage'
import HomePage from './components/HomePage/HomePage'
import CreateCharacterPage from './components/CreateCharacterPage/CreateCharacterPage'
import ViewCharactersPage from './components/ViewCharactersPage/ViewCharactersPage'
import CharacterSandbox from './components/CharacterSandbox/CharacterSandbox'

function App() {
  return (
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/createAccount" element={<CreateAccountPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/createCharacter" element={<CreateCharacterPage />} />
        <Route path="/viewCharacters" element={<ViewCharactersPage />} />
        <Route path="/characterSandbox" element={<CharacterSandbox />} />
      </Routes>
  )
}

export default App
