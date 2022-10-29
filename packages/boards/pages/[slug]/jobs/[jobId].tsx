import Link from 'next/link'
import Image from 'next/image'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Job, Location, Workspace } from '@prisma/client'
import client from 'utils/client'

type JobWithWorkspace = Job & { Workspace: Workspace; Location: Location }

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.get<JobWithWorkspace[]>('jobs')

  const paths = data.map(({ id, Workspace }) => ({
    params: { jobId: id, slug: Workspace.slug },
  }))

  return { paths, fallback: false }
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
    <div className="w-screen h-screen max-w-3xl py-8 mx-auto">
      <Image
        width={48}
        height={48}
        alt="Company logo"
        src={job.Workspace.logo ?? ''}
      />
      <div className="mt-2 mb-4 prose-sm prose prose-stone">
        <h3 className="mb-0 text-lg font-semibold">{job.title}</h3>
        <p className="mb-1 text-xs">
          <span>at </span>
          <span className="font-medium">{job.Workspace.name} </span>
          <Link href={`/${job.Workspace.slug}`}>(View all jobs)</Link>
        </p>
        <p className="my-0 text-xs text-gray-500">
          <span>{job.Location.name}</span>
          {job.isRemote ? <span>, Remote</span> : null}
        </p>

        <p className="mb-1 font-medium">Who We Are</p>
        <p className="my-0">{job.Workspace.description}</p>
      </div>
    </div>
  )
}
