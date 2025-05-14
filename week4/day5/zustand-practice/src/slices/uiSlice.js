const createUiSlice = (set) => ({
  modalOpen: false,
  toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),

  totalCompletedTodos: 0,
  setTotalCompletedTodos: (count) => set(() => ({ totalCompletedTodos: count })),
});

export default createUiSlice;
