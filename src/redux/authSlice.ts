import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: {
    email: string;
    password: string;
    role: string;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};
// token: localStorage.getItem('token'),

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload);
    },
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      if (action.payload?.role) {
        localStorage.setItem('role', action.payload.role);
      }
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});

export const { setToken, setUser, clearToken } = authSlice.actions;
export default authSlice.reducer;
