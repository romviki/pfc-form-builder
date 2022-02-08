import { Container, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Notfound from './pages/Notfound';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
