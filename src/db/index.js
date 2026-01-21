import Dexie from 'dexie'

export const db = new Dexie('HealthNGODatabase')

db.version(7).stores({
  volunteers: '++id, email, firstName, lastName, createdAt, status, profileImage, showOnWebsite, biography',
  blogs: '++id, title, slug, createdAt, updatedAt, published',
  events: '++id, title, date, createdAt, updatedAt, published, type',
  interventions: '++id, title, slug, createdAt, updatedAt, published, order',
  photos: '++id, title, category, createdAt, published, order'
})

export default db
