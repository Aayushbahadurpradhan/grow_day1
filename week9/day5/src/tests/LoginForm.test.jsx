import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

test('login success saves token to localStorage', async () => {
  const onLogin = jest.fn();
  render(<LoginForm onLogin={onLogin} />);

  fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('password'), { target: { value: 'password' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(onLogin).toHaveBeenCalledWith('test-token');
  });
});

test('login failure shows alert', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<LoginForm onLogin={() => {}} />);

  fireEvent.change(screen.getByLabelText('email'), { target: { value: 'wrong@example.com' } });
  fireEvent.change(screen.getByLabelText('password'), { target: { value: 'wrongpass' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });
});
