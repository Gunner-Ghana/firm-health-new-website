import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db'
import photoService from '../db/photoService'

export function usePhotos() {
  return useLiveQuery(() => db.photos.orderBy('order').toArray(), [])
}

export function usePublishedPhotos() {
  return useLiveQuery(
    () => db.photos.filter(photo => photo.published).sortBy('order'),
    []
  )
}

export function usePhotoCount() {
  return useLiveQuery(() => db.photos.count(), [])
}

export { photoService }
