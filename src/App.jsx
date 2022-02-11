import { Container } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormsContextProvider from './context/FormsContext';
import CreateForm from './pages/CreateForm';
import Dashboard from './pages/Dashboard';
import EditForm from './pages/EditForm';
import Notfound from './pages/Notfound';
import Alert from './components/Alert';
import GlobalContextProvider from './context/GlobalContext';

function App() {
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <GlobalContextProvider>
          <FormsContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<CreateForm />} />
                <Route path="/edit/:formId" element={<EditForm />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
            </Router>

            <Alert />
          </FormsContextProvider>
        </GlobalContextProvider>
      </LocalizationProvider>
    </Container>
  );
}

export default App;
