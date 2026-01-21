import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appReducer from './slices/appSlice'
import volunteerReducer from './slices/volunteerSlice'
import authReducer from './slices/authSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'volunteer', 'auth'],
}

const rootReducer = combineReducers({
  app: appReducer,
  volunteer: volunteerReducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
