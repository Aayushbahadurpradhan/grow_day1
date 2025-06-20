import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '../hooks/useForm';

test('should update form values', () => {
  const { result } = renderHook(() => useForm({ email: '' }));

  act(() => {
    result.current.handleChange({ target: { name: 'email', value: 'test@test.com' } });
  });

  expect(result.current.values.email).toBe('test@test.com');
});
