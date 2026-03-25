import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Execute from './components/Execute'
import Projects from './components/Projects'

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/execute' element={<Execute />}/>
        <Route path='myProjects' element={<Projects/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
