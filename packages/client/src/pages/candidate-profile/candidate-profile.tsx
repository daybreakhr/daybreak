import { Result, Tag } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Show, Switch } from 'ui-kit'

import { fetchCandidate } from 'pages/candidate/queries'
import Skills from './components/skills'
import Education from './components/education'
import Experiences from './components/experiences'

export default function CandidateProfile() {
  const { candidateId = '' } = useParams()

  const { data, isLoading } = useQuery(['candidate', candidateId], () =>
    fetchCandidate(candidateId),
  )

  return (
    <div className="flex flex-col flex-1 pb-4">
      <div className="p-4 mb-4 text-gray-800 bg-white shadow-md rounded-b-md">
        <Switch>
          <Switch.Match when={data?.status === 'rejected'}>
            <Result
              status="error"
              title="This applicant has been rejected"
              subTitle={data?.rejectionMessage}
            />
          </Switch.Match>
        </Switch>

        <div className="flex items-center mb-4 space-x-3">
          <p className="text-lg font-semibold">Personal Details</p>
          <Show when={data?.ReferredBy}>
            {({ displayName }) => (
              <Tag color="gold">
                Referred By <b>{displayName}</b>
              </Tag>
            )}
          </Show>
        </div>
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
                      <p className="font-medium">{location ?? 'N/A'}</p>
                    )}
                  </Switch.Match>
                </Switch>
              </div>

              <div>
                <p className="text-xs text-gray-800 uppercase">
                  Current Company
                </p>
                <Switch fallback="N/A">
                  <Switch.Match when={isLoading}>
                    <div className="w-20 h-6 mt-1 bg-gray-100 rounded animate-pulse" />
                  </Switch.Match>

                  <Switch.Match when={data?.currentCompany}>
                    {(companyName) => (
                      <p className="font-medium">{companyName}</p>
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

                  <Switch.Match when={data}>
                    {({ totalYearsOfExperience }) => (
                      <p className="font-medium">
                        {totalYearsOfExperience === 0
                          ? 'N/A'
                          : totalYearsOfExperience + ' Years'}
                      </p>
                    )}
                  </Switch.Match>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        <Experiences isLoading={isLoading} experiences={data?.experience} />
        <Education isLoading={isLoading} educations={data?.education} />
        <Skills isLoading={isLoading} skills={data?.skills} />
      </div>
    </div>
  )
}
