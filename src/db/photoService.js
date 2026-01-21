import db from './index'

const photoService = {
  async addPhoto(photoData) {
    const now = new Date().toISOString()
    const maxOrder = await db.photos.orderBy('order').last()

    const photo = {
      ...photoData,
      order: maxOrder ? maxOrder.order + 1 : 0,
      createdAt: now,
      published: photoData.published ?? true
    }

    const id = await db.photos.add(photo)
    return { id, ...photo }
  },

  async getAllPhotos() {
    return await db.photos.orderBy('order').toArray()
  },

  async getPublishedPhotos() {
    return await db.photos
      .filter(photo => photo.published)
      .sortBy('order')
  },

  async getPhotoById(id) {
    return await db.photos.get(id)
  },

  async updatePhoto(id, updates) {
    await db.photos.update(id, updates)
    return await db.photos.get(id)
  },

  async deletePhoto(id) {
    await db.photos.delete(id)
  },

  async reorderPhotos(photoIds) {
    const updates = photoIds.map((id, index) =>
      db.photos.update(id, { order: index })
    )
    await Promise.all(updates)
  }
}

export default photoService
