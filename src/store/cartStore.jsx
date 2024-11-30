import { create } from 'zustand';  // default export가 아닌 create를 직접 가져옵니다.
import cartItems from '../constants/cartItems'; // 기존 아이템 데이터

// Zustand store 설정
const useCartStore = create((set) => ({
  cart: cartItems,
  addItem: (item) => set((state) => ({
    cart: [...state.cart, item],
  })),
  removeItem: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id),
  })),
  updateAmount: (id, amount) => set((state) => ({
    cart: state.cart.map(item => 
      item.id === id ? { ...item, amount } : item
    ),
  })),
}));

export default useCartStore;
