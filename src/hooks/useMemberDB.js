import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db'
import memberService from '../db/memberService'

export function useMembers() {
  return useLiveQuery(() => db.members.orderBy('order').toArray(), [])
}

export function useMembersByType(type) {
  return useLiveQuery(
    () => db.members.filter(member => member.type === type).sortBy('order'),
    [type]
  )
}

export function usePublishedMembersByType(type) {
  return useLiveQuery(
    () => db.members.filter(member => member.type === type && member.published).sortBy('order'),
    [type]
  )
}

export function useBoardMembers() {
  return usePublishedMembersByType('board')
}

export function useTeamMembers() {
  return usePublishedMembersByType('team')
}

export function useMemberCount() {
  return useLiveQuery(() => db.members.count(), [])
}

export { memberService }
