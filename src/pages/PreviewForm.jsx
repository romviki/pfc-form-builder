import { useContext, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { FormsContext } from '../context/FormsContext';
import useFetch from '../hooks/useFetch';
import { DatePicker } from '@mui/lab';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  Container,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import { Box } from '@mui/system';
import DropdownInput from '../components/CustomInputFields/DropDownInput';
import CheckboxInput from '../components/CustomInputFields/CheckboxInput';

const PreviewForm = () => {
  const { formId } = useParams();
  const { forms, dispatch } = useContext(FormsContext);
  const { data, error } = useFetch('/api/forms', {}, true);

  useEffect(() => {
    const initialForms = () => {
      if (error) {
        dispatch({ type: 'GET_FORMS', payload: [] });
      } else if (data) {
        dispatch({ type: 'GET_FORMS', payload: data });
        dispatch({ type: 'GET_FORM_BY_ID', payload: formId });
      }
    };

    initialForms();
  }, [data, dispatch, error, formId]);

  return (
    <Container>
      <Stack
        direction={'row'}
        spacing={1}
        sx={{ marginBottom: 2, justifyContent: 'space-between' }}
      >
        <Typography variant="h2">{forms[0].name}</Typography>
        <Box alignSelf="center">
          <Button
            variant="contained"
            component={RouterLink}
            to={`/edit/${forms[0].id}`}
            sx={{ marginRight: 2 }}
          >
            Edit
          </Button>
          <Button variant="contained" component={RouterLink} to="/">
            Back
          </Button>
        </Box>
      </Stack>
      {forms[0].fields.map(
        ({
          id,
          name,
          type,
          required,
          checked,
          labelValue,
          dropdownOptions,
          options,
          subType,
          textAreaRow,
          // min,
          // max,
          // minLength,
          // maxLength,
          beforeDate,
          afterDate,
          customErrorMessage,
        }) => {
          switch (type) {
            case 'label':
              return (
                <Box sx={{ marginBottom: 2 }}>
                  <FormControl error={required} required={required}>
                    <FormLabel component="legend" sx={{ marginTop: 1 }}>
                      {labelValue}
                    </FormLabel>
                  </FormControl>
                </Box>
              );
            case 'text':
              return (
                <Box sx={{ marginBottom: 2 }}>
                  <FormControl fullWidth key={id}>
                    <TextField
                      label={name}
                      variant="outlined"
                      type={subType}
                      id={name}
                      required={required}
                      helperText={customErrorMessage}
                    />
                  </FormControl>
                </Box>
              );
            case 'textarea':
              return (
                <Box sx={{ marginBottom: 2 }}>
                  <FormControl fullWidth key={id}>
                    <TextField
                      multiline
                      rows={textAreaRow}
                      label={name}
                      variant="outlined"
                      id={name}
                      required={required}
                      helperText={customErrorMessage}
                    />
                  </FormControl>
                </Box>
              );
            case 'checkbox':
              return (
                <Box sx={{ marginBottom: 2 }}>
                  <CheckboxInput
                    key={id}
                    id={id}
                    name={name}
                    checked={checked}
                    required={required}
                    customErrorMessage={customErrorMessage}
                    disabled={false}
                  />
                </Box>
              );
            case 'radio':
              return (
                <Box sx={{ marginBottom: 2 }}>
                  <FormControl>
                    <RadioGroup>
                      {options &&
                        options.map(option => (
                          <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={option}
                            sx={{
                              marginLeft: 2,
                            }}
                          />
                        ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              );
            case 'datepicker':
              return (
                <Box sx={{ marginBottom: 2 }}>
                  <FormControl key={id}>
                    <DatePicker
                      label={name}
                      onChange={() => {}}
                      renderInput={params => (
                        <TextField
                          helperText={customErrorMessage}
                          {...params}
                        />
                      )}
                    />
                  </FormControl>
                </Box>
              );
            case 'dropdown':
              return (
                <Box sx={{ marginBottom: 2 }}>
                  <DropdownInput
                    key={id}
                    id={id}
                    name={name}
                    required={required}
                    dropdownOptions={dropdownOptions}
                    customErrorMessage={customErrorMessage}
                    disabled={false}
                  />
                </Box>
              );

            default:
              return null;
          }
        }
      )}
    </Container>
  );
};

export default PreviewForm;
