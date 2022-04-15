import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FormsContext } from '../context/FormsContext';
import useFetch from '../hooks/useFetch';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

  const navigate = useNavigate();

  const deleteForm = async form => {
    if (form._id) {
      const confirmed = window.confirm('Are you sure to discard the form?');

      if (confirmed) {
        await executeFetch(null, form._id);
        dispatch({ type: 'DELETE_FORM', payload: form._id });
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
        <Stack
          key={form._id}
          direction={'row'}
          spacing={1}
          sx={{ alignItems: 'center' }}
        >
          <IconButton aria-label="delete" onClick={() => deleteForm(form)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => navigate(`/forms/${form._id}`)}
          >
            <EditIcon />
          </IconButton>
          <Link
            underline="none"
            component={RouterLink}
            to={`/forms/${form._id}`}
          >
            {form.name}
          </Link>
        </Stack>
      ))}
    </Container>
  );
}

export default Dashboard;
