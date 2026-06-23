import React from 'react'
import { useState } from 'react'
const Count = () => {
   const [count,setCount] = useState(0)
   const handleIncrement = ()=>{
        setCount(count + 1)
   }
   const handleDecrement = ()=>{
        if(count<=0){return}
        setCount(count - 1)   
   }
  return (
    <div>
        <button className="btn" onClick={handleIncrement}>Increment!</button>
        <h2 style={{ margin: '10px', padding: '10px' }}>Count is : {count}</h2>
        <button className="btn" onClick={handleDecrement}>Decrement!</button>
    </div>
  )
}

export default Count