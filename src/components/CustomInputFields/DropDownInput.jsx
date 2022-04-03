import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const DropdownInput = ({
  id,
  name,
  required,
  dropdownOptions,
  customErrorMessage,
  disabled,
}) => {
  const [value, setValue] = useState('');

  const onChangeHandler = e => {
    setValue(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{name}</InputLabel>
      <Select
        labelId={id}
        value={value}
        onChange={onChangeHandler}
        label={name}
        required={required}
        disabled={disabled}
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
  );
};

export default DropdownInput;
