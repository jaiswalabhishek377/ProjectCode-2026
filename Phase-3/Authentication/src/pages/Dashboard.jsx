import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({ name: '', email: '' })
  
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token')
    if (!token) {
      // No token means not logged in, redirect to auth page
      navigate('/auth')
      return
    }
    
    // Fetch user info from backend using the token
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/user/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        })
        const data = await response.json()
        if (response.ok && data.success) {
          setUserInfo({ name: data.name, email: data.email })
        } else {
          // Token invalid, redirect to login
          localStorage.removeItem('token')
          navigate('/auth')
        }
      } catch (error) {
        console.log('Error fetching user info:', error)
        navigate('/auth')
      }
    }
    
    fetchUserInfo()
  }, [navigate])
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/auth')
  }
  
  return (
    <div>
        <h1>Welcome to the Dashboard, {userInfo.name}!</h1>
        <p>Email: {userInfo.email}</p>
        <button onClick={handleLogout} style={{padding: '0.5rem 1rem', cursor: 'pointer'}}>Logout</button>
    </div>
  )
}

export default Dashboard