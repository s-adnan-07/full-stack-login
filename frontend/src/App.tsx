import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  )
}

export default App
