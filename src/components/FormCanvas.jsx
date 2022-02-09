import { FormControl, TextField, Typography } from '@mui/material';

function FormCanvas({ fields }) {
  return (
    <>
      <Typography variant="h6" marginBottom={2}>
        Canvas
      </Typography>
      {fields.map(({ id, name, type, required, minLength, maxLength }) => {
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
                />
              </FormControl>
            );
          default:
            return <></>;
        }
      })}
    </>
  );
}

export default FormCanvas;
