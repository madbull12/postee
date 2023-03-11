import React, { useRef } from "react";
import { useClickOutside } from "y/hooks/useOutsideClick";
import { useEditModal } from "y/zustand/editModal";
import Backdrop from "./Backdrop";

const EditModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { setModal } = useEditModal();
  const clickOutsidehandler = () => {
    setModal(false);
  };

  useClickOutside(modalRef, clickOutsidehandler);
  return (
    <Backdrop>
      <div
        ref={modalRef}
        className="mx-auto h-[500px] w-3/4 overflow-y-scroll  rounded-2xl bg-neutral-900  text-white sm:w-1/2"
      >
        <h1 className="p-4 text-center text-2xl font-bold">Edit modal</h1>
      </div>
    </Backdrop>
  );
};

export default EditModal;
