import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../../context/GlobalContext';
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
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function LabelModal({ title, type, addField }) {
  const initialLabelProperties = {
    id: uuidv4(),
    type,
    // name: '',
    labelValue: '',
    required: false,
  };

  const [openModal, setOpenModal] = useState(false);
  const [labelProperties, setLabelProperties] = useState(
    initialLabelProperties
  );

  const { error, dispatch } = useContext(GlobalContext);
  // const [ labelNameError, setLabelNameError ] = useState(false);
  const [showLabelError, setShowLabelError] = useState(false);

  const onTextInputChange = e => {
    setLabelProperties(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onRequiredCheckboxChange = e => {
    setLabelProperties(prev => ({
      ...prev,
      [e.target.id]: e.target.checked,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();

    // setLabelNameError(false);
    setShowLabelError(false);

    if (validateLabelForm()) {
      // let cleanedLabelField = cleanInputForm();
      addField(labelProperties);
      console.log(`ADDED - ${title} Label :>>`, labelProperties);

      setLabelProperties(initialLabelProperties);
      setOpenModal(false);
      return;
    }
  };

  const validateLabelForm = () => {
    let isValidated = true;

    // if (!labelProperties.name) {
    //   isValidated = false;
    // 	setLabelNameError(true);
    //   dispatch({ type: 'SET_ERROR', payload: 'Label must have a name' });
    // } else

    if (!labelProperties.labelValue) {
      isValidated = false;
      setShowLabelError(true);
      dispatch({ type: 'SET_ERROR', payload: 'Label must have a value' });
    }

    return isValidated;
  };

  // const cleanInputForm = () => {
  // 	const tempInput = { ...labelProperties };

  // 	tempInput.name && tempInput.name.trim();

  // 	return tempInput;
  // }

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
            {/* Label properties form */}
            <Typography variant="subtitle1" component="h3" marginBottom={2}>
              Label Properties
            </Typography>

            {/* <TextField
              id="name"
              label="Label Name"
              variant="outlined"
              value={labelProperties.name}
              error={!!labelNameError}
              onChange={onTextInputChange}
              required
							autoComplete='off'
              sx={{ marginBottom: 2 }}
            /> */}

            <TextField
              id="labelValue"
              label="Label Value"
              variant="outlined"
              value={labelProperties.labelValue}
              error={!!showLabelError}
              onChange={onTextInputChange}
              required
              autoComplete="off"
              sx={{ marginBottom: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="required"
                  onChange={onRequiredCheckboxChange}
                  checked={labelProperties.required}
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
                onClick={() => setLabelProperties(initialLabelProperties)}
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
