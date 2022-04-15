import { Typography } from '@mui/material';
import InputFieldModal from './CustomInputFieldModals/InputFieldModal';
import CheckboxModal from './CustomInputFieldModals/CheckboxModal';
import DropdownModal from './CustomInputFieldModals/DropdownModal';
import TextFieldModal from './CustomInputFieldModals/TextFieldModal';
import TextAreaModal from './CustomInputFieldModals/TextAreaModal';
import LabelModal from './CustomInputFieldModals/LabelModal';
import MultiChoiceModal from './CustomInputFieldModals/MultiChoiceModal';
import DatePickerModal from './CustomInputFieldModals/DatePickerModel';

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

      <MultiChoiceModal 
        title="Checkbox"
        type="checkbox"
        addField={addField}
      />

      <MultiChoiceModal
        title="Radio Buttons"
        type="radio"
        addField={addField}
      />

      <DatePickerModal
        title="Date Picker"
        type="datepicker"
        addField={addField}
      />

      <MultiChoiceModal
        title="Dropdown"
        type="dropdown"
        addField={addField} 
      />
    </>
  );
}

export default InputFieldList;
