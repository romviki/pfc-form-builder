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
  const navigate = useNavigate();

  const deleteForm = form => () => {
    if (form.id) {
      //event.preventDefault();
      const url = '/forms/' + form.id;
      const confirmed = window.confirm('Are you sure to discard the form?');
      if (confirmed) {
        fetch(url, { method: 'DELETE' })
          .then(response => response.json())
          .catch(e => {
            console.log(e);
          });
        dispatch({ type: 'DELETE_FORM', payload: form.id });
      }

      //navigate('/');
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
          <IconButton aria-label="delete" onClick={deleteForm(form)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => navigate(`./edit/${form.id}`)}
          >
            <EditIcon />
          </IconButton>
          <Link
            underline="none"
            component={RouterLink}
            to={`/preview/${form.id}`}
          >
            {form.name}
          </Link>
        </Stack>
      ))}
    </Container>
  );
}

export default Dashboard;
