import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const formsKey = process.env.REACT_APP_LOCAL_STORAGE_FORMS_KEY;

function Dashboard() {
  const [forms, setForms] = useLocalStorage(formsKey, []);

  useEffect(() => {
    if (!forms?.length) {
      setForms([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Grid container justifyContent='space-between'>
        <Typography variant='h2'>Forms</Typography>
        <Box alignSelf='center'>
          <Button variant='contained' component={RouterLink} to='/create'>
            Create
          </Button>
        </Box>
      </Grid>
      {forms.map(form => (
        <Box key={form.id}>
          <Link underline='none' component={RouterLink} to={`/edit/${form.id}`}>
            {form.name}
          </Link>
        </Box>
      ))}
    </Container>
  );
}

export default Dashboard;
