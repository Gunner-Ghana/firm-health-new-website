import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMobileMenuOpen: false,
  theme: 'light',
  isLoading: false,
  notification: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    clearNotification: (state) => {
      state.notification = null
    },
  },
})

export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  setTheme,
  setLoading,
  setNotification,
  clearNotification,
} = appSlice.actions

export default appSlice.reducer
