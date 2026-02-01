import Dexie from 'dexie'

export const db = new Dexie('HealthNGODatabase')

db.version(8).stores({
  volunteers: '++id, email, firstName, lastName, createdAt, status, profileImage, showOnWebsite, biography',
  blogs: '++id, title, slug, createdAt, updatedAt, published',
  events: '++id, title, date, createdAt, updatedAt, published, type',
  interventions: '++id, title, slug, createdAt, updatedAt, published, order',
  photos: '++id, title, category, createdAt, published, order',
  members: '++id, name, type, createdAt, updatedAt, published, order'
})

db.version(9).stores({
  volunteers: '++id, email, firstName, lastName, createdAt, status, profileImage, showOnWebsite, biography',
  blogs: '++id, title, slug, createdAt, updatedAt, published',
  events: '++id, title, date, createdAt, updatedAt, published, type',
  interventions: '++id, title, slug, createdAt, updatedAt, published, order',
  photos: '++id, title, category, createdAt, published, order',
  members: '++id, name, type, createdAt, updatedAt, published, order',
  sponsors: '++id, name, createdAt, updatedAt, published, order'
})

export default db
