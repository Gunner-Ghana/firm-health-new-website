import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import db from './db'
import { seedDatabase } from './db/seedData'
import './index.css'
import App from './App.jsx'

// Initialize database with seed data from firmhealthghana.com
async function initDatabase() {
  try {
    await db.delete()
    await db.open()
    await seedDatabase()
  } catch (error) {
    console.error('Database initialization error:', error)
  }
}

initDatabase().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>,
  )
})
