import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  modalOpen: boolean;
}

const initialState: initialStateType = {
  modalOpen: false,
};

export const modalReducer = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: state => {
      state.modalOpen = true;
    },
    closeModal: state => {
      state.modalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalReducer.actions;

export default modalReducer.reducer;
