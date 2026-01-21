import { createSlice } from '@reduxjs/toolkit'

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

const initialState = {
  isAuthenticated: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        state.isAuthenticated = true
        state.error = null
      } else {
        state.isAuthenticated = false
        state.error = 'Invalid username or password'
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { login, logout, clearError } = authSlice.actions

export default authSlice.reducer
