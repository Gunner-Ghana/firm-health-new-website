import db from './index'

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const interventionService = {
  async addIntervention(data) {
    const count = await db.interventions.count()
    const intervention = {
      ...data,
      slug: generateSlug(data.title),
      order: data.order ?? count + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: data.published || false
    }
    const id = await db.interventions.add(intervention)
    return { id, ...intervention }
  },

  async getAllInterventions() {
    return await db.interventions.orderBy('order').toArray()
  },

  async getPublishedInterventions() {
    const interventions = await db.interventions
      .filter(intervention => intervention.published)
      .toArray()
    return interventions.sort((a, b) => a.order - b.order)
  },

  async getInterventionById(id) {
    return await db.interventions.get(id)
  },

  async getInterventionBySlug(slug) {
    return await db.interventions.where('slug').equals(slug).first()
  },

  async updateIntervention(id, data) {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    }
    if (data.title) {
      updateData.slug = generateSlug(data.title)
    }
    return await db.interventions.update(id, updateData)
  },

  async deleteIntervention(id) {
    return await db.interventions.delete(id)
  },

  async getInterventionCount() {
    return await db.interventions.count()
  },

  async reorderInterventions(orderedIds) {
    const updates = orderedIds.map((id, index) =>
      db.interventions.update(id, { order: index + 1, updatedAt: new Date().toISOString() })
    )
    return Promise.all(updates)
  }
}

export default interventionService
