import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SignupForm from '../components/SignupForm';

expect.extend(toHaveNoViolations);

test('SignupForm should be accessible', async () => {
  const { container } = render(<SignupForm onSignup={() => {}} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
