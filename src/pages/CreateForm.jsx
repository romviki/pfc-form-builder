import { Button, Grid, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FormCanvas from '../components/FormCanvas';
import InputFieldList from '../components/InputFieldList';
import { FormsContext } from '../context/FormsContext';
import { GlobalContext } from '../context/GlobalContext';
import useFetch from '../hooks/useFetch';

function CreateForm() {
  const { dispatch: dispatchError } = useContext(GlobalContext);
  const { dispatch: dispatchForms } = useContext(FormsContext);

  const { executeFetch } = useFetch('/api/forms', {
    method: 'POST',
  });

  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: uuidv4(),
    name: '',
    fields: [],
  });

  const { name } = form;

  const addField = field => {
    setForm(prev => ({
      ...prev,
      fields: [...prev.fields, field],
    }));
  };

  const onSave = async () => {
    if (name) {
      await executeFetch(form);
      dispatchForms({ type: 'ADD_FORM', payload: form });
      navigate('/');
      return;
    }

    dispatchError({
      type: 'SET_ERROR',
      payload: 'Form has to have a name before save',
    });
  };

  const onChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <Grid container justifyContent="space-between">
        <Typography variant="h2">Create Form</Typography>
        <Grid item alignSelf="center">
          <Button variant="contained" onClick={onSave} sx={{ marginRight: 2 }}>
            Save Form
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              const confirmed = window.confirm(
                'Are you sure to discard the form?'
              );
              confirmed && navigate('/');
            }}
          >
            Cancel
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
        <InputFieldList addField={addField} />

        <Grid item xs={9} container direction="column">
          <TextField
            label="Form Name"
            id="name"
            value={name}
            onChange={onChange}
            sx={{ marginBottom: 2 }}
            required
          />

          <FormCanvas fields={form.fields} />
        </Grid>
      </Grid>
    </>
  );
}

export default CreateForm;
