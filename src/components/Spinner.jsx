import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

function Spinner() {
  const { loading } = useContext(GlobalContext);

  return (
    loading && (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    )
  );
}

export default Spinner;
