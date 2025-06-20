import { useState } from 'react';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="signup form">
      <label>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}
