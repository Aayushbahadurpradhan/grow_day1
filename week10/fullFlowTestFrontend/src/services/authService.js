export function login(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'user@example.com' && password === '123456') {
        const user = { name: 'Test User', email };
        sessionStorage.setItem('token', 'fake-jwt-token');
        sessionStorage.setItem('user', JSON.stringify(user));
        resolve({ success: true, user });
      } else {
        resolve({ success: false });
      }
    }, 300); // keep small delay
  });
}


export function getUserInfo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = sessionStorage.getItem('token');
      if (token) {
        resolve({ name: 'Test User', email: 'user@example.com' });
      } else {
        resolve(null);
      }
    }, 300);
  });
}
