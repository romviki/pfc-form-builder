import { DatePicker } from '@mui/lab';
import {
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Radio,
  RadioGroup,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function FormCanvas({ fields, removeField, isEdit }) {
  const switchFormControl = ({
    id,
    name,
    type,
    required,
    labelValue,
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
          <FormControl error={required} required={required}>
            <FormLabel component="legend" sx={{ marginTop: 1 }}>
              {labelValue}
            </FormLabel>
          </FormControl>
        );
      case 'text':
        return (
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
        );
      case 'textarea':
        return (
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
        );
      case 'checkbox':
        return (
          <FormControl key={id}>
            <FormLabel>{name}</FormLabel>
            {options &&
              options.map(option => (
                <FormControlLabel
                  label={option}
                  control={<Checkbox required={required} />}
                  disabled
                />
              ))}
          </FormControl>
        );
      case 'radio':
        return (
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
        );
      case 'datepicker':
        return (
          <FormControl key={id}>
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
      case 'dropdown':
        return (
          <FormControl key={id} fullWidth>
            <InputLabel id={id}>{name}</InputLabel>
            <Select labelId={id} label={name} required={required}>
              {options.map(option => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );

      default:
        return null;
    }
  };
  return (
    <>
      <Typography variant="h6" marginBottom={2}>
        Canvas
      </Typography>

      {fields.map(field => (
        <Stack direction={'row'} spacing={1} sx={{ marginBottom: 2 }}>
          {isEdit && (
            <IconButton
              disabled={!isEdit}
              aria-label="delete"
              onClick={() => removeField(field.id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {switchFormControl(field)}
        </Stack>
      ))}
    </>
  );
}

export default FormCanvas;
