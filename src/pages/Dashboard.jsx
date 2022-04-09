import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FormsContext } from '../context/FormsContext';
import useFetch from '../hooks/useFetch';

function Dashboard() {
  const { forms, dispatch } = useContext(FormsContext);
  const { data, error } = useFetch('/api/forms', {}, true);
  const { executeFetch } = useFetch(
    '/api/forms',
    {
      method: 'DELETE',
    },
    false
  );

  const deleteForm = async form => {
    if (form.id) {
      const confirmed = window.confirm('Are you sure to discard the form?');

      if (confirmed) {
        await executeFetch(null, form.id);
        dispatch({ type: 'DELETE_FORM', payload: form.id });
      }

      return;
    }
  };

  useEffect(() => {
    const initialForms = () => {
      if (error) {
        dispatch({ type: 'GET_FORMS', payload: [] });
      } else if (data) {
        dispatch({ type: 'GET_FORMS', payload: data });
      }
    };

    initialForms();
  }, [data, dispatch, error]);

  return (
    <Container>
      <Grid container justifyContent="space-between">
        <Typography variant="h2">Forms</Typography>
        <Box alignSelf="center">
          <Button variant="contained" component={RouterLink} to="/create">
            Create
          </Button>
        </Box>
      </Grid>
      {forms.map(form => (
        <Box key={form.id} sx={{ flexDirection: 'row' }}>
          <IconButton aria-label="delete" onClick={() => deleteForm(form)}>
            <DeleteIcon />
          </IconButton>
          <Link
            underline="none"
            component={RouterLink}
            to={`/forms/${form.id}`}
          >
            {form.name}
          </Link>
        </Box>
      ))}
    </Container>
  );
}

export default Dashboard;
