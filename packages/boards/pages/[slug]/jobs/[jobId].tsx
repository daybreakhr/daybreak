import { useState } from 'react'
import { Button, Tabs } from 'antd'
import Head from 'next/head'
import Image from 'next/image'
import { Descendant } from 'slate'
import { WalletOutlined } from '@ant-design/icons'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Job, Location, Workspace } from '@prisma/client'
import { Show, Reader } from 'ui-kit'
import client from 'utils/client'
import ApplicationForm from 'components/application-form'
import PageHeader from 'components/page-header'

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
  const [selectedTab, setSelectedTab] = useState('Overview')

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab)
  }

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

  return (
    <>
      <Head>
        <title>Job Application for {job.title}</title>
        <link rel="icon" type="image/svg+xml" href={job.Workspace.logo ?? ''} />
      </Head>

      <div className="flex flex-col w-screen h-screen bg-gray-100">
        <div className="flex items-center px-6 py-3 align-middle bg-white rounded shadow-md">
          <Show when={job.Workspace.logo}>
            {(logo) => (
              <Image width={32} height={32} alt="Company logo" src={logo} />
            )}
          </Show>

          <Show when={!job.Workspace.logo}>
            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-slate-500">
              <p className="text-xl font-medium text-white">
                {job.Workspace.name.charAt(0).toUpperCase()}
              </p>
            </div>
          </Show>
          <h3 className="ml-2 font-medium text-center">{job.Workspace.name}</h3>
        </div>

        <div className="flex flex-col flex-1 max-w-6xl p-4 mx-auto space-y-4 overflow-hidden">
          <PageHeader
            title={job.title}
            location={job.Location.name}
            jobType={job.jobType}
            experience={job.experience}
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

          <div className="flex flex-col flex-1 overflow-hidden bg-white border border-gray-200 rounded">
            <div className="px-8">
              <Tabs
                items={tabs}
                activeKey={selectedTab}
                className="header-tabs"
                onChange={handleTabChange}
              />
            </div>
            <div className="flex-1 px-8 pb-4 overflow-y-auto">
              <Show when={selectedTab === 'Overview'}>
                <p className="mb-2 text-base font-medium">Who We Are</p>
                <p>{job.Workspace.description}</p>

                <div className="prose max-w-none">
                  <Show when={job?.description}>
                    {(description) => (
                      <Reader initialValue={description as Descendant[]} />
                    )}
                  </Show>
                </div>

                <div className="flex items-center justify-center pt-5">
                  <Button
                    type="primary"
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
