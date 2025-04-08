import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload.filter
    }
  }

})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer