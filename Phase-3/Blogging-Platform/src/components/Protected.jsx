import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

 
function Protected({children,authentication=true}){
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication ){ //when authStatus is false redirect to login page
            navigate("/login")
        }
        else if( !authentication && authStatus !== authentication){
            navigate("/")
        }
    setLoader(false)
    },[authStatus,authentication,navigate])
  return (
    loader ? <div>Loading...</div> : children
  )
}

export default Protected