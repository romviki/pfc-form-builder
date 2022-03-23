import { Button, Grid, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FormCanvas from '../components/FormCanvas';
import InputFieldList from '../components/InputFieldList';
import { FormsContext } from '../context/FormsContext';
import { GlobalContext } from '../context/GlobalContext';
import useFetch from '../hooks/useFetch';


function EditForm() {
  const navigate = useNavigate();
  const { error, dispatch: dispatchError } = useContext(GlobalContext);
  const { dispatch: dispatchForms } = useContext(FormsContext);

  const { executeFetch } = useFetch(
    '/api/forms/{id}',
    {
      method: 'GET',
    },
    true
  );

  const [form, setForm] = useState({
    id: form.id,
    name: form.name,
    fields: form.fields,
  });

  const addField = field => {
    setForm(prev => ({
      ...prev,
      fields: [...prev.fields, field],
    }));
  };

  const removeField = fieldId => {
    setForm(prev => ({
      ...prev,
      fields: [...prev.fields.filter(field => field.id !== fieldId)],
    }));
  };

  const onSave = async () => {
    if (form.name) {
      await executeFetch(form);
      dispatchForms({ type: 'EDIT_FORM', payload: form });
      navigate('/');
      return;
    }
    
    dispatchError({
      type: 'SET_ERROR',
      payload: 'Form Input Error',
    });
  };

  const onChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };



  return <>
      <Grid container justifyContent="space-between">
        <Typography variant="h2">Edit Form</Typography>

        <Grid item alignSelf="center">
          <Button variant="contained" onClick={onSave} sx={{ marginRight: 2 }}>
            Save Form
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              const confirmed = window.confirm(
                'Are you sure to discard changes?'
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
        <Grid
          item
          xs={3}
          sx={{ borderRight: 1, borderColor: 'grey.500', paddingRight: 1 }}
        >
          <InputFieldList addField={addField} />
        </Grid>

        <Grid item xs={9} container direction="column" sx={{ paddingLeft: 1 }}>
          <TextField
            label="Form Name"
            id="name"
            value={form.name}
            onChange={onChange}
            sx={{ marginBottom: 2 }}
            required
            error={!!error}
          />

          <FormCanvas
            fields={form.fields}
            removeField={fieldId => removeField(fieldId)}
          />
        </Grid>
      </Grid>
    </>;
}

export default EditForm;
