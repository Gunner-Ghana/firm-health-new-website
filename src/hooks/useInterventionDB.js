import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db'
import interventionService from '../db/interventionService'

export function useInterventions() {
  return useLiveQuery(() => db.interventions.orderBy('order').toArray(), [])
}

export function usePublishedInterventions() {
  return useLiveQuery(
    () => db.interventions.filter(intervention => intervention.published).sortBy('order'),
    []
  )
}

export function useInterventionBySlug(slug) {
  return useLiveQuery(
    () => slug ? db.interventions.where('slug').equals(slug).first() : null,
    [slug]
  )
}

export function useInterventionCount() {
  return useLiveQuery(() => db.interventions.count(), [])
}

export { interventionService }
