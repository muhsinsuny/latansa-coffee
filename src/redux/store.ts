import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from '../features/auth/authSlice';
import dialogReducer from './dialogSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
