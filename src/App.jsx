import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const statusCycle = ['idle', 'running', 'done', 'failed']
  const [agentStatusIndex, setAgentStatusIndex] = useState(0)

  const currentStatus = statusCycle[agentStatusIndex]

  const handleSimulateNext = () => {
    setAgentStatusIndex((prevIndex) => (prevIndex + 1) % statusCycle.length)
  }

  return (
    <div className="app-container">
      <section className="counter-section">
        <h1>Vite + React</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </section>

      <section className={`agent-status agent-status--${currentStatus}`}>
        <h2>Agent run</h2>
        <div className="agent-status-info">
          <div className="agent-status-row">
            <span className="agent-status-label">Step:</span>
            <span className="agent-status-value">ingest</span>
          </div>
          <div className="agent-status-row">
            <span className="agent-status-label">Status:</span>
            <span className="agent-status-value">{currentStatus}</span>
          </div>
        </div>
        <button
          className="agent-status-button"
          onClick={handleSimulateNext}
        >
          Simulate next
        </button>
      </section>
    </div>
  )
}

export default App
