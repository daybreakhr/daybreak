import Head from 'next/head'
import Image from 'next/image'
import type { Job, Workspace } from '@prisma/client'
import type { GetStaticPaths, GetStaticProps } from 'next'
import client from '../utils/client'

type WorkspaceWithJob = Workspace & { Job: Job[] }

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call the workspace GET request to fetch all workspaces
  const { data } = await client.get<Workspace[]>('workspace')

  // Get the paths we want to pre-render based on workspace slugs
  const paths = data.map((workspace) => ({
    params: { slug: workspace.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the workspace `slug`
  // If the route iis like /daybreak_hr, then params.slug is daybreak_hr
  const { data } = await client.get<WorkspaceWithJob>(
    `workspace/${params?.slug}`,
  )

  // Pass workspace data to the page via props
  return { props: { workspace: data }, revalidate: 10 }
}

type WorkspaceHomeProps = {
  workspace: WorkspaceWithJob
}

export default function WorkspaceHome({ workspace }: WorkspaceHomeProps) {
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

      <div className="w-screen h-screen max-w-3xl py-8 mx-auto">
        <Image
          width={48}
          height={48}
          alt="Company logo"
          src={workspace.logo ?? ''}
        />
        <div className="mb-4 prose prose-stone">
          <h3 className="text-lg font-semibold">{workspace.name}</h3>
          <p className="text-sm text-justify">{workspace.description}</p>
          <h4>Current Job Openings</h4>
        </div>

        {workspace.Job.map((job) =>
          job.isPublished ? (
            <div className="mb-4" key={job.id}>
              <p className="text-indigo-600 hover:underline">{job.title}</p>
            </div>
          ) : null,
        )}
      </div>
    </>
  )
}
