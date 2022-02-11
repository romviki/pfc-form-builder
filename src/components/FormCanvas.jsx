import { DatePicker } from '@mui/lab';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';

function FormCanvas({ fields }) {
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
          validation: {
            required,
            min,
            max,
            minLength,
            maxLength,
            beforeDate,
            afterDate,
            customErrorMessage,
          },
        }) => {
          switch (type) {
            case 'text':
              return (
                <FormControl fullWidth key={id} sx={{ marginBottom: 2 }}>
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
              );
            case 'textarea':
              return (
                <FormControl fullWidth key={id} sx={{ marginBottom: 2 }}>
                  <TextField
                    multiline
                    rows={4}
                    label={name}
                    variant="outlined"
                    id={name}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                    disabled
                    helperText={customErrorMessage}
                  />
                </FormControl>
              );
            case 'checkbox':
              return (
                <FormControlLabel
                  key={id}
                  label={name}
                  control={<Checkbox />}
                  disabled
                  sx={{ marginBottom: 2 }}
                />
              );
            case 'datepicker':
              return (
                <FormControl key={id} sx={{ marginBottom: 2 }}>
                  <DatePicker
                    label={name}
                    onChange={() => {}}
                    renderInput={params => (
                      <TextField helperText={customErrorMessage} {...params} />
                    )}
                    disabled
                  />
                </FormControl>
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
