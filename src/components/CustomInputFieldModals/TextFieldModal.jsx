import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../../context/GlobalContext';

export default function TextFieldModal({ title, type, addField }) {
  const initialInputProperties = {
    id: uuidv4(),
    type,
    subType: '',
    name: '',
    // minLength: 0,
    // maxLength: 0,
    // min: 0,
    // max: 0,
    required: false,
    customErrorMessage: '',
  };

  const [openModal, setOpenModal] = useState(false);
  const [inputProperties, setInputProperties] = useState(
    initialInputProperties
  );

  const { error, dispatch } = useContext(GlobalContext);
  const [inputNameError, setInputNameError] = useState(false);
  const [inputSubTypeError, setInputSubTypeError] = useState(false);

  const onTextInputChange = e => {
    setInputProperties(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onRequiredCheckboxChange = e => {
    setInputProperties(prev => ({
      ...prev,
      [e.target.id]: e.target.checked,
    }));
  };

  const onInputTypeChange = e => {
    setInputProperties(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputForm = () => {
    let isValidated = true;

    if (!inputProperties.name) {
      isValidated = false;
      setInputNameError(true);
      dispatch({ type: 'SET_ERROR', payload: 'Input must have a name' });
    } else if (inputProperties.subType === '') {
      isValidated = false;
      setInputSubTypeError(true);
      dispatch({ type: 'SET_ERROR', payload: 'Please select a sub type' });
    }

    return isValidated;
  };

  const onSubmit = e => {
    e.preventDefault();
    // reset errors
    setInputNameError(false);
    setInputSubTypeError(false);

    if (validateInputForm()) {
      let cleanedInputField = cleanInputForm();
      addField(cleanedInputField);

      console.log(`ADDED - ${title} Input :>>`, cleanedInputField);
      setInputProperties(initialInputProperties);
      setOpenModal(false);
      return;
    }
  };

  const cleanInputForm = () => {
    const tempInput = { ...inputProperties };

    tempInput.name && tempInput.name.trim();
    tempInput.customErrorMessage && tempInput.customErrorMessage.trim();

    return tempInput;
  };

  /*
	revisit later if needed
	const validateSubType = () => {
		let isValid = false;

		if (inputProperties.subType === '') {
			isValid = false;
			dispatch({ type: 'SET_ERROR', payload: 'Please select input type' });
		} else if (inputProperties.subType === 'text') {
			if (!inputProperties.maxLength) {
				isValid = false;
      	dispatch({ type: 'SET_ERROR', payload: 'Max Length cannot be null' });
			} else if (inputProperties.minLength > inputProperties.maxLength) {
				isValid = false;
      	dispatch({ type: 'SET_ERROR', payload: 'Min Length cannot be greater than Max Length' });
			}
		} else if (inputProperties.subType === 'number') {
			if (!inputProperties.max) {
				isValid = false;
      	dispatch({ type: 'SET_ERROR', payload: 'Max value cannot be null' });
			} else if (inputProperties.min > inputProperties.max) {
				isValid = false;
      	dispatch({ type: 'SET_ERROR', payload: 'Min value cannot be greater than Max value' });
			}
		}

		return isValid;
	}

	const onValidationChange = e => {
    setInputProperties(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
	*/

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
              error={!!inputNameError}
              onChange={onTextInputChange}
              required
              autoComplete="off"
              sx={{ marginBottom: 2 }}
            />

            <FormControl sx={{ marginBottom: 2 }} error={!!inputSubTypeError}>
              <InputLabel>Input Type</InputLabel>
              <Select
                id="subType"
                name="subType"
                label="Input Type"
                value={inputProperties.subType}
                defaultValue=""
                required
                onChange={onInputTypeChange}
              >
                <MenuItem value="text"> Text </MenuItem>
                <MenuItem value="number"> Numeric </MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="customErrorMessage"
              label="Custom Error Message"
              value={inputProperties.customErrorMessage}
              type="text"
              onChange={onTextInputChange}
              autoComplete="off"
              sx={{
                marginBottom: 2,
              }}
            />

            {/* revisit if this is needed */}
            {/* { inputProperties.subType === 'text' &&
							<Box sx={{
								display: 'flex',
								flexDirection: 'column',
								width: 'inherit',
								justifyContent: 'space-between',
							}}>
								<TextField
									id="minLength"
									label="Min Length"
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									value={inputProperties.minLength}
									type="number"
									onChange={onValidationChange}
									sx={{
										marginBottom: 2,
									}}
								/>

								<TextField
									id="maxLength"
									label="Max Length"
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									value={inputProperties.maxLength}
									type="number"
									onChange={onValidationChange}
									sx={{
										marginBottom: 2,
									}}
								/>
							</Box>
						}

						{ inputProperties.subType === 'number' &&
							<Box sx={{
								display: 'flex',
								flexDirection: 'column',
								width: 'inherit',
								justifyContent: 'space-between',
							}}>
								<TextField
									id="minLength"
									label="Min Length"
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									value={inputProperties.minLength}
									type="number"
									onChange={onValidationChange}
									sx={{
										marginBottom: 2,
									}}
								/>

								<TextField
									id="max"
									label="Maximum Number"
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									value={inputProperties.max}
									type="number"
									onChange={onValidationChange}
									sx={{
										marginBottom: 2,
									}}
								/>
							</Box>
						} */}

            <FormControlLabel
              control={
                <Checkbox
                  id="required"
                  onChange={onRequiredCheckboxChange}
                  checked={inputProperties.required}
                />
              }
              label="Required?"
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
}
