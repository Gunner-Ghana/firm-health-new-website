import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db'
import eventService from '../db/eventService'

export function useEvents() {
  return useLiveQuery(() => db.events.orderBy('date').toArray(), [])
}

export function usePublishedEvents() {
  return useLiveQuery(
    () => db.events.filter(event => event.published).sortBy('date'),
    []
  )
}

export function useUpcomingEvents() {
  const today = new Date().toISOString().split('T')[0]
  return useLiveQuery(
    () => db.events
      .filter(event => event.published && event.date >= today)
      .sortBy('date'),
    []
  )
}

export function useEventCount() {
  return useLiveQuery(() => db.events.count(), [])
}

export { eventService }
