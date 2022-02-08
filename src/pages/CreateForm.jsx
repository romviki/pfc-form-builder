import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { formKey } from '../app_constants';
import InputFieldModal from '../components/InputFieldModal';
import useLocalStorage from '../hooks/useLocalStorage';

function CreateForm() {
  const [forms, setForms] = useLocalStorage(formKey, []);
  const [form, setForm] = useState({
    id: uuidv4(),
    name: '',
    fields: [],
  });
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const { name } = form;

  const addField = field => {
    setForm(prev => ({
      ...prev,
      fields: [...prev.fields, field],
    }));
  };

  const onSave = () => {
    if (form.name) {
      setForms([...forms, form]);
      navigate('/');
      return;
    }

    setShowAlert(true);
  };

  const closeToast = () => {
    setShowAlert(false);
  };

  const onChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <Snackbar open={showAlert} autoHideDuration={3000} onClose={closeToast}>
        <Box>
          <Alert severity='error' sx={{ width: '100%' }}>
            Form has to have a name before save!
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={closeToast}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Alert>
        </Box>
      </Snackbar>

      <Grid container justifyContent='space-between'>
        <Typography variant='h2'>Create Form</Typography>
        <Grid item alignSelf='center'>
          <Button variant='contained' onClick={onSave}>
            Save Form
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          gap: '2',
          marginTop: 4,
          justifyContent: 'space-between',
          minHeight: '85vh',
        }}
      >
        <Grid item xs={2} sx={{ borderRight: 1, borderColor: 'grey.500' }}>
          <Typography variant='h6' marginBottom={2}>
            Inputs
          </Typography>

          <InputFieldModal title='TextField' addField={addField} />
        </Grid>
        <Grid item xs={9} container direction='column'>
          <Typography variant='h6' marginBottom={2}>
            Canvas
          </Typography>

          <TextField
            label='Form Name'
            id='name'
            value={name}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default CreateForm;
