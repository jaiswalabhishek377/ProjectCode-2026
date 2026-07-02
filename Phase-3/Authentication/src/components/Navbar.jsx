import React from 'react'
import ultra from '../assets/ultra.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav>
            <img  id="logo" src={ultra} alt="Logo" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="#services">Services</Link></li>
                <li><Link to="/auth">AuthPage</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
            <p>ReactX</p>
        </nav>
    </div>
  )
}

export default Navbar