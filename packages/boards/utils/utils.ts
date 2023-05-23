import { Department, Location, Job as JobType, Workspace } from '@prisma/client'

export type Job = JobType & { Department: Department; Location: Location }
export type WorkspaceWithJob = Workspace & { Job: Job[] }
export type JobFilterType = {
  jobType: string[]
  experience: string[]
  locationId: string | null
  title?: string
}

export const JobTypes = Object.freeze({
  fullTime: 'Full Time',
  partTime: 'Part Time',
  contract: 'Contract',
  internship: 'Internship',
})

export const ExperienceLevel = Object.freeze({
  '< 3 years': 'Less than 3 Years',
  '3-5 years': '3-5 Years',
  '5-7 years': '5-7 Years',
  '7-10 years': '7-10 Years',
  '> 10 years': 'More than 10 years',
})

export const JobTypeOptions = Object.entries(JobTypes).map(([key, data]) => ({
  value: key,
  label: data,
}))

export const ExperienceLevelOptions = Object.entries(ExperienceLevel).map(
  ([key, data]) => ({
    value: key,
    label: data,
  }),
)

export const getFilteredArray = (data: Job[], filters: any) => {
  const filteredData = data.filter((item: any) => {
    let match = true
    for (const key in filters) {
      if (filters[key] instanceof Array) {
        if (!filters[key].includes(item[key])) {
          match = false
          break
        }
      } else if (
        !item[key]?.toLowerCase().includes(filters[key]?.toLowerCase().trim())
      ) {
        match = false
        break
      }
    }
    return match
  })

  const sortedData = filteredData.sort((a, b) => {
    const departmentComparison = a.Department.name.localeCompare(
      b.Department.name,
    )
    if (departmentComparison === 0) {
      return (a.title ?? '').localeCompare(b.title ?? '')
    }
    return departmentComparison
  })

  return sortedData
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
