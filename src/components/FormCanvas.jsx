import { DatePicker } from '@mui/lab';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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
          dropdownOptions,
          min,
          max,
          minLength,
          maxLength,
          beforeDate,
          afterDate,
          customErrorMessage,
        }) => {
          switch (type) {
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
                      id={name}
                      disabled
                      required={required}
                      minLength={minLength}
                      maxLength={maxLength}
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
                      rows={4}
                      label={name}
                      variant="outlined"
                      id={name}
                      required={required}
                      minLength={minLength}
                      maxLength={maxLength}
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
                  <FormControlLabel
                    key={id}
                    label={name}
                    control={<Checkbox checked={checked} required={required} />}
                    disabled
                  />
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
                  <FormControl key={id} fullWidth>
                    <InputLabel id={id}>{name}</InputLabel>
                    <Select
                      labelId={id}
                      label={name}
                      required={required}
                      disabled
                    >
                      {dropdownOptions.map(option => {
                        return (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
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
