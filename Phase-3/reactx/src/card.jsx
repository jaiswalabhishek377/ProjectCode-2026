import React from 'react'
import Hero from './assets/brocode.jpg'
import './card.css'
const Card = () => {
  return (
    <div className="card"> 
        <img src={Hero} alt="BroCode" />
        <h2>BroCode</h2>
        <p>I love football and watching myself dominating the field!</p>
    </div>
  )
}

export default Card