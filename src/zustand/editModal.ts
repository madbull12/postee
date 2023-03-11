import { create } from 'zustand'
interface Modal {
  modal: boolean;
  setModal: (value: boolean) => void;
}
export const useEditModal = create<Modal>((set) => ({
  modal: false,
  setModal: (value: boolean) => set(() => ({ modal: value })),
}));
