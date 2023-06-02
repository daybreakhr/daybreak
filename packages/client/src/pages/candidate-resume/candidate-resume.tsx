import { useState } from 'react'
import { Button, Empty, Spin } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  DownloadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'

import { Show, Switch } from 'ui-kit'
import { downloadFile } from 'utils/download'
import { fetchCandidate } from 'pages/candidate/queries'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function CandidateResume() {
  const { candidateId = '' } = useParams()

  const { data, isLoading } = useQuery(['candidate', candidateId], () =>
    fetchCandidate(candidateId),
  )

  const [pageCount, setPageCount] = useState(0)
  const [zoomScale, setZoomScale] = useState(1.5)

  const onZoomIn = () => {
    if (zoomScale < 2.5) setZoomScale((scale) => scale + 0.5)
  }
  const onZoomOut = () => {
    if (zoomScale > 1) setZoomScale((scale) => scale - 0.5)
  }

  return (
    <div className="flex-1 p-4 bg-white rounded-md shadow-md h-fit">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold">Resume</p>
        <div className="flex items-center justify-center space-x-2">
          <Show when={data && data.resume}>
            <Button
              onClick={onZoomIn}
              icon={<ZoomInOutlined />}
              disabled={zoomScale >= 2.5}
            />

            <Button
              icon={<ZoomOutOutlined />}
              onClick={onZoomOut}
              disabled={zoomScale <= 1}
            />

            <Show when={data?.resume}>
              {(url) => (
                <Button
                  icon={<DownloadOutlined />}
                  onClick={() => downloadFile(url)}
                >
                  Download
                </Button>
              )}
            </Show>
          </Show>
        </div>
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
              <div className="flex items-center justify-center ">
                <Spin tip="Loading..." />
              </div>
            }
            onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          >
            {Array.from(new Array(pageCount), (_, index) => (
              <div key={index} className="flex overflow-x-auto">
                <Page
                  scale={zoomScale}
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="mx-auto"
                />
              </div>
            ))}
          </Document>
        </Switch.Match>
      </Switch>
    </div>
  )
}
