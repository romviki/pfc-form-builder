import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

// mock the useFetch hook
jest.mock('../hooks/useFetch', () => ({
  __esModule: true,
  default: () => ({
    data: [
      {
        id: 1,
        name: 'Form 1',
      },
      {
        id: 2,
        name: 'Form 2',
      },
    ],
    error: null,
  }),
}));

// mock the useContext hook
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
  Container: ({ children }) => <div>{children}</div>,
  Grid: ({ children }) => <div>{children}</div>,
  Typography: ({ children, ...rest }) => <div {...rest}>{children}</div>,
  Box: ({ children }) => <div>{children}</div>,
  Button: ({ children }) => <div>{children}</div>,
  Link: ({ children }) => <div>{children}</div>,
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

it('should render the dashboard', () => {
  render(<Dashboard />);

  expect(screen.getByText('Forms')).toBeInTheDocument();
  expect(screen.getByText('Form 1')).toBeInTheDocument();
});
