import CloseIcon from '@mui/icons-material/Close';
import DatePicker from '@mui/lab/DatePicker';
import {
  Button,
  Checkbox,
  FormControl,
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

function InputFieldModal({ title, type, addField }) {
  const initialForm = {
    id: uuidv4(),
    type,
    name: '',
    validation: {
      required: false,
      min: '',
      max: '',
      minLength: '',
      maxLength: '',
      beforeDate: null,
      afterDate: null,
      customErrorMessage: '',
    },
  };

  const [open, setOpen] = useState(false);
  const [createInputForm, setCreateInputForm] = useState(initialForm);

  const { error, dispatch } = useContext(GlobalContext);

  const {
    name,
    validation: {
      required,
      min,
      max,
      minLength,
      maxLength,
      afterDate,
      beforeDate,
      customErrorMessage,
    },
  } = createInputForm;

  const onInputNameChange = e => {
    setCreateInputForm(prev => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const onValidationChange = e => {
    setCreateInputForm(prev => ({
      ...prev,
      validation: {
        ...prev.validation,
        [e.target.id]: e.target.value,
      },
    }));
  };

  const onRequiredCheck = e => {
    setCreateInputForm(prev => ({
      ...prev,
      validation: {
        ...prev.validation,
        required: e.target.checked,
      },
    }));
  };

  const onDateChange = (date, dateType) => {
    setCreateInputForm(prev => ({
      ...prev,
      validation: {
        ...prev.validation,
        [dateType]: date,
      },
    }));
  };

  const renderDate = params => {
    return <TextField {...params} />;
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
    !minLength && delete createInputFormCopy.validation.minLength;
    !maxLength && delete createInputFormCopy.validation.maxLength;
    !customErrorMessage &&
      delete createInputFormCopy.validation.customErrorMessage;
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
            border: '1px solid gray',
            borderRadius: '4px',
          }}
        >
          <Grid container justifyContent="flex-start">
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
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              marginBottom={2}
            >
              Create {title}
            </Typography>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '30vw',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              id="name"
              label="Input Name"
              variant="outlined"
              value={name}
              error={!!error}
              onChange={onInputNameChange}
              required
              sx={{
                marginBottom: 2,
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="required"
                  onChange={onRequiredCheck}
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
              onChange={onValidationChange}
              sx={{
                marginBottom: 2,
              }}
            />

            <TextField
              id="maxLength"
              label="Max Length"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={maxLength}
              type="number"
              onChange={onValidationChange}
              sx={{
                marginBottom: 2,
              }}
            />

            <TextField
              id="min"
              label="Minimum Number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={min}
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
              value={max}
              type="number"
              onChange={onValidationChange}
              sx={{
                marginBottom: 2,
              }}
            />

            <FormControl
              sx={{
                marginBottom: 2,
              }}
            >
              <DatePicker
                label="Must Before"
                value={beforeDate}
                onChange={newVal => onDateChange(newVal, 'beforeDate')}
                renderInput={params => renderDate(params)}
              />
            </FormControl>

            <FormControl
              sx={{
                marginBottom: 2,
              }}
            >
              <DatePicker
                label="Must After"
                value={afterDate}
                onChange={newVal => onDateChange(newVal, 'afterDate')}
                renderInput={params => renderDate(params)}
                sx={{
                  marginBottom: 2,
                }}
              />
            </FormControl>

            <TextField
              id="customErrorMessage"
              label="Custom Error Message"
              value={customErrorMessage}
              type="text"
              onChange={onValidationChange}
              sx={{
                marginBottom: 2,
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
              }}
            >
              <Button onClick={onSubmit} variant="contained" type="submit">
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
