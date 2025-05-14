import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createAuthSlice from './authSlice';
import createCartSlice from './cartSlice';
import createUiSlice from './uiSlice';

const useStore = create(devtools((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
  ...createUiSlice(...a),
})));

export default useStore;
