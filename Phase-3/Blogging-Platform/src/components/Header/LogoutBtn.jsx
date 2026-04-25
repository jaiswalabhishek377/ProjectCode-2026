import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth.js'
import {logout} from '../../store/authslice'
const LogoutBtn = () => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

  return (
    <div>
      <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutBtn