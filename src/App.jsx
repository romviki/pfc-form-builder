import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import Dashboard from './pages/Dashboard';
import EditForm from './pages/EditForm';
import Notfound from './pages/Notfound';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/create' element={<CreateForm />} />
          <Route path='/edit/:formId' element={<EditForm />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
