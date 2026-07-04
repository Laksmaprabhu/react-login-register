import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Register from './components/Register'
import UserList from './components/Userlist'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/Protectedroute'

function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
         <Route path='/' element={<Register />}></Route>

        <Route element={<ProtectedRoute />}>      
        <Route path='/users' element={<UserList />}></Route>        
        <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
