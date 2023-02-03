import Head from 'next/head'
import type { Workspace } from '@prisma/client'
import type { GetStaticPaths, GetStaticProps } from 'next'
import client from 'utils/client'
import { WorkspaceWithJob } from 'utils/utils'
import { Layout } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import { useState } from 'react'
import { AppLayout, Filter, JobList } from 'components/home'

const { Sider } = Layout

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call the workspace GET request to fetch all workspaces
  const { data } = await client.get<Workspace[]>('workspace')

  // Get the paths we want to pre-render based on workspace slugs
  const paths = data.map((workspace) => ({
    params: { slug: workspace.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the workspace `slug`
  // If the route iis like /daybreak_hr, then params.slug is daybreak_hr
  const { data } = await client.get<WorkspaceWithJob>(
    `workspace?slug=${params?.slug}`,
  )

  // Pass workspace data to the page via props
  return { props: { workspace: data }, revalidate: 10 }
}

type WorkspaceHomeProps = {
  workspace: WorkspaceWithJob
}

export default function WorkspaceHome({ workspace }: WorkspaceHomeProps) {
  const publishedJobs = workspace.Job.filter(
    ({ departmentId }) => !!departmentId,
  )

  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    locationId: null,
  })

  return (
    <>
      <Head>
        <title>Jobs at {workspace.name}</title>
        <link rel="icon" type="image/svg+xml" href={workspace.logo ?? ''} />
        <meta property="og:title" content={workspace.name} key="title" />
        <meta
          property="og:description"
          content={workspace.description ?? ''}
          key="description"
        />
      </Head>
      <AppLayout
        workspaceName={workspace?.name}
        workspaceLogo={workspace.logo ?? ''}
      >
        <Scrollbars autoHide className="flex flex-col flex-1 bg-gray-100">
          <div className="px-12 py-6 bg-white">
            <h1 className="text-3xl font-bold">{workspace.name}</h1>
            <p className="py-2">{workspace.description}</p>
          </div>

          <Layout className="m-4 space-x-4">
            <Sider
              className="p-6 rounded-md h-fit"
              theme="light"
              trigger={null}
              width={300}
            >
              <Filter
                publishedJobs={publishedJobs}
                filters={filters}
                setFilters={setFilters}
              />
            </Sider>
            <JobList
              publishedJobs={publishedJobs}
              filters={filters}
              workspaceSlug={workspace.slug}
            />
          </Layout>
        </Scrollbars>
      </AppLayout>
    </>
  )
}
