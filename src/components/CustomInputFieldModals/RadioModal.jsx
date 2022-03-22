import {
	Button,
 	Checkbox,
	FormControlLabel,
	Grid,
	Modal,
	TextField,
	Typography,
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../../context/GlobalContext';

export default function RadioModal({ title, type, addField }) {
	const initialInputProperties = {
    id: uuidv4(),
    type,
    name: '',
    options: [""],
    required: false,
    customErrorMessage: '',
  };

	const [openModal, setOpenModal] = useState(false);
	const [inputProperties, setInputProperties] = useState(initialInputProperties);

	const { error, dispatch } = useContext(GlobalContext);
	const [ inputNameError, setInputNameError ] = useState(false);

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

  const onOptionTextChange = (e, index) => {
    const list = [...inputProperties.options]
    list[index] = e.target.value
    setInputProperties(prev => ({
      ...prev,
      options: list,
    }));
  }

  const onAddOption = e => {
    const list = [...inputProperties.options, ""]
    setInputProperties(prev => ({
      ...prev,
      options: list,
    }));
  }

  const onRemoveOption = (index) => {
    console.log('index', index)
    const list = [...inputProperties.options]
    list.splice(index, 1)
    setInputProperties(prev => ({
      ...prev,
      options: list,
    }));
  }

	const validate = () => {
		if (!inputProperties.name) {
			setInputNameError(true);
      dispatch({ type: 'SET_ERROR', payload: 'Input must have a name' });
      return false;
    }

    let emptyOption = inputProperties.options.filter((option) => option === '')
    if (emptyOption.length > 0){
      dispatch({ type: 'SET_ERROR', payload: 'One or more options is empty' });
      return false;
    }

		return true;
	};

	const onSubmit = e => {
		e.preventDefault();
		// reset errors
		setInputNameError(false);

		if (!validate()) return;

    let cleanField = cleanUp();
    addField(cleanField);
    console.log(`ADDED - ${title} Input :>>`, cleanField);
    setInputProperties(initialInputProperties);
    setOpenModal(false);
	};

	const cleanUp = () => {
		const tempInput = { ...inputProperties };
    // Add clean up later
    !tempInput.customErrorMessage && delete tempInput.customErrorMessage;
		return tempInput;
	}
	
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
                onClick={() => setOpenModal(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
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
              Properties
            </Typography>

            <TextField
              id="name"
              label="Input Name"
              variant="outlined"
              value={inputProperties.name}
              error={!!inputNameError}
              onChange={onTextInputChange}
              required
							autoComplete='off'
              sx={{ marginBottom: 2 }}
            />
            {inputProperties.options.map((option, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 2,
                }}
              >
                <TextField
                  label="Option"
                  value={option}
                  type="text"
                  onChange={(e) => onOptionTextChange(e, index)}
                  autoComplete='off'
                  sx={{
                    marginLeft: 2,
                    marginRight: 2,
                    flexGrow: 1
                  }}
                />
                {inputProperties.options.length > 1 && 
                  <Button
                    variant="outlined"
                    type="button"
                    color="error"
                    onClick={() => onRemoveOption(index)}
                  >Remove
                  </Button>
                }
              </Box>
            ))}
            
            <Button
              variant="outlined"
              type="button"
              onClick={() => onAddOption()}
              sx={{
                marginBottom: 2
              }}
            >Add Option
            </Button>

						<TextField
              id="customErrorMessage"
              label="Custom Error Message"
              value={inputProperties.customErrorMessage}
              type="text"
              onChange={onTextInputChange}
							autoComplete='off'
              sx={{
                marginBottom: 2,
              }}
            />

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
  )
}
