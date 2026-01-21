import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db'
import blogService from '../db/blogService'

export function useBlogs() {
  return useLiveQuery(() => db.blogs.orderBy('createdAt').reverse().toArray(), [])
}

export function usePublishedBlogs() {
  return useLiveQuery(
    () => db.blogs.filter(blog => blog.published).reverse().sortBy('createdAt'),
    []
  )
}

export function useBlogCount() {
  return useLiveQuery(() => db.blogs.count(), [])
}

export { blogService }
