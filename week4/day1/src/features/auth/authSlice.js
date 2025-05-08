import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('token');
const usernameFromStorage = localStorage.getItem('username');
const passwordFromStorage = localStorage.getItem('password');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage,
    isAuthenticated: !!tokenFromStorage,
    username: usernameFromStorage || '',
    password: passwordFromStorage || '',
  },
  reducers: {
    login: (state, action) => {
      const { token, username, password } = action.payload;
      state.token = token;
      state.username = username;
      state.password = password;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    },
    logout: (state) => {
      state.token = null;
      state.username = '';
      state.password = '';
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
