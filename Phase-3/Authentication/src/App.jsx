import React from 'react'
import AuthPage from './pages/authpage'
import Footer from './components/footer'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'

const App = () => {
  return (
    <div className='App'>
      <Navbar/>
      <div className='content'>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/auth' element={<AuthPage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='*' element={<h1>404 Not Found</h1>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App