import { useForm } from '../hooks/useForm';

export default function LoginForm({ onLogin }) {
  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      onLogin(data.token);
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="login form">
      <input name="email" value={values.email} onChange={handleChange} aria-label="email" />
      <input name="password" type="password" value={values.password} onChange={handleChange} aria-label="password" />
      <button type="submit">Login</button>
    </form>
  );
}
