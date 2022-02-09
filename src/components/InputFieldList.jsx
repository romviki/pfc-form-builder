import { Grid, Typography } from '@mui/material';
import InputFieldModal from './InputFieldModal';

function InputFieldList({ addField }) {
  return (
    <Grid item xs={2} sx={{ borderRight: 1, borderColor: 'grey.500' }}>
      <Typography variant="h6" marginBottom={2}>
        Inputs
      </Typography>

      <InputFieldModal title="TextField" type="text" addField={addField} />

      <InputFieldModal title="Textarea" type="textarea" addField={addField} />

      {/* List of Inputs */}
    </Grid>
  );
}

export default InputFieldList;
