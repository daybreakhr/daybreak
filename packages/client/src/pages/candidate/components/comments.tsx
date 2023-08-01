import { Skeleton } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { Switch } from 'ui-kit'
import Comment from './comment'
import CreateComment from './create-comment'
import { fetchComments } from '../queries'

export default function Comments() {
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') ?? ''

  const { data, isLoading } = useQuery(
    ['comments', candidateId],
    () => fetchComments(candidateId),
    { enabled: !!candidateId },
  )

  return (
    <div className="flex flex-col flex-1 p-4 overflow-hidden">
      <div className="flex-1 pb-4 space-y-4 overflow-y-auto">
        <Switch>
          <Switch.Match when={isLoading}>
            {[1, 2].map((val) => (
              <Skeleton key={val} avatar />
            ))}
          </Switch.Match>

          <Switch.Match when={data}>
            {(data) =>
              data.map(({ id, content, createdAt, User }) => (
                <Comment
                  key={id}
                  user={User}
                  content={content}
                  createdAt={createdAt}
                />
              ))
            }
          </Switch.Match>
        </Switch>
      </div>

      <CreateComment />
    </div>
  )
}
