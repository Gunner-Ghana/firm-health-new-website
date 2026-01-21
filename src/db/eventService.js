import db from './index'

export const eventService = {
  async addEvent(data) {
    const event = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: data.published || false
    }
    const id = await db.events.add(event)
    return { id, ...event }
  },

  async getAllEvents() {
    return await db.events.orderBy('date').toArray()
  },

  async getPublishedEvents() {
    const events = await db.events
      .filter(event => event.published)
      .toArray()
    return events.sort((a, b) => new Date(a.date) - new Date(b.date))
  },

  async getUpcomingEvents() {
    const today = new Date().toISOString().split('T')[0]
    const events = await db.events
      .filter(event => event.published && event.date >= today)
      .toArray()
    return events.sort((a, b) => new Date(a.date) - new Date(b.date))
  },

  async getEventById(id) {
    return await db.events.get(id)
  },

  async updateEvent(id, data) {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    }
    return await db.events.update(id, updateData)
  },

  async deleteEvent(id) {
    return await db.events.delete(id)
  },

  async getEventCount() {
    return await db.events.count()
  },

  async getPublishedEventCount() {
    return await db.events.filter(event => event.published).count()
  }
}

export default eventService
