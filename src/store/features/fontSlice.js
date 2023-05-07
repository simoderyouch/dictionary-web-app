import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  font: "Sans-serif" ,
}

export const fontSlice = createSlice({
  name: 'font',
  initialState,
  reducers: {
    change: (state,action) => {
  
      state.font = action.payload;
    },
 
  },
})

// Action creators are generated for each case reducer function
export const { change } = fontSlice.actions

export default fontSlice.reducer