import React from 'react'
import { useState,useEffect} from 'react'
const Time = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString())

    // useEffect(() =>{
    //     const interval = setInterval(() => {
    //         setTime(new Date().toLocaleTimeString())
    //     },1000)
    //     return () => clearInterval(interval)
    // },[])

  return (
    <div>
        <h2>Current Time: {time}</h2>
    </div>
  )
}

export default Time