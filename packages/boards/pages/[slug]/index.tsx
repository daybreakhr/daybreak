import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import type { Job, Workspace } from '@prisma/client'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { Show } from 'ui-kit'
import client from 'utils/client'

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
  // { fallback: blocking } will server-render pages on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
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

      <div className="w-screen h-screen max-w-3xl py-8 mx-auto prose prose-stone">
        <Image
          width={48}
          height={48}
          alt="Company logo"
          src={workspace.logo ?? ''}
        />
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{workspace.name}</h3>
          <p className="text-justify">{workspace.description}</p>
          <h4>Current Job Openings</h4>
        </div>

        {workspace.Job.map((job) => (
          <Show key={job.id} when={job.isPublished}>
            <div className="mb-4">
              <Link href={`/${workspace.slug}/jobs/${job.id}`}>
                {job.title}
              </Link>
            </div>
          </Show>
        ))}
      </div>
    </>
  )
}
