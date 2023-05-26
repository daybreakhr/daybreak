import { Empty, Skeleton } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Switch } from 'ui-kit'

import { fetchComments } from './queries'
import CreateComment from './components/create-comment'
import Comment from './components/comment'

export default function CandidateComment() {
  const { candidateId = '' } = useParams()

  const { data, isLoading } = useQuery(['comments', candidateId], () =>
    fetchComments(candidateId),
  )

  return (
    <div className="flex flex-col flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="mb-4 text-lg font-semibold">Comments</p>
      <div className="flex-1 space-y-4">
        <Switch>
          <Switch.Match when={isLoading}>
            {[1, 2].map((val) => (
              <Skeleton key={val} avatar />
            ))}
          </Switch.Match>

          <Switch.Match when={data?.length === 0}>
            <Empty description="No comments yet" />
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
