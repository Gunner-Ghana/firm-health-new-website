import db from './index'

export const volunteerService = {
  async addVolunteer(data) {
    const volunteer = {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending',
      profileImage: null,
      showOnWebsite: false
    }
    const id = await db.volunteers.add(volunteer)
    return { id, ...volunteer }
  },

  async getAllVolunteers() {
    return await db.volunteers.toArray()
  },

  async getApprovedVolunteers() {
    return await db.volunteers
      .where('status')
      .equals('approved')
      .and(v => v.showOnWebsite === true)
      .toArray()
  },

  async getVolunteerByEmail(email) {
    return await db.volunteers.where('email').equals(email).first()
  },

  async emailExists(email) {
    const count = await db.volunteers.where('email').equals(email).count()
    return count > 0
  },

  async deleteVolunteer(id) {
    return await db.volunteers.delete(id)
  },

  async getVolunteerCount() {
    return await db.volunteers.count()
  },

  async getApprovedVolunteerCount() {
    return await db.volunteers
      .where('status')
      .equals('approved')
      .count()
  },

  async updateVolunteer(id, data) {
    return await db.volunteers.update(id, data)
  },

  async updateProfileImage(id, imageData) {
    return await db.volunteers.update(id, { profileImage: imageData })
  },

  async toggleShowOnWebsite(id, show) {
    return await db.volunteers.update(id, { showOnWebsite: show })
  }
}

export default volunteerService
