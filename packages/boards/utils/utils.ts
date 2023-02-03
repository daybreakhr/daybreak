import { Department, Location, Job as JobType, Workspace } from '@prisma/client'

export type Job = JobType & { Department: Department; Location: Location }
export type WorkspaceWithJob = Workspace & { Job: Job[] }
export type JobFilterType = {
  jobType: string[]
  experience: string[]
  locationId: string | null
  title?: string
}

export const JobTypes = [
  {
    value: 'fullTime',
    label: 'Full Time',
  },
  {
    value: 'partTime',
    label: 'Part Time',
  },
  {
    value: 'contract',
    label: 'Contract',
  },
  {
    value: 'internship',
    label: 'Internship',
  },
]

export const ExperienceLevel = [
  {
    value: '< 3 years',
    label: 'Less than 3 Years',
  },
  {
    value: '3-5 years',
    label: '3-5 Years',
  },
  {
    value: '5-7 years',
    label: '5-7 Years',
  },
  {
    value: '7-10 years',
    label: '7-10 Years',
  },
  {
    value: '> 10 years',
    label: 'More than 10 years',
  },
]

export const getFilteredArray = (data: Job[], filters: any) => {
  return data.filter((item: any) => {
    let match = true
    for (const key in filters) {
      if (filters[key] instanceof Array) {
        if (!filters[key].includes(item[key])) {
          match = false
          break
        }
      } else if (
        !item[key]?.toLowerCase().includes(filters[key]?.toLowerCase())
      ) {
        match = false
        break
      }
    }
    return match
  })
}

export const getFilters = (params: any) => {
  const filters = { ...params }
  for (const key in params) {
    if (Array.isArray(params[key])) {
      !params[key].length && delete filters[key]
    } else {
      !params[key] && delete filters[key]
    }
  }

  return filters
}
