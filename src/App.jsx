import { useState } from 'react'
import './App.css'

function App() {
  // Migration from legacy app.js - preserving core logic
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>React Application</h1>
      <p>Welcome to the migrated React app</p>
      <div className="counter">
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      </div>
    </div>
  )
}

export default App
