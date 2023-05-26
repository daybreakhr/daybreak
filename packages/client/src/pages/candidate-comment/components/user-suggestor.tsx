import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { Avatar } from 'antd'
import { orderBy } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { MentionAtomNodeAttributes } from 'remirror/extensions'
import { FloatingWrapper, useMentionAtom } from '@remirror/react'
import { fetchMembers } from 'pages/members/queries'

export default function UserSuggestor() {
  const [users, setUsers] = useState<MentionAtomNodeAttributes[]>([])
  const { data: members = [] } = useQuery(['members'], fetchMembers)

  const allUsers = useMemo(
    () =>
      orderBy(members, ['displayName'])
        .filter(({ isSuspended }) => !isSuspended)
        .map(({ uid, displayName }) => {
          return { id: uid, label: displayName ?? '' }
        }),
    [members],
  )

  const { state, getItemProps, getMenuProps, indexIsHovered, indexIsSelected } =
    useMentionAtom({ items: users })

  useEffect(() => {
    if (!state) {
      return
    }

    const searchTerm = state.query.full.toLowerCase()
    const filteredUsers = allUsers
      .filter((user) => user.label.toLowerCase().includes(searchTerm))
      .sort()

    setUsers(filteredUsers)
  }, [allUsers, state])

  const enabled = !!state

  return (
    <FloatingWrapper
      enabled={enabled}
      positioner="cursor"
      renderOutsideEditor
      placement="bottom-start"
    >
      <div
        {...getMenuProps()}
        className="h-48 overflow-y-auto bg-white border rounded shadow-lg"
      >
        {enabled &&
          users.map((user, index) => {
            const isHighlighted = indexIsSelected(index)
            const isHovered = indexIsHovered(index)
            const photoUrl =
              members.find(({ uid }) => uid === user.id)?.photoURL ?? ''

            return (
              <div
                key={user.id}
                className={clsx(
                  'px-4 py-2 flex items-center space-x-2 cursor-pointer',
                  { 'bg-blue-50': isHighlighted || isHovered },
                )}
                {...getItemProps({ item: user, index })}
              >
                <Avatar size="small" src={photoUrl}>
                  {user.label.charAt(0)}
                </Avatar>
                <span>{user.label}</span>
              </div>
            )
          })}
      </div>
    </FloatingWrapper>
  )
}
