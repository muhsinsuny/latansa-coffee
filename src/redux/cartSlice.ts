import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  tableNumber: number;
  image_url: string;
  price: number;
  quantity: number;
  notes: string;
}

interface CartState {
  items: CartItem[];
  selectedItemId: string;
}

const initialState: CartState = {
  items: [],
  selectedItemId: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    onIncrement: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      }
    },
    onDecrement: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0 && state.items[itemIndex].quantity >= 1) {
        state.items[itemIndex].quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setSelectedItemId: (state, action: PayloadAction<string>) => {
      state.selectedItemId = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  onIncrement,
  onDecrement,
  removeFromCart,
  setSelectedItemId,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
