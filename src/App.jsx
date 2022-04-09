import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alert from './components/Alert';
import FormsContextProvider from './context/FormsContext';
import GlobalContextProvider from './context/GlobalContext';
import CreateForm from './pages/CreateForm';
import Dashboard from './pages/Dashboard';
import Notfound from './pages/Notfound';
import PreviewForm from './pages/PreviewForm';

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
                <Route path="/forms/:formId" element={<PreviewForm />} />
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
