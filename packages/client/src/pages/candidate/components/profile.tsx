import { useMemo } from 'react'
import type { ResumeData } from '@affinda/affinda'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { Switch } from 'ui-kit'
import { Candidate } from 'types/candidate'

import Skills from './skills'
import Education from './education'
import Experiences from './experiences'

type ProfileProps = {
  data: Candidate | undefined
  affinda: ResumeData | null | undefined
  isLoading: boolean
}

export default function Profile({ data, affinda, isLoading }: ProfileProps) {
  const sortedExperiences = useMemo(
    () =>
      affinda?.workExperience?.sort(
        (a, b) =>
          new Date(b.dates?.endDate ?? '').valueOf() -
          new Date(a.dates?.endDate ?? '').valueOf(),
      ) ?? [],
    [affinda?.workExperience],
  )

  return (
    <>
      <div className="p-4 mb-4 text-gray-800 bg-white shadow-md rounded-b-md">
        <p className="mb-4 text-lg font-semibold">Personal Details</p>
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-gray-800 uppercase">Name</p>
                <Switch>
                  <Switch.Match when={isLoading}>
                    <div className="w-20 h-6 mt-1 bg-gray-100 rounded animate-pulse" />
                  </Switch.Match>

                  <Switch.Match when={data}>
                    {({ firstName, middleName, lastName }) => (
                      <p className="font-medium">
                        {firstName} {middleName ?? ''} {lastName}
                      </p>
                    )}
                  </Switch.Match>
                </Switch>
              </div>

              <div>
                <p className="text-xs text-gray-800 uppercase">Location</p>
                <Switch>
                  <Switch.Match when={isLoading}>
                    <div className="w-20 h-6 mt-1 bg-gray-100 rounded animate-pulse" />
                  </Switch.Match>

                  <Switch.Match when={data}>
                    {({ location }) => (
                      <p className="font-medium">{location}</p>
                    )}
                  </Switch.Match>
                </Switch>
              </div>

              <div>
                <p className="text-xs text-gray-800 uppercase">
                  Current Company
                </p>
                <Switch>
                  <Switch.Match when={isLoading}>
                    <div className="w-20 h-6 mt-1 bg-gray-100 rounded animate-pulse" />
                  </Switch.Match>

                  <Switch.Match when={sortedExperiences}>
                    {([current]) => (
                      <p className="font-medium">{current.organization}</p>
                    )}
                  </Switch.Match>
                </Switch>
              </div>

              <div>
                <p className="text-xs text-gray-800 uppercase">
                  Total Experience
                </p>
                <Switch>
                  <Switch.Match when={isLoading}>
                    <div className="w-20 h-6 mt-1 bg-gray-100 rounded animate-pulse" />
                  </Switch.Match>

                  <Switch.Match when={affinda}>
                    {({ totalYearsExperience }) => (
                      <p className="font-medium">
                        {totalYearsExperience === 0
                          ? 'N/A'
                          : totalYearsExperience + ' Years'}
                      </p>
                    )}
                  </Switch.Match>
                </Switch>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img src="/assets/pdf.png" className="w-12 mr-4" />

            <a
              target="_blank"
              rel="noreferrer"
              href={data?.resume ?? ''}
              className="pl-2 text-base font-medium text-blue-600"
            >
              <AiOutlineCloudDownload className="text-xl" />
              Resume.pdf
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        <Experiences isLoading={isLoading} experiences={sortedExperiences} />
        <Education isLoading={isLoading} educations={affinda?.education} />
        <Skills isLoading={isLoading} skills={affinda?.skills} />
      </div>
    </>
  )
}
