import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Form from './pages/Form'
import Admin from './pages/Admin'
import Parent from './pages/Parent'
import Enseignants from './pages/Enseignants'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Enfant from './pages/Enfant';
import Evenement from './pages/Evenement'
import ForgotPassword from './pages/ForgotPassword'
import Matiere from './pages/Matiere'
import Class from './pages/Class'
import Profil from './pages/Profil'
import { Toaster } from 'react-hot-toast'
import Post from './pages/Post'
import Unauthorized from './pages/Unauthorized'
import { getUserFromLocalStorage } from './services/GetAdmin'
import Reclamation from './pages/Reclamation'
import { useState } from 'react'
import { getTokenFromLocalStorage } from './services/GetToken'
import Homework from './pages/Homework'
const App = () => {
  const userData = getUserFromLocalStorage();
  const token = getTokenFromLocalStorage();

  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-right' />
        <Routes>

          <Route path="/" element={(token) ? <Dashboard /> : <Login />} />
          <Route path="/dashboard" element={(userData?.role === "SuperAdmin" || userData?.role === "Admin") ? <Dashboard /> : <Login />} />

          <Route path="/gestion-admins" element={(userData?.role === "SuperAdmin") ? <Admin /> : <Unauthorized />} />
          <Route path="/gestion-enfant" element={(userData?.role === "SuperAdmin" || userData?.role === "Admin") ? <Enfant /> : <Unauthorized />} />
          <Route path="/gestion-parent" element={(userData?.role === "SuperAdmin" || userData?.role === "Admin") ? <Parent /> : <Unauthorized />} />
          <Route path="/gestion-Enseignants" element={(userData?.role === "SuperAdmin" || userData?.role === "Admin") ? <Enseignants /> : <Unauthorized />} />
          <Route path="/gestion-Evenement" element={(userData?.role === "SuperAdmin" || userData?.role === "Admin") ? <Evenement /> : <Unauthorized />} />
          <Route path="/gestion-Matiere" element={(userData?.role === "SuperAdmin" || userData?.role === "Admin") ? <Matiere /> : <Unauthorized />} />
          <Route path="/gestion-Class" element={(userData?.role === "SuperAdmin" || userData?.role === "Admin") ? <Class /> : <Unauthorized />} />
          <Route path="/gestion-Profil" element={(userData?.role === "SuperAdmin") ? <Profil /> : <Unauthorized />} />
          <Route path="/gestion-Post" element={(userData?.role === "SuperAdmin" || userData?.role === "Admin") ? <Post /> : <Unauthorized />} />
          <Route path="/gestion-Reclamation" element={(userData?.role === "SuperAdmin" || userData?.role === "Admin") ? <Reclamation /> : <Unauthorized />} />
          <Route path="/getion-Homework" element={(userData?.role === "enseignant") ? <Homework /> : <Login />} />
          <Route path="/Unauthorized" element={<Unauthorized />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </BrowserRouter >


  )
}

export default App