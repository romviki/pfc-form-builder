import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialForm = {
  id: uuidv4(),
  name: '',
  required: false,
  minLength: '',
  maxLength: '',
};

function InputFieldModal({ title, addField }) {
  const [open, setOpen] = useState(false);
  const [createInputForm, setCreateInputForm] = useState(initialForm);

  const { name, required, minLength, maxLength } = createInputForm;

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
    const createInputFormCopy = { ...createInputForm };
    !minLength && delete createInputFormCopy.minLength;
    !maxLength && delete createInputFormCopy.maxLength;

    addField(createInputFormCopy);

    setOpen(false);
  };

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        TextField
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
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
          <Grid container justifyContent='space-between'>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              marginBottom={2}
            >
              Create {title}
            </Typography>
            <Box>
              <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={() => setOpen(false)}
              >
                <CloseIcon fontSize='small' />
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
              id='name'
              label='Name - Used As Text Field Label'
              variant='outlined'
              value={name}
              sx={{
                marginBottom: 2,
              }}
              onChange={onChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  id='required'
                  onChange={onChecked}
                  checked={required}
                />
              }
              label='Required?'
              sx={{
                marginBottom: 2,
              }}
            />

            <TextField
              id='minLength'
              label='Min Length'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={minLength}
              type='number'
              sx={{
                marginBottom: 2,
              }}
              onChange={onChange}
            />

            <TextField
              id='maxLength'
              label='Max Length'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={maxLength}
              type='number'
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
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button
                variant='outlined'
                type='reset'
                onClick={() => setCreateInputForm(initialForm)}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default InputFieldModal;
