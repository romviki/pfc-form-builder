import CopyClipBoardIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuButton from '../components/MenuButton';
import { FormsContext } from '../context/FormsContext';
import useFetch from '../hooks/useFetch';
import useShareForm from '../hooks/useShareForm';

function Dashboard() {
  const { forms, dispatch } = useContext(FormsContext);
  const { data, error } = useFetch('/api/forms', {}, true);
  const { copyLinkToClipboard } = useShareForm();
  const { executeFetch } = useFetch('/api/forms', { method: 'DELETE' }, false);

  const navigate = useNavigate();

  const deleteForm = async form => {
    if (form._id) {
      const confirmed = window.confirm('Are you sure to discard the form?');

      if (confirmed) {
        await executeFetch(null, form._id);
        dispatch({ type: 'DELETE_FORM', payload: form._id });
      }

      return;
    }
  };

  const shareForm = async formId => {
    if (formId) {
      await copyLinkToClipboard(formId);
      window.alert('Form link copied to clipboard');
    }
  };

  useEffect(() => {
    const initialForms = () => {
      if (error) {
        dispatch({ type: 'GET_FORMS', payload: [] });
      } else if (data) {
        dispatch({ type: 'GET_FORMS', payload: data });
      }
    };

    initialForms();
  }, [data, dispatch, error]);

  return (
    <Container>
      <Grid container justifyContent="space-between">
        <Typography variant="h2">Forms</Typography>
        <Box alignSelf="center">
          <Button variant="contained" component={RouterLink} to="/create">
            Create
          </Button>
        </Box>
      </Grid>

      {/* TODO: refactor to Cards */}
      {forms.map(form => (
        <Stack direction="row" alignItems="center" key={form._id}>
          <MenuButton>
            <MenuItem aria-label="delete" onClick={() => deleteForm(form)}>
              <DeleteIcon />
            </MenuItem>

            <MenuItem
              sx={{ minWidth: 'unset' }}
              size="small"
              aria-label="edit"
              onClick={() => navigate(`/forms/${form._id}`)}
            >
              <EditIcon />
            </MenuItem>

            <MenuItem
              sx={{ minWidth: 'unset' }}
              size="small"
              aria-label="Copy Link"
              onClick={() => shareForm(form._id)}
            >
              <CopyClipBoardIcon />
            </MenuItem>
          </MenuButton>

          <Link
            underline="none"
            component={RouterLink}
            to={`/forms/${form._id}`}
            fontSize="18px"
          >
            {form.name}
          </Link>
        </Stack>
      ))}
    </Container>
  );
}

export default Dashboard;
