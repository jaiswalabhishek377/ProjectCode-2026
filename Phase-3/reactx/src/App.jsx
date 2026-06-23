import React from 'react'
import Card from './card'
import Button from './Button'
import Count from './Count'
import TodoList from './TodoList'
import Time from './Time'

const App = () => {
  return (
    <div>
      <h1>Welcome to React</h1>
      <h1>My Website!</h1>
      <div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
        <hr />
        <ol>
          <li>Mercedes</li>
          <li>BMW</li>
          <li>Audi</li>
        </ol>
      </div>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <hr/>
      <Button/>
      <hr/>
      <Count/>
      <TodoList/>
      <Time/>
      <p>&copy; 2026 All rights reserved.</p>
    </div>
  )
}

export default App