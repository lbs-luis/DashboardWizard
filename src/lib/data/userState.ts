import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR';
  created_at: string;
}

export interface UserState {
  user: User;
  updateUser: (user: Partial<Omit<User, 'updateUser'>>) => void;
  clearUser: () => void;
}

// Ajuste o tipo de estado para incluir mutadores
const useUserState = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: '',
        name: '',
        email: '',
        role: 'OPERATOR',
        created_at: '',
      },
      updateUser: (user) => set((state) => ({
        user: { ...state.user, ...user }
      })),
      clearUser: () => set({
        user: { id: '', name: '', email: '', role: 'OPERATOR', created_at: '' }
      }),
    }),
    {
      name: 'user-storage', // Nome da chave no localStorage
      getStorage: () => localStorage, // Armazenamento que você deseja usar
    }
  )
);

export default useUserState;
