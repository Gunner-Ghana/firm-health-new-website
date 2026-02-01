import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db'
import sponsorService from '../db/sponsorService'

export function useSponsors() {
  return useLiveQuery(() => db.sponsors.orderBy('order').toArray())
}

export function usePublishedSponsors() {
  return useLiveQuery(
    () => db.sponsors.orderBy('order').toArray().then(all => all.filter(s => s.published))
  )
}

export function useSponsorCount() {
  return useLiveQuery(() => db.sponsors.count())
}

export { sponsorService }
