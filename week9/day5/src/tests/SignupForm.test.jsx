import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '../components/SignupForm';

test('signup success shows message', async () => {
  render(<SignupForm />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@mail.com' } });
  fireEvent.click(screen.getByText(/sign up/i));

  await waitFor(() => {
    expect(screen.getByText(/signup successful/i)).toBeInTheDocument();
  });
});
