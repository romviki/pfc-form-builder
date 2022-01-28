import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <h1>PFC Form Builder</h1>

      <Router>
        <Routes>
          <Route path='/' element={<h2>Main Page</h2>} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
