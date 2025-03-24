import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'


const initialState={
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  :[]
}


export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addTopaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Succesfully")
      
    },
    updateTopaste: (state, action) => {
      const paste= action.payload;
      const index = state.pastes.findIndex((item)=>
      item._id === paste._id);
      
      if(index >=0){
        state.pastes[index] = paste;

        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("Paste Updated");
      }

    },
    resetAllpaste: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");

    },
    removeFrompaste: (state, action) => {
      
        const idToRemove = action.payload;
        state.pastes = state.pastes.filter((item) => item && item._id !== idToRemove);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted Successfully");
      
      

    },
  },
})

// Action creators are generated for each case reducer function
export const { addTopaste, updateTopaste, removeFrompaste, resetAllpaste } = pasteSlice.actions;

export default pasteSlice.reducer