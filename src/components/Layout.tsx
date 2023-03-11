import React, { useEffect } from 'react'
import { useEditModal } from 'y/zustand/editModal';
import EditModal from './EditModal';
import Navbar from './Navbar'

const Layout = ({ children }:{ children:React.ReactNode }) => {
  const { modal: editModal } = useEditModal();
  useEffect(()=>{
    if(editModal) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  },[editModal])
  return (
    <main>
      {editModal ? <EditModal /> : null}
        <Navbar />
        {children}
    </main>
  )
}

export default Layout