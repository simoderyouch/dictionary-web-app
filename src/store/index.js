import { configureStore } from '@reduxjs/toolkit'
import fontReducer from './features/fontSlice'
import wordReducer from './features/wordSlice'
export const store = configureStore({
  reducer: {
    font: fontReducer,
    data: wordReducer,
  },
})
