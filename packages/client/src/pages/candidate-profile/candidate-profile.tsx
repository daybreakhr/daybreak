import { useMemo, useState } from 'react'
import { Button, Result } from 'antd'
import { useParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { Switch } from 'ui-kit'

import { Candidate as TCandidate } from 'types/candidate'
import { fetchCandidate, fetchParseResume } from 'pages/candidate/queries'
import Skills from './components/skills'
import Education from './components/education'
import Experiences from './components/experiences'

export default function CandidateProfile() {
  const { candidateId = '' } = useParams()
  const [affindaKey, setAffindaKey] = useState<string | undefined>()
  const [
    { data, isLoading: isCandidateLoading },
    { data: affindaData, isLoading: isAffindaLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['candidate', candidateId],
        queryFn: () => fetchCandidate(candidateId),
        onSuccess({ affindaId }: TCandidate) {
          setAffindaKey(affindaId)
        },
      },
      {
        queryKey: ['affinda', candidateId],
        queryFn: () => fetchParseResume(affindaKey),
        enabled: !!affindaKey,
      },
    ],
  })

  const isLoading = () => isCandidateLoading || isAffindaLoading

  const sortedExperiences = useMemo(
    () =>
      affindaData?.data?.workExperience?.sort(
        (a, b) =>
          new Date(b.dates?.endDate ?? '').valueOf() -
          new Date(a.dates?.endDate ?? '').valueOf(),
      ) ?? [],
    [affindaData?.data?.workExperience],
  )

  return (
    <>
      <div className="p-4 mb-4 text-gray-800 bg-white shadow-md rounded-b-md">
        <Switch>
          <Switch.Match when={data?.status === 'rejected'}>
            <Result
              status="error"
              title="This applicant has been rejected"
              subTitle="Reason: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at nibh id mauris cursus lobortis vitae non ligula. Praesent ipsum arcu, vestibulum ut auctor consequat, sodales ut arcu. Pell"
            />
          </Switch.Match>
        </Switch>

        <p className="mb-4 text-lg font-semibold">Personal Details</p>
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm text-gray-800 uppercase">Name</p>
                <Switch>
                  <Switch.Match when={isLoading()}>
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
                <p className="text-sm text-gray-800 uppercase">Location</p>
                <Switch>
                  <Switch.Match when={isLoading()}>
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
                <p className="text-sm text-gray-800 uppercase">
                  Current Company
                </p>
                <Switch>
                  <Switch.Match when={isLoading()}>
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
                <p className="text-sm text-gray-800 uppercase">
                  Total Experience
                </p>
                <Switch>
                  <Switch.Match when={isLoading()}>
                    <div className="w-20 h-6 mt-1 bg-gray-100 rounded animate-pulse" />
                  </Switch.Match>

                  <Switch.Match when={affindaData?.data}>
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
            <img src="/assets/pdf.png" className="w-12" />

            <Button
              type="link"
              size="large"
              target="_blank"
              href={data?.resume ?? ''}
              icon={<AiOutlineCloudDownload />}
            >
              Resume.pdf
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        <Experiences isLoading={isLoading()} experiences={sortedExperiences} />
        <Education
          isLoading={isLoading()}
          educations={affindaData?.data?.education}
        />
        <Skills isLoading={isLoading()} skills={affindaData?.data?.skills} />
      </div>
    </>
  )
}
