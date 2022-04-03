import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';

const CheckboxInput = ({
  id,
  name,
  required,
  checked,
  customErrorMessage,
  disabled,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onChangeHandler = e => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <FormControlLabel
        label={name}
        control={
          <Checkbox
            checked={isChecked}
            required={required}
            onClick={onChangeHandler}
            disabled={disabled}
          />
        }
      />
    </>
  );
};

export default CheckboxInput;
