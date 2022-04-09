import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import FormCanvas from '../components/FormCanvas';
import InputFieldList from '../components/InputFieldList';
import { FormsContext } from '../context/FormsContext';
import useFetch from '../hooks/useFetch';
import Spinner from '../components/Spinner';
import { GlobalContext } from '../context/GlobalContext';

const PreviewForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { formId } = useParams();
  const { dispatch } = useContext(FormsContext);
  const { loading } = useContext(GlobalContext);
  const [form, setForm] = useState({});

  const { data, error } = useFetch('/api/forms/' + formId, {}, true);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/not-found');
    }

    if (data) {
      dispatch({ type: 'GET_FORM', payload: data });
      dispatch({ type: 'GET_FORM_BY_ID', payload: formId });
    }

    setForm(data);
  }, [dispatch, formId, navigate, form, data, error]);

  if (loading) return <Spinner />;

  return (
    <Container>
      <Stack
        direction={'row'}
        spacing={1}
        sx={{ marginBottom: 2, justifyContent: 'space-between' }}
      >
        <Typography variant="h2">{form?.name}</Typography>
        <Box alignSelf="center">
          <Button
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? 'View' : 'Edit'}
          </Button>
          <Button variant="contained" component={RouterLink} to="/">
            Back
          </Button>
        </Box>
      </Stack>

      {isEdit && (
        <Grid
          item
          xs={3}
          sx={{ borderRight: 1, borderColor: 'grey.500', paddingRight: 1 }}
        >
          <InputFieldList addField={() => console.log(formId)} />
        </Grid>
      )}

      {form && form.fields && <FormCanvas fields={form.fields} />}
    </Container>
  );
};

export default PreviewForm;
