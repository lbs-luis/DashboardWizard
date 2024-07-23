import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Store {
  id: string;
  store_custom_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  manager_id: string;
}

export interface StoreState {
  store: Store;
  updateStore: (store: Partial<Omit<Store, 'updateStore'>>) => void;
  clearStore: () => void;
}

const useStoreState = create<StoreState>()(
  persist(
    (set) => ({
      store: {
        id: '',
        store_custom_id: '',
        name: '',
        description: '',
        created_at: '',
        updated_at: '',
        manager_id: '',
      },
      updateStore: (store) => set((state) => ({
        store: { ...state.store, ...store }
      })),
      clearStore: () => set({
        store: {
          id: '',
          store_custom_id: '',
          name: '',
          description: '',
          created_at: '',
          updated_at: '',
          manager_id: '',
        }
      }),
    }),
    {
      name: 'store-storage', // Nome da chave no localStorage
      getStorage: () => localStorage, // Armazenamento que você deseja usar
    }
  )
);

export default useStoreState;
