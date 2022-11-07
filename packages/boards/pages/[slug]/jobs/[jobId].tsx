import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Descendant } from 'slate'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Job, Location, Workspace } from '@prisma/client'
import { Show, Reader } from 'ui-kit'
import client from 'utils/client'
import ApplicationForm from 'components/application-form'

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
  return (
    <>
      <Head>
        <title>Job Application for {job.title}</title>
        <link rel="icon" type="image/svg+xml" href={job.Workspace.logo ?? ''} />
      </Head>

      <div className="w-screen h-screen max-w-3xl py-8 mx-auto">
        <Image
          width={48}
          height={48}
          alt="Company logo"
          src={job.Workspace.logo ?? ''}
        />

        <div className="mt-2 mb-4 prose prose-stone max-w-none">
          <h3 className="mb-1 text-xl font-semibold">{job.title}</h3>
          <p className="mb-0">
            <span>at </span>
            <span className="font-medium">{job.Workspace.name} </span>
            <Link href={`/${job.Workspace.slug}`}>(View all jobs)</Link>
          </p>
          <p className="my-0 text-gray-500">
            <span>{job.Location.name}</span>

            <Show when={job.isRemote}>
              <span>, Remote</span>
            </Show>
          </p>

          <p className="mb-1 text-base font-medium">Who We Are</p>
          <p className="my-0">{job.Workspace.description}</p>

          <Show when={job?.description}>
            {(description) => (
              <Reader initialValue={description as Descendant[]} />
            )}
          </Show>
        </div>
        <hr />
        <div className="py-4 max-w-none">
          <div className="py-4 text-xl font-medium">
            Submit your Application
          </div>
          <ApplicationForm />
        </div>
      </div>
    </>
  )
}
