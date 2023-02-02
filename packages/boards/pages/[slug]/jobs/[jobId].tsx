import { useState } from 'react'
import { Button, Tabs } from 'antd'

import Head from 'next/head'
import Image from 'next/image'
import { Descendant } from 'slate'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Job, Location, Workspace } from '@prisma/client'
import { Show, Reader } from 'ui-kit'
import client from 'utils/client'
import ApplicationForm from 'components/application-form'
import PageHeader from 'components/page-header'
import { WalletOutlined } from '@ant-design/icons'

type JobWithWorkspace = Job & { Workspace: Workspace; Location: Location }

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.get<JobWithWorkspace[]>('jobs')

  const paths = data.map(({ id, Workspace }) => ({
    params: { jobId: id, slug: Workspace.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.get(`jobs/${params?.jobId}`)

  return { props: { job: data }, revalidate: 10 }
}

type JobPageProps = {
  job: JobWithWorkspace
}

export default function JobPage({ job }: JobPageProps) {
  const tabs = [
    {
      key: 'Overview',
      label: 'Overview',
    },
    {
      key: 'Application',
      label: 'Application',
    },
  ]

  const [selectedTab, setSelectedTab] = useState('Overview')

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab)
  }

  return (
    <>
      <Head>
        <title>Job Application for {job.title}</title>
        <link rel="icon" type="image/svg+xml" href={job.Workspace.logo ?? ''} />
      </Head>

      <div className="flex items-center pl-4 align-middle bg-white rounded shadow-md">
        <Show when={job.Workspace.logo}>
          {(logo) => (
            <Image width={48} height={48} alt="Company logo" src={logo} />
          )}
        </Show>

        <Show when={!job.Workspace.logo}>
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-slate-500">
            <p className="text-xl font-medium text-white">
              {job.Workspace.name.charAt(0).toUpperCase()}
            </p>
          </div>
        </Show>
        <h3 className="ml-4 text-center">{job.Workspace.name}</h3>
      </div>

      <div className="flex bg-gray-100 h-max">
        {/* <div className="flex items-center justify-center w-1/4 my-5 ml-4 align-middle bg-white border-b border-gray-200 rounded">
          <h3>Suggestion Cards here</h3>
        </div> */}

        <div className="w-full mx-4 my-5">
          <PageHeader
            title={job.title}
            location={job.Location.name}
            jobType={job.jobType}
            experience={job.experience}
            isLoading={false}
            breadcrumb={[
              {
                label: job.Workspace.name,
                path: `/${job.Workspace.slug}`,
                icon: <WalletOutlined />,
              },
              {
                label: 'Jobs',
                path: `/${job.Workspace.slug}`,
              },
            ]}
          />
          <div className="w-full ">
            <div className="p-4 mt-4 bg-white border border-gray-200 rounded">
              <Tabs
                items={tabs}
                className="header-tabs"
                onChange={handleTabChange}
              />
              <Show when={selectedTab === 'Overview'}>
                <p className="mb-1 text-base font-medium">Who We Are</p>
                <p className="my-0">{job.Workspace.description}</p>

                <Show when={job?.description}>
                  {(description) => (
                    <Reader initialValue={description as Descendant[]} />
                  )}
                </Show>

                <div className="flex items-center justify-center pt-5">
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => setSelectedTab('Application')}
                  >
                    Apply Now
                  </Button>
                </div>
              </Show>

              <Show when={selectedTab === 'Application'}>
                <ApplicationForm workspaceId={job.Workspace.id} />
              </Show>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
