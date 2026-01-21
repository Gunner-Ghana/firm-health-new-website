import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db'
import volunteerService from '../db/volunteerService'

export function useVolunteers() {
  return useLiveQuery(() => db.volunteers.toArray(), [])
}

export function useApprovedVolunteers() {
  return useLiveQuery(
    () => db.volunteers
      .filter(v => v.status === 'approved' && v.showOnWebsite === true)
      .toArray(),
    []
  )
}

export function useVolunteerCount() {
  return useLiveQuery(() => db.volunteers.count(), [])
}

export function useApprovedVolunteerCount() {
  return useLiveQuery(
    () => db.volunteers.where('status').equals('approved').count(),
    []
  )
}

export { volunteerService }
