import { render, screen } from '@testing-library/react';
import NotFound from './Notfound';

// mock useNavigate
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
  Link: ({ children }) => <div>{children}</div>,
}));

it('should render not found page', () => {
  render(<NotFound />);
  expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  expect(screen.getByText('Redirect in 5 seconds')).toBeInTheDocument();
  expect(screen.getByText('Back to Homepage')).toBeInTheDocument();
});
