import { create } from "zustand";
interface Modal {
  modal: boolean;
  setModal: (value: boolean) => void;
}

interface PostIdStore {
  postId: string;
  setPostId: (value: string) => void;
}
export const useEditModal = create<Modal>((set) => ({
  modal: false,
  setModal: (value: boolean) => set(() => ({ modal: value })),
}));

export const usePostId = create<PostIdStore>((set) => ({
  postId: "",
  setPostId: (value: string) => set(() => ({ postId: value })),
}));
