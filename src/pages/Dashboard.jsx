import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FormsContext } from '../context/FormsContext';
import useFetch from '../hooks/useFetch';

function Dashboard() {
  const { forms, dispatch } = useContext(FormsContext);
  const { data, error } = useFetch('/api/forms', {}, true);

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
        <Box key={form.id}>
          <Link underline="none" component={RouterLink} to={`/edit/${form.id}`}>
            {form.name}
          </Link>
        </Box>
      ))}
    </Container>
  );
}

export default Dashboard;
