import { useDispatch, useSelector } from 'react-redux'

/**
 * Custom hook for dispatching Redux actions
 * Use this throughout the app instead of plain useDispatch
 */
export const useAppDispatch = () => useDispatch()

/**
 * Custom hook for selecting state from Redux store
 * Use this throughout the app instead of plain useSelector
 * @param {Function} selector - Selector function to extract state
 */
export const useAppSelector = (selector) => useSelector(selector)

/**
 * Custom hook for accessing app state (UI, theme, notifications)
 */
export const useAppState = () => {
  return useAppSelector((state) => state.app)
}

/**
 * Custom hook for accessing volunteer form state
 */
export const useVolunteerState = () => {
  return useAppSelector((state) => state.volunteer)
}

/**
 * Custom hook for accessing auth state
 */
export const useAuthState = () => {
  return useAppSelector((state) => state.auth)
}
