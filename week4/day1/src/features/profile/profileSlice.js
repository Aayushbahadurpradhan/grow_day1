import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
      throw new Error('No user data found');
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { username, password };
  }
);
const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    username: '',
    password: '',
    status: 'idle',
    error: null,
  },
  reducers: {},  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.username = action.payload.username;
        state.password = action.payload.password;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
