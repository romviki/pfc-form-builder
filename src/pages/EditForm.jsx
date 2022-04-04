import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const EditForm = () => {
  const { formId } = useParams();

  return (
    <Container>
      <div>Edit form: {formId}</div>
    </Container>
  );
};

export default EditForm;
