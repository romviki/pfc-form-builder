import { render, screen } from '@testing-library/react';
import CreateForm from './CreateForm';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

it('should render the form', () => {
  render(<CreateForm />);
  expect(screen.getByText('Create Form')).toBeInTheDocument();
});

it('should render the form canvas', () => {
  render(<CreateForm />);
  expect(screen.getByText('Canvas')).toBeInTheDocument();
});

it('should have save button', () => {
  render(<CreateForm />);
  expect(screen.getByText('Save')).toBeInTheDocument();
});
