import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice= createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return '' // Limpia la notificación
        }
  }

})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (message, timeout) => {
    return (dispatch) => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, timeout)
    }
  }


export default notificationSlice.reducer