import React from 'react'
import { useState } from 'react'
const AuthPage = () => {
  const [login, setLogin] = useState(false);
  return (
    <div className='auth-page'>
        <h1>{login ? "Login" : "Register"}</h1> 
        <form>
            {!login? <input type="text" placeholder="UserName" /> : null}
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">{login ? "Login" : "Register"}</button>
        </form>
        <p>Already have an account? <a href="#/" onClick={(e) => {e.preventDefault(); setLogin(!login)}}>{login ? "Login" : "Register"}</a></p>
    </div>
  )
}

export default AuthPage