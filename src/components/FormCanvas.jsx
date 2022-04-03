import { DatePicker } from '@mui/lab';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Radio,
  RadioGroup,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DropdownInput from './CustomInputFields/DropDownInput';
import CheckboxInput from './CustomInputFields/CheckboxInput';

function FormCanvas({ fields, removeField }) {
  return (
    <>
      <Typography variant="h6" marginBottom={2}>
        Canvas
      </Typography>

      {fields.map(
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
                <Stack
                  key={id}
                  direction={'row'}
                  spacing={1}
                  sx={{ marginBottom: 2 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeField(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <FormControl error={required} required={required}>
                    <FormLabel component="legend" sx={{ marginTop: 1 }}>
                      {labelValue}
                    </FormLabel>
                  </FormControl>
                </Stack>
              );
            case 'text':
              return (
                <Stack
                  key={id}
                  direction={'row'}
                  spacing={1}
                  sx={{ marginBottom: 2 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeField(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <FormControl fullWidth key={id}>
                    <TextField
                      label={name}
                      variant="outlined"
                      type={subType}
                      id={name}
                      disabled
                      required={required}
                      helperText={customErrorMessage}
                    />
                  </FormControl>
                </Stack>
              );
            case 'textarea':
              return (
                <Stack
                  key={id}
                  direction={'row'}
                  spacing={1}
                  sx={{ marginBottom: 2 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeField(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <FormControl fullWidth key={id}>
                    <TextField
                      multiline
                      rows={textAreaRow}
                      label={name}
                      variant="outlined"
                      id={name}
                      required={required}
                      helperText={customErrorMessage}
                      disabled
                    />
                  </FormControl>
                </Stack>
              );
            case 'checkbox':
              return (
                <Stack
                  key={id}
                  direction={'row'}
                  spacing={1}
                  sx={{ marginBottom: 2 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeField(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <CheckboxInput
                    id={id}
                    name={name}
                    checked={checked}
                    required={required}
                    customErrorMessage={customErrorMessage}
                    disabled={true}
                  />
                </Stack>
              );
            case 'radio':
              return (
                <Stack
                  key={id}
                  direction={'row'}
                  spacing={1}
                  sx={{ marginBottom: 2 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeField(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <FormControl>
                    <FormLabel>{name}</FormLabel>
                    <RadioGroup>
                      {options &&
                        options.map(option => (
                          <FormControlLabel
                            value={option}
                            control={<Radio />}
                            label={option}
                            disabled
                            sx={{
                              marginLeft: 2,
                            }}
                          />
                        ))}
                    </RadioGroup>
                  </FormControl>
                </Stack>
              );
            case 'datepicker':
              return (
                <Stack
                  key={id}
                  direction={'row'}
                  spacing={1}
                  sx={{ marginBottom: 2 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeField(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
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
                      disabled
                    />
                  </FormControl>
                </Stack>
              );
            case 'dropdown':
              return (
                <Stack
                  key={id}
                  direction={'row'}
                  spacing={1}
                  sx={{ marginBottom: 2 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeField(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <DropdownInput
                    key={id}
                    id={id}
                    name={name}
                    required={required}
                    dropdownOptions={dropdownOptions}
                    customErrorMessage={customErrorMessage}
                    disabled={true}
                  />
                </Stack>
              );

            default:
              return null;
          }
        }
      )}
    </>
  );
}

export default FormCanvas;
