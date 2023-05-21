import { useParams } from 'react-router-dom'

import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import { fetchCandidate } from 'pages/candidate/queries'
import { useQuery } from '@tanstack/react-query'
import { Switch } from 'ui-kit'
import { Empty, Spin } from 'antd'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function CandidateResume() {
  const { candidateId = '' } = useParams()

  const { data, isLoading } = useQuery(['candidate', candidateId], () =>
    fetchCandidate(candidateId),
  )

  const [pageCount, setPageCount] = useState(0)

  return (
    <div className="p-4 bg-white shadow-md rounded-b-md">
      <p className="mb-2 text-lg font-semibold text-gray-800">Resume</p>
      <div className="flex items-center justify-center">
        <Switch>
          <Switch.Match when={isLoading}>
            <div className="flex items-center justify-center h-80">
              <Spin tip="Loading..." />
            </div>
          </Switch.Match>

          <Switch.Match when={!data?.resume}>
            <div className="flex items-center justify-center h-96">
              <Empty description="No resume has been uploaded yet..." />
            </div>
          </Switch.Match>

          <Switch.Match when={data?.resume}>
            <div className="mb-4 overflow-hidden">
              <Document
                file={data?.resume}
                loading={
                  <div className="flex items-center justify-center h-96">
                    <Spin tip="Loading..." />
                  </div>
                }
                onLoadSuccess={({ numPages }) => setPageCount(numPages)}
              >
                {Array.from(new Array(pageCount), (_, index) => (
                  <Page
                    key={index}
                    scale={1.5}
                    pageNumber={index + 1}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                ))}
              </Document>
            </div>
          </Switch.Match>
        </Switch>
      </div>
    </div>
  )
}
