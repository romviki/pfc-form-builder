import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import { TextField, Typography } from '@mui/material';

function App() {
  return (
    <div>
      {/* below 2 components are for testing purposes, remove it once development starts */}
      <Typography variant='h2'>PFC Form Builder</Typography>
      <TextField id='outlined-basic' label='Testing' variant='outlined' />

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
