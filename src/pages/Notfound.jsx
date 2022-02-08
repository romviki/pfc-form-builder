import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Notfound() {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);

    const timer = setInterval(() => {
      setCountDown(prev => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Grid container direction='column' justifyContent='center'>
      <Typography variant='h2' marginTop={12} textAlign='center'>
        404 Not Found
      </Typography>
      <Typography variant='h4' marginTop={4} textAlign='center'>
        Redirect in {countDown} seconds
      </Typography>
      <Box marginTop={4} textAlign='center'>
        <Link to='/'>Back to Homepage</Link>
      </Box>
    </Grid>
  );
}

export default Notfound;
