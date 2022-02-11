import { Grid, Typography } from '@mui/material';
import InputFieldModal from './InputFieldModal';

function InputFieldList({ addField }) {
  return (
    <Grid item xs={2} sx={{ borderRight: 1, borderColor: 'grey.500' }}>
      <Typography variant="h6" marginBottom={2}>
        Inputs
      </Typography>

      {/* List of Inputs */}
      <InputFieldModal title="Text Field" type="text" addField={addField} />

      <InputFieldModal title="Text Area" type="textarea" addField={addField} />

      <InputFieldModal title="Checkbox" type="checkbox" addField={addField} />

      <InputFieldModal
        title="Radio buttons"
        type="radioButtons"
        addField={addField}
      />

      <InputFieldModal
        title="Date picker"
        type="datepicker"
        addField={addField}
      />

      <InputFieldModal title="Dropdown" type="dropdown" addField={addField} />
    </Grid>
  );
}

export default InputFieldList;
