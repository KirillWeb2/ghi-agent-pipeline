import './App.css';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { CommentsProvider } from './context/CommentsContext';

function App() {
  return (
    <ErrorBoundary>
      <CommentsProvider>
        <Layout />
      </CommentsProvider>
    </ErrorBoundary>
  );
}

export default App;
