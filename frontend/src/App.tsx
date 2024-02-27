import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Routes>
      <Route path="*" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <RequireAuth fallbackPath="/login">
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default App
