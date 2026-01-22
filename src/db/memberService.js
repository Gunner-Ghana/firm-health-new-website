import db from './index'

const memberService = {
  async addMember(memberData) {
    const now = new Date().toISOString()
    const maxOrder = await db.members
      .filter(m => m.type === memberData.type)
      .sortBy('order')
      .then(members => members[members.length - 1])

    const member = {
      ...memberData,
      order: maxOrder ? maxOrder.order + 1 : 0,
      createdAt: now,
      updatedAt: now,
      published: memberData.published ?? true
    }

    const id = await db.members.add(member)
    return { id, ...member }
  },

  async getAllMembers() {
    return await db.members.orderBy('order').toArray()
  },

  async getMembersByType(type) {
    return await db.members
      .filter(member => member.type === type)
      .sortBy('order')
  },

  async getPublishedMembersByType(type) {
    return await db.members
      .filter(member => member.type === type && member.published)
      .sortBy('order')
  },

  async getMemberById(id) {
    return await db.members.get(id)
  },

  async updateMember(id, updates) {
    const now = new Date().toISOString()
    await db.members.update(id, { ...updates, updatedAt: now })
    return await db.members.get(id)
  },

  async deleteMember(id) {
    await db.members.delete(id)
  },

  async reorderMembers(memberIds) {
    const updates = memberIds.map((id, index) =>
      db.members.update(id, { order: index })
    )
    await Promise.all(updates)
  }
}

export default memberService
