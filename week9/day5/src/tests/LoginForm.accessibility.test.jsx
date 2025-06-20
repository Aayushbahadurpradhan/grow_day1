import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import LoginForm from '../components/LoginForm';

expect.extend(toHaveNoViolations);

test('LoginForm should be accessible', async () => {
  const { container } = render(<LoginForm onLogin={() => {}} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
