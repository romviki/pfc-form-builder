import { render, screen } from '@testing-library/react';
import PreviewForm from './PreviewForm';

// mock useNavigate
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
  useParams: () => ({
    formId: '1',
  }),
  Link: ({ children }) => <div>{children}</div>,
}));

// mock useContext
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    forms: [
      {
        id: '1',
        name: 'Form 1',
      },
    ],
    dispatch: jest.fn(),
  }),
}));

// mock MUI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Button: ({ children }) => <button>{children}</button>,
  Container: ({ children }) => <div>{children}</div>,
  Grid: ({ children }) => <div>{children}</div>,
  Stack: ({ children }) => <div>{children}</div>,
  TextField: ({ children, ...rest }) => <div {...rest}>{children}</div>,
  Typography: ({ children }) => <div>{children}</div>,
}));

// mock MUI system components
jest.mock('@mui/system', () => ({
  ...jest.requireActual('@mui/system'),
  Box: ({ children }) => <div>{children}</div>,
}));

// mock MuiIconButton component
jest.mock('@mui/material/IconButton', () => ({
  __esModule: true,
  default: ({ children, ...rest }) => <div {...rest}>{children}</div>,
}));

// mock MuiSvgIcon component
jest.mock('@mui/material/SvgIcon', () => ({
  __esModule: true,
  default: () => 'SvgIcon',
}));

// mock useFetch
jest.mock('../hooks/useFetch', () => ({
  __esModule: true,
  default: () => ({
    data: {
      id: '1',
      name: 'Form 1',
      fields: [
        {
          id: '1',
          name: 'Field 1',
          type: 'text',
          required: true,
        },
      ],
    },
    error: null,
  }),
}));

// mock FormCanvas component
jest.mock('../components/FormCanvas', () => ({
  __esModule: true,
  default: () => 'FormCanvas',
}));

it('should render the preview form', () => {
  render(<PreviewForm />);
  expect(screen.getByText('Form 1')).toBeInTheDocument();
});
