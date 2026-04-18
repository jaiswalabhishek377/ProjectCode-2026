import React, { useState } from 'react'

const App = () => {

  const [text,setText] = useState('');
  function slug(text) {
    // return text.toLowerCase().replace(/\s+/g, '-');// or can be done by split and join method
    return text.toLowerCase().split(' ').join('-');
  }
  return (
    <div>
      <h1>Blogging Platform</h1>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} /> 
      <p>{slug(text)}</p>
    </div>
  )
}

export default App