import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Snackbar, Alert as MuiAlert } from '@mui/material';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

function Alert() {
  const { error, dispatch } = useContext(GlobalContext);

  const closeToast = () => dispatch({ type: 'CLEAR_ERROR' });

  return (
    <Snackbar
      open={!!error}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={3000}
      onClose={closeToast}
    >
      <Box>
        <MuiAlert severity="error" sx={{ width: '100%' }}>
          {error}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeToast}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </MuiAlert>
      </Box>
    </Snackbar>
  );
}

export default Alert;
