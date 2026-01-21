import db from './index'

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const blogService = {
  async addBlog(data) {
    const blog = {
      ...data,
      slug: generateSlug(data.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: data.published || false
    }
    const id = await db.blogs.add(blog)
    return { id, ...blog }
  },

  async getAllBlogs() {
    return await db.blogs.orderBy('createdAt').reverse().toArray()
  },

  async getPublishedBlogs() {
    return await db.blogs
      .where('published')
      .equals(1)
      .reverse()
      .sortBy('createdAt')
  },

  async getBlogById(id) {
    return await db.blogs.get(id)
  },

  async getBlogBySlug(slug) {
    return await db.blogs.where('slug').equals(slug).first()
  },

  async updateBlog(id, data) {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    }
    if (data.title) {
      updateData.slug = generateSlug(data.title)
    }
    return await db.blogs.update(id, updateData)
  },

  async deleteBlog(id) {
    return await db.blogs.delete(id)
  },

  async getBlogCount() {
    return await db.blogs.count()
  },

  async getPublishedBlogCount() {
    return await db.blogs.where('published').equals(1).count()
  }
}

export default blogService
