import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: null,
    error: false,
    loading: false,
  };
  

  export const fetchword = createAsyncThunk("word/fetch", async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response;
    } catch (error) {
      if (error.response && error.response.status) {
        return error.response;
      }
    }
  });
  
const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchword.pending, (state, action) => {
        state.error = false
      state.loading = true;
    });
    builder.addCase(fetchword.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data; 
     
      if(action.payload.status !== 200) {
        state.error = true
      }
    });
    builder.addCase(fetchword.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = true
      });
  },
});





export default wordSlice.reducer;
