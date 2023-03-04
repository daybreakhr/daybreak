import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import { HiOutlineSparkles } from 'react-icons/hi'
import { useMutation } from '@tanstack/react-query'
import { useRemirrorContext } from '@remirror/react'
import { getRemirrorJSON, htmlToProsemirrorNode } from 'remirror'
import { generateJD } from '../queries'

type GenerateDescriptionProps = {
  jobTitle: string
}

export default function GenerateDescription({
  jobTitle,
}: GenerateDescriptionProps) {
  const { jobId = '' } = useParams()
  const { setContent, schema } = useRemirrorContext()

  const { mutate, isLoading } = useMutation(generateJD, {
    onSuccess: (data) => {
      // serialize string to Remirror JSON
      const doc = getRemirrorJSON(
        htmlToProsemirrorNode({ content: data, schema }),
      )

      // Update content of editor while preserving history
      setContent(doc)
    },
  })

  return (
    <Button
      loading={isLoading}
      onClick={() => mutate({ jobId, jobTitle })}
      icon={<HiOutlineSparkles className="anticon" />}
    >
      Generate Using Psych AI
    </Button>
  )
}
