import './App.css'
import { Loginform } from './Components/LoginForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFound } from './Components/NotFound'
import { Dashboard } from './Components/dashboard.tsx'
import { Protected } from './Components/Protected.tsx'
import { Toaster } from 'sonner'
import { RegisterForm } from './Components/RegisterForm.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loginform />}/>
          <Route path='/register' element={<RegisterForm />}/>
          <Route path='/dashboard' element={
            <Protected>
              <Dashboard />
            </Protected>
          }/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
