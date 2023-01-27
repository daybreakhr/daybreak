import { Department, Job, Workspace } from '@prisma/client'

export type JobWithDepartmemt = Job & { Department: Department }
export type WorkspaceWithJob = Workspace & { Job: JobWithDepartmemt[] }
export type JobsByDepartment = {
  departmentId: string
  departmentName: string
  jobs: JobWithDepartmemt[]
}

export const getJobsByDepartment = (workspace: WorkspaceWithJob) => {
  const jobsByDepartment: JobsByDepartment[] = []
  workspace.Job.forEach((job) => {
    const jIndex = jobsByDepartment.findIndex(
      ({ departmentId }) => departmentId === job.departmentId,
    )
    if (jIndex > -1) {
      const department = jobsByDepartment[jIndex]
      const jobs = department?.jobs
      jobs.push(job)
      jobsByDepartment[jIndex] = { ...department, jobs }
    } else {
      if (job.Department) {
        jobsByDepartment.push({
          departmentId: job.Department.id,
          departmentName: job.Department.name,
          jobs: [job],
        })
      }
    }
  })
  return jobsByDepartment
}
