import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import FormCanvas from '../components/FormCanvas';
import InputFieldList from '../components/InputFieldList';
import Spinner from '../components/Spinner';
import { FormsContext } from '../context/FormsContext';
import { GlobalContext } from '../context/GlobalContext';
import useFetch from '../hooks/useFetch';

const PreviewForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(null);
  const { formId } = useParams();
  const { dispatch: dispatchForms } = useContext(FormsContext);
  const { loading, dispatch: dispatchError } = useContext(GlobalContext);
  const { data, error } = useFetch('/api/forms/' + formId, {}, true);
  const { executeFetch } = useFetch(
    '/api/forms/' + formId,
    { method: 'PUT' },
    false
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/not-found');
    }

    if (data) {
      setForm(data);
    }
  }, [formId, navigate, data, error]);

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

  const onChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSave = async () => {
    if (form?.name) {
      await executeFetch(form);
      dispatchForms({ type: 'EDIT_FORM', payload: form });
      navigate('/');
      return;
    }

    dispatchError({
      type: 'SET_ERROR',
      payload: 'Form has to have a name before save',
    });
  };

  if (loading) return <Spinner />;

  return (
    <Container>
      <Stack
        direction={'row'}
        spacing={1}
        sx={{
          marginBottom: 2,
          justifyContent: isEdit ? 'flex-end' : 'space-between',
          marginTop: 2,
        }}
      >
        {!isEdit && <Typography variant="h2">{form?.name}</Typography>}
        <Box alignSelf="center" sx={{ display: 'flex', gap: 2 }}>
          {isEdit && (
            <Button variant="contained" color="primary" onClick={onSave}>
              Save
            </Button>
          )}

          <Button
            variant={isEdit ? 'outlined' : 'contained'}
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </Button>

          {!isEdit && (
            <Button variant="outlined" component={RouterLink} to="/">
              Back
            </Button>
          )}
        </Box>
      </Stack>

      <Grid
        container
        sx={{
          gap: '2',
          marginTop: 4,
          justifyContent: 'space-between',
          minHeight: '85vh',
        }}
      >
        {isEdit && (
          <Grid
            item
            xs={3}
            sx={{ borderRight: 1, borderColor: 'grey.500', paddingRight: 1 }}
          >
            <InputFieldList addField={addField} />
          </Grid>
        )}

        {form && form.fields && (
          <Grid
            item
            xs={9}
            container
            direction="column"
            sx={{ paddingLeft: 1 }}
          >
            {isEdit && (
              <TextField
                label="Form Name"
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                sx={{ marginBottom: 2 }}
                required
                error={!!error}
              />
            )}

            <FormCanvas
              fields={form.fields}
              removeField={removeField}
              isEdit={isEdit}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default PreviewForm;
