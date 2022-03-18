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
import { GlobalContext } from '../../context/GlobalContext';

const CheckboxModal = ({ title, type, addField }) => {
  const initialInputProperties = {
    id: uuidv4(),
    type,
    name: '',
    checked: false,
    required: false,
    customErrorMessage: '',
  };

  const { error, dispatch } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);
  const [inputProperties, setInputProperties] = useState(
    initialInputProperties
  );

  const onTextInputChange = e => {
    setInputProperties(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onCheckboxChange = e => {
    setInputProperties(prev => ({
      ...prev,
      [e.target.id]: e.target.checked,
    }));
  };

  const cleanInputForm = () => {
    const tempInput = { ...inputProperties };

    tempInput.name && tempInput.name.trim();
    tempInput.customErrorMessage && tempInput.customErrorMessage.trim();

    return tempInput;
  };

  const validateInputForm = () => {
    let isValidated = false;

    if (!inputProperties.name) {
      isValidated = false;
      dispatch({ type: 'SET_ERROR', payload: 'Input must have a name' });
    } else {
      isValidated = true;
    }

    return isValidated;
  };

  const onSubmit = e => {
    e.preventDefault();

    if (validateInputForm()) {
      let cleanedInputField = cleanInputForm();
      addField(cleanedInputField);
      console.log(`ADDED - ${title} Input :>>`, cleanedInputField);

      setInputProperties(initialInputProperties);
      setOpenModal(false);
      return;
    }
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        {title}
      </Button>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
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
            border: '1px solid gray',
            borderRadius: '4px',
          }}
        >
          {/* Modal title */}
          <Grid container justifyContent="flex-start">
            <Box>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpenModal(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              marginBottom={2}
            >
              Create {title}
            </Typography>
          </Grid>

          {/* Modal content */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '30vw',
              justifyContent: 'space-between',
            }}
          >
            {/* Input properties form */}
            <Typography variant="subtitle1" component="h3" marginBottom={2}>
              Input Properties
            </Typography>

            <TextField
              id="name"
              label="Input Name"
              variant="outlined"
              value={inputProperties.name}
              error={!!error}
              onChange={onTextInputChange}
              required
              sx={{
                marginBottom: 2,
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="checked"
                  onChange={onCheckboxChange}
                  checked={inputProperties.checked}
                />
              }
              label="Checked?"
              sx={{
                marginBottom: 2,
              }}
            />

            {/* Input validation form */}
            <Typography variant="subtitle1" component="h3" marginBottom={2}>
              Input Validations
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  id="required"
                  onChange={onCheckboxChange}
                  checked={inputProperties.required}
                />
              }
              label="Required?"
              sx={{
                marginBottom: 2,
              }}
            />

            <TextField
              id="customErrorMessage"
              label="Custom Error Message"
              value={inputProperties.customErrorMessage}
              type="text"
              onChange={onTextInputChange}
              sx={{
                marginBottom: 2,
              }}
            />

            {/* Modal submit and clear buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Button onClick={onSubmit} variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant="outlined"
                type="reset"
                onClick={() => setInputProperties(initialInputProperties)}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CheckboxModal;
