export default (set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: false,

  login: (email, password) => {
    const user = JSON.parse(localStorage.getItem('user')); 
    if (user && user.email === email && user.password === password) {
      set({ user, isLoggedIn: true }); 
    } else {
      alert('Invalid email or password');
    }
  },

  logout: () => {
    set({ user: null, isLoggedIn: false }); 
  },

  register: (email, password, name) => {
    const newUser = { email, password, name, id: Date.now() };
    localStorage.setItem('user', JSON.stringify(newUser));
    set({ user: newUser, isLoggedIn: true });
  },


  clearUser: () => {
    set({ user: null, isLoggedIn: false });
  },
});
