import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.title}>Oops! Something went wrong</h1>
          <p style={styles.message}>
            {this.state.error && this.state.error.toString()}
          </p>
          <details style={styles.details}>
            <summary>Details</summary>
            <pre style={styles.pre}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={styles.button}
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#ffe6e6',
    borderRadius: '8px',
    border: '1px solid #ff0000',
    margin: '2rem',
  },
  title: {
    color: '#c0392b',
    marginBottom: '1rem',
  },
  message: {
    color: '#333',
    marginBottom: '1rem',
    fontFamily: 'monospace',
  },
  details: {
    textAlign: 'left',
    marginBottom: '1rem',
  },
  pre: {
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '4px',
    overflow: 'auto',
    fontSize: '0.85rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
}

export default ErrorBoundary
