import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../context/GlobalContext';

function InputFieldModal({ title, type, addField }) {
  const initialForm = {
    id: uuidv4(),
    type: type,
    name: '',
    required: false,
    minLength: '',
    maxLength: '',
    errorMessage: '',
  };

  const [open, setOpen] = useState(false);
  const [createInputForm, setCreateInputForm] = useState(initialForm);

  const { dispatch } = useContext(GlobalContext);

  const { name, required, minLength, maxLength, errorMessage } =
    createInputForm;

  const onChange = e => {
    setCreateInputForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onChecked = e => {
    setCreateInputForm(prev => ({
      ...prev,
      required: e.target.checked,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name) {
      const cleanedInputField = cleanUpInputField();
      addField(cleanedInputField);

      setCreateInputForm(initialForm);

      setOpen(false);
      return;
    }

    dispatch({ type: 'SET_ERROR', payload: 'Input must have a name' });
  };

  const cleanUpInputField = () => {
    const createInputFormCopy = { ...createInputForm };
    !minLength && delete createInputFormCopy.minLength;
    !maxLength && delete createInputFormCopy.maxLength;
    !errorMessage && delete createInputFormCopy.errorMessage;
    return createInputFormCopy;
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {title}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            p: 4,
            zIndex: 10,
            border: '1px solid',
            borderRadius: '4px',
            borderColor: 'grey.500',
          }}
        >
          <Grid container justifyContent="space-between">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              marginBottom={2}
            >
              Create {title}
            </Typography>
            <Box>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          <Box
            component={'form'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '30vw',
              justifyContent: 'space-between',
            }}
            onSubmit={onSubmit}
          >
            <TextField
              id="name"
              label="Name - Used As Input Label"
              variant="outlined"
              value={name}
              sx={{
                marginBottom: 2,
              }}
              onChange={onChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="required"
                  onChange={onChecked}
                  checked={required}
                />
              }
              label="Required?"
              sx={{
                marginBottom: 2,
              }}
            />

            <TextField
              id="minLength"
              label="Min Length"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={minLength}
              type="number"
              sx={{
                marginBottom: 2,
              }}
              onChange={onChange}
            />

            <TextField
              id="maxLength"
              label="Max Length"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={maxLength}
              type="number"
              sx={{
                marginBottom: 2,
              }}
              onChange={onChange}
            />

            <TextField
              id="errorMessage"
              label="Error Message"
              value={errorMessage}
              type="text"
              sx={{
                marginBottom: 2,
              }}
              onChange={onChange}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
              }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant="outlined"
                type="reset"
                onClick={() => setCreateInputForm(initialForm)}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default InputFieldModal;
