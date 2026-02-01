import db from './index'

const sponsorService = {
  async addSponsor(sponsorData) {
    const now = new Date().toISOString()
    const allSponsors = await db.sponsors.orderBy('order').toArray()
    const maxOrder = allSponsors.length > 0 ? allSponsors[allSponsors.length - 1].order + 1 : 0

    const sponsor = {
      ...sponsorData,
      order: maxOrder,
      createdAt: now,
      updatedAt: now,
      published: sponsorData.published ?? true
    }

    const id = await db.sponsors.add(sponsor)
    return { id, ...sponsor }
  },

  async getAllSponsors() {
    return await db.sponsors.orderBy('order').toArray()
  },

  async getPublishedSponsors() {
    const all = await db.sponsors.orderBy('order').toArray()
    return all.filter(s => s.published)
  },

  async getSponsorById(id) {
    return await db.sponsors.get(id)
  },

  async updateSponsor(id, updates) {
    const now = new Date().toISOString()
    await db.sponsors.update(id, { ...updates, updatedAt: now })
    return await db.sponsors.get(id)
  },

  async deleteSponsor(id) {
    await db.sponsors.delete(id)
  },

  async reorderSponsors(sponsorIds) {
    const updates = sponsorIds.map((id, index) =>
      db.sponsors.update(id, { order: index })
    )
    await Promise.all(updates)
  }
}

export default sponsorService
