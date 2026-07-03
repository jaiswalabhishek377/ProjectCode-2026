import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'


const AuthPage = () => {
  const navigate = useNavigate()  // for redirecting after login w/o refresh
  const [login, setLogin] = useState(false); // for conditionalrendering/toggle of register/login page components

  const [name,setName] = useState("")  // for register form!
  const [email,setEmail] = useState("");
  const [password,setPassword]= useState("")

  const [error,setError] = useState("")  // FOR ERROR MESSAGE
  const [loading,setLoading] = useState(false) //loading state spinner

  const handleAuthSubmit = async (e) =>{
    e.preventDefault()   // prevent page refresh

    setError("")
    setLoading(true)

    try{
      // first decide which backend endpoint/url  to send the data!
      const url= login ? '/api/auth/login' : '/api/auth/register'
      const requestBody = login ? {email,password} : {name,email,password} // the body/data of the request to be sent!
      //send the request to the body
      
      const response = await fetch(url,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(requestBody)
      })

      //parse the response!
      const data = await response.json()
      if(!response.ok){
        throw new Error(data.message || "Authentication failed")
      }

      // if successful, store the token in localstorage
      if(data.token){
        localStorage.setItem('token',data.token)
      setName("")
      setEmail("")
      setPassword("")
      setError("")

      navigate('/dashboard')
    }
  }
  catch(error){ 
    setError(error.message || "An error occured in auth!")
    console.log("Auth error:",error)
  }
  finally{
    setLoading(false) // stop loading state!
  }
}

  return (
    <div className='auth-page'>
        <h1>{login ? "Login" : "Register"}</h1> 
        <form onSubmit={handleAuthSubmit}>
            {!login? <input type="text" placeholder="UserName" onChange={(e)=> setName(e.target.value)} value={name} required/> : null}
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
            <input type="password" placeholder="Password" onChange={ (e)=>setPassword(e.target.value) } value={password} required />
            <button type="submit" disabled={loading} >{login ? "Login" : "Register"}</button>
        </form>
        <p>{login ? "Don't have an account?" : "Already have an account?"} <a href="#/" onClick={(e) => {e.preventDefault(); setLogin(!login); setError("") }}>{login ? "Register" : "Login"}</a></p>
        {/* <p>{email}</p>live changes!  */}
        {/* show error to user in ui */}
        {error && <p style={{color:'red'}}>{error}</p>} 
    </div>
  )
}

export default AuthPage