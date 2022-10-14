import { useCallback, useMemo } from 'react'
import { Button, Spin, Tag } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { createEditor, Descendant } from 'slate'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'

import Show from 'components/show'
import { Element, Leaf } from 'components/editor/components'
import { fetchJob } from './queries'
import JobSummary from './components/job-summary'

export default function Job() {
  const { jobId = '' } = useParams()

  const { data, isLoading } = useQuery(['job', jobId], () => fetchJob(jobId))

  const editor = useMemo(() => withReact(createEditor()), [])

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  )

  return (
    <div className="px-8 pt-4 pb-8">
      <Link to="/jobs" className="flex items-center mb-4 space-x-2">
        <AiOutlineArrowLeft />
        <span>Jobs List</span>
      </Link>

      <div className="flex space-x-4">
        <div className="flex-1 p-4 bg-white rounded-md shadow-md">
          <Show
            when={!isLoading}
            fallback={
              <div className="flex items-center justify-center h-full">
                <Spin tip="Loading Job..." />
              </div>
            }
          >
            <div className="flex items-center mb-4 space-x-4">
              <p className="text-xl font-medium text-gray-600">{data?.title}</p>
              <Tag color={data?.isPublished ? 'green' : 'red'}>
                {data?.isPublished ? 'Published' : 'Draft'}
              </Tag>
              <div className="flex-1" />
              <Link to={`/jobs/${jobId}/create`}>
                <Button type="primary" icon={<AiOutlineEdit />}>
                  Edit
                </Button>
              </Link>
            </div>

            <Show when={data?.description}>
              {(description) => (
                <div className="prose-sm prose max-w-none">
                  <Slate editor={editor} value={description as Descendant[]}>
                    <Editable
                      readOnly
                      renderLeaf={renderLeaf}
                      renderElement={renderElement}
                    />
                  </Slate>
                </div>
              )}
            </Show>
          </Show>
        </div>

        <JobSummary data={data} isLoading={isLoading} />
      </div>
    </div>
  )
}
