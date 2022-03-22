import { Typography } from '@mui/material';
import InputFieldModal from './CustomInputFieldModals/InputFieldModal';
import CheckboxModal from './CustomInputFieldModals/CheckboxModal';
import DropdownModal from './CustomInputFieldModals/DropdownModal';
import TextFieldModal from './CustomInputFieldModals/TextFieldModal';
import TextAreaModal from './CustomInputFieldModals/TextAreaModal';
import LabelModal from './CustomInputFieldModals/LabelModal';
import RadioModal from './CustomInputFieldModals/RadioModal';

function InputFieldList({ addField }) {
  return (
    <>
      <Typography variant="h6" marginBottom={2}>
        Inputs
      </Typography>

      <LabelModal title="Label" type="label" addField={addField} />
      {/* List of Inputs */}
      <TextFieldModal title="Text Field" type="text" addField={addField} />

      <TextAreaModal title="Text Area" type="textarea" addField={addField} />

      <CheckboxModal title="Checkbox" type="checkbox" addField={addField} />

      <RadioModal
        title="Radio Buttons"
        type="radio"
        addField={addField}
      />

      <InputFieldModal
        title="Date picker"
        type="datepicker"
        addField={addField}
      />

      <DropdownModal title="Dropdown" type="dropdown" addField={addField} />
    </>
  );
}

export default InputFieldList;
