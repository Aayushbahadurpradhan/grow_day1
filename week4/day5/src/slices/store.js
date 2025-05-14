import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import authSlice from './authSlice';
import cartSlice from './cartSlice';
import uiSlice from './uiSlice';
import todoSlice from './todoSlice';

const useBoundStore = create(
  devtools((set, get) => ({
    ...authSlice(set, get),
    ...cartSlice(set, get),
    ...uiSlice(set, get),
    ...todoSlice(set, get),
  }))
);

export default useBoundStore;
