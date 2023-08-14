import { Interview } from '@prisma/client'
import {
  ArrowRightOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { List, Checkbox, Button, Input, Spin, Tooltip } from 'antd'
import { useEffect, useMemo, useState } from 'react'

import { AiOutlineHolder } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'

import {
  createPipelineStep,
  deletePipelineStep,
  fetchInterviews,
  updatePipelineStep,
} from '../queries'

export default function JobPipelines() {
  const [data, setData] = useState<
    Omit<Interview, 'createdBy' | 'createdAt' | 'updatedAt'>[]
  >([])
  const [editable, setEditable] = useState<null | number>(null)
  const [deletable, setDeletable] = useState<null | number>(null)
  const [updatable, setUpdatable] = useState<null | number>(null)

  const { jobId = '' } = useParams()
  const navigate = useNavigate()

  const text = (
    <p className="text-sm font-normal break-words">
      Daybreak Defaults <br /> This is a mandatory Round. You do not have
      permissions to make changes.
    </p>
  )

  const defaultData = useMemo(
    () => [
      {
        id: 'd0',
        title: 'Source',
        isActive: true,
        order: 0,
        jobId,
        isDefault: true,
      },
      {
        id: 'd1',
        title: 'Applied',
        isActive: true,
        order: 1,
        jobId,
        isDefault: true,
      },

      {
        id: 'd2',
        title: 'Offer',
        isActive: true,
        order: 2,
        jobId,
        isDefault: true,
      },
      {
        id: 'd3',
        title: 'Rejected',
        isActive: true,
        order: 3,
        jobId,
        isDefault: true,
      },
    ],
    [jobId],
  )

  const {
    data: interviews,
    isLoading,
    isSuccess,
  } = useQuery(['interviews', jobId], () => fetchInterviews(jobId))

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setData([
        defaultData[0],
        defaultData[1],
        ...(interviews as []),
        defaultData[2],
        defaultData[3],
      ])
    }
  }, [isLoading, isSuccess, interviews, defaultData])

  const queryClient = useQueryClient()

  const { mutate: createInterview, isLoading: isCreatingInterview } =
    useMutation(createPipelineStep, {
      onSuccess: () => {
        queryClient.invalidateQueries(['interviews', jobId])
      },
    })

  const { mutate: updateInterview, isLoading: isUpdatingInterview } =
    useMutation(updatePipelineStep, {
      onSuccess: () => {
        setEditable(null)
        setUpdatable(null)
        queryClient.invalidateQueries(['interviews', jobId])
      },
    })

  const { mutate: deleteInterview, isLoading: isDeletingInterview } =
    useMutation(deletePipelineStep, {
      onSuccess: () => {
        setDeletable(null)
        queryClient.invalidateQueries(['interviews', jobId])
      },
    })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <div>
      <div className="my-8">
        <p className="text-xl font-semibold">Setup Your Job Pipeline</p>
        <p className="text-sm text-gray-500">
          These default stages are essential for a seamless hiring process and
          cannot be edited. However, you can include custom steps to tailor the
          pipeline to your specific requirements.
        </p>
      </div>
      <div className="w-[767px]">
        <p className="text-base font-semibold">Total Rounds - {data.length}</p>

        <div className="my-5">
          <List
            size="large"
            className=" border-gray-50"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                className="py-0 mt-4 rounded-md bg-gray-50"
                actions={
                  item.isDefault
                    ? ['Default']
                    : editable === index
                    ? [
                        <CloseOutlined
                          key={index}
                          onClick={() => {
                            data[index].title = ' '
                            setData([...data])
                          }}
                          style={{ color: 'gray', fontSize: '12px' }}
                        />,

                        <Button
                          key={index}
                          type="link"
                          className="w-3 h-3 p-0 text-xs text-gray-500 "
                          loading={updatable === index && isUpdatingInterview}
                          hidden={updatable === index && isUpdatingInterview}
                          onClick={() => {
                            setUpdatable(index)
                            updateInterview({
                              id: data[index].id,
                              payload: { title: data[index].title },
                            })
                          }}
                        >
                          Save
                        </Button>,
                      ]
                    : [
                        <EditOutlined
                          key={index}
                          onClick={() => {
                            setEditable(index)
                          }}
                          style={{
                            color: '#6B7280',
                            fontSize: '12px',
                          }}
                        />,
                        <DeleteOutlined
                          key={index}
                          hidden={deletable === index && isDeletingInterview}
                          style={{ color: 'red', fontSize: '12px' }}
                          onClick={() => {
                            setDeletable(index)
                            deleteInterview({ id: data[index].id })
                          }}
                        />,
                      ]
                }
              >
                <div className="flex w-full space-x-6">
                  <div className="flex space-x-6">
                    <AiOutlineHolder className="mt-1" />

                    <Tooltip placement="top" title={item.isDefault ? text : ''}>
                      <Checkbox
                        disabled={item.isDefault}
                        checked={item.isActive}
                        onChange={() => {
                          updateInterview({
                            id: data[index].id,
                            payload: { isActive: !data[index].isActive },
                          })
                          data[index].isActive = !data[index].isActive
                          setData([...data])
                        }}
                      />
                    </Tooltip>
                  </div>
                  <div className="w-full">
                    <Input
                      bordered={false}
                      size="small"
                      className="text-sm font-normal"
                      value={item.title}
                      onChange={(e) => {
                        data[index].title = e.target.value
                        setData([...data])
                      }}
                      onPressEnter={() => {
                        setUpdatable(index)
                        updateInterview({
                          id: data[index].id,
                          payload: { title: data[index].title },
                        })
                      }}
                      onClick={() => {
                        setEditable(index)
                      }}
                    />
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>

        <div className="flex justify-between ">
          <Button
            size="large"
            className="text-primary-500"
            onClick={() => {
              // const index = data.length - 2
              const stage = {
                title: `Custom Round ${data.length - 3}`,
                // isActive: true,
                // isDefault: false,
              }
              createInterview({ ...stage, order: data?.length ?? 0, jobId })
            }}
            loading={isCreatingInterview}
          >
            <div className="flex items-center space-x-2">
              <span>
                <PlusOutlined hidden={isCreatingInterview} />
              </span>
              <span>Add New Stage</span>
            </div>
          </Button>
          <div className="space-x-4">
            <Button
              size="large"
              onClick={() => navigate(`/create-job/v2/${jobId}/1`)}
            >
              Cancel
            </Button>

            <Button
              size="large"
              type="primary"
              onClick={() => navigate(`/create-job/v2/${jobId}/3`)}
            >
              <div className="flex items-center space-x-2">
                <span>Save & Publish</span>
                <span>
                  <ArrowRightOutlined />
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
