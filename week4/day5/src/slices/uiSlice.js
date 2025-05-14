export default (set) => ({
  modalOpen: false,
  toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),
});
