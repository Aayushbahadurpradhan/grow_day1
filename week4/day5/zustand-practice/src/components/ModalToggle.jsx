import React from 'react';
import useStore from '../slices/store';

const ModalToggle = () => {
  const modalOpen = useStore((state) => state.modalOpen);
  const toggleModal = useStore((state) => state.toggleModal);

  return (
    <div>
      <h2>Modal State</h2>
      <p>{modalOpen ? "Modal is Open" : "Modal is Closed"}</p>
      <button onClick={toggleModal}>Toggle Modal</button>
    </div>
  );
};

export default ModalToggle;
