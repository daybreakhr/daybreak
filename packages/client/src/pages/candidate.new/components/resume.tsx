import { useState } from 'react'
import { Button, Spin } from 'antd'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  DownloadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'

import { Switch } from 'ui-kit'
import { downloadFile } from 'utils/download'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

type ResumeProps = {
  isLoading: boolean
  resume: string | null | undefined
}

export default function Resume({ resume, isLoading }: ResumeProps) {
  const [pageCount, setPageCount] = useState(0)
  const [zoomScale, setZoomScale] = useState(1.04)

  const onZoomIn = () => {
    if (zoomScale < 2.5) setZoomScale((scale) => scale + 0.5)
  }

  const onZoomOut = () => {
    if (zoomScale > 1) setZoomScale((scale) => scale - 0.5)
  }

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-end mb-2 space-x-2">
        <Button
          onClick={onZoomIn}
          icon={<ZoomInOutlined />}
          disabled={zoomScale >= 2.5}
        />

        <Button
          onClick={onZoomOut}
          disabled={zoomScale <= 1}
          icon={<ZoomOutOutlined />}
        />

        <Button
          disabled={!resume}
          icon={<DownloadOutlined />}
          onClick={() => downloadFile(resume ?? '')}
        >
          Download
        </Button>
      </div>

      <Switch>
        <Switch.Match when={isLoading}>
          <div className="flex items-center justify-center h-80">
            <Spin tip="Loading..." />
          </div>
        </Switch.Match>

        <Switch.Match when={resume}>
          {(resume) => (
            <div className="max-w-2xl overflow-x-auto">
              <Document
                file={resume}
                loading={
                  <div className="flex items-center justify-center h-80">
                    <Spin tip="Loading..." />
                  </div>
                }
                className="w-full"
                onLoadSuccess={({ numPages }) => setPageCount(numPages)}
              >
                {Array.from(new Array(pageCount), (_, index) => (
                  <div key={index} className="flex overflow-x-auto">
                    <Page
                      scale={zoomScale}
                      pageNumber={index + 1}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      className="w-full mx-auto"
                    />
                  </div>
                ))}
              </Document>
            </div>
          )}
        </Switch.Match>
      </Switch>
    </div>
  )
}
