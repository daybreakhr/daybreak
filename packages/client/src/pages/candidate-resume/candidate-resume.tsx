import { useState } from 'react'
import { Button, Empty, Spin } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Document, Page, pdfjs } from 'react-pdf'

import { Show, Switch } from 'ui-kit'
import { fetchCandidate } from 'pages/candidate/queries'
import { DownloadOutlined } from '@ant-design/icons'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function CandidateResume() {
  const { candidateId = '' } = useParams()

  const { data, isLoading } = useQuery(['candidate', candidateId], () =>
    fetchCandidate(candidateId),
  )

  const [pageCount, setPageCount] = useState(0)

  const onDownload = () => {
    try {
      fetch(data?.resume || '').then((response) => {
        response.blob().then((blob) => {
          const fileURL = window.URL.createObjectURL(blob)
          const alink = document.createElement('a')
          alink.href = fileURL
          alink.download = `${data?.firstName.toLowerCase()}_${data?.lastName.toLowerCase()}_Resume.pdf`
          alink.click()
        })
      })
    } catch (error) {}
  }

  return (
    <div className="flex-1 p-4 bg-white shadow-md h-fit rounded-b-md">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold">Resume</p>
        <Show when={data && data.resume}>
          <Button
            type="text"
            icon={<DownloadOutlined className="text-2xl" />}
            onClick={onDownload}
          />
        </Show>
      </div>

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
        </Switch.Match>
      </Switch>
    </div>
  )
}
