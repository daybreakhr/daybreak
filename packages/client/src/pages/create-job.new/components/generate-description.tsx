import { Button } from 'antd'
import { HiOutlineSparkles } from 'react-icons/hi'
import { useMutation } from '@tanstack/react-query'
import { useRemirrorContext } from '@remirror/react'
import { getRemirrorJSON, htmlToProsemirrorNode } from 'remirror'
import { generateJD } from '../queries'

type GenerateDescriptionProps = {
  jobTitle: string
  jobId: string
}

export default function GenerateDescription({
  jobTitle,
  jobId,
}: GenerateDescriptionProps) {
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
      disabled={!jobTitle}
      onClick={() => mutate({ jobId, jobTitle })}
      icon={<HiOutlineSparkles className="anticon" />}
      className=" text-primary-500"
    >
      Generate with AI
    </Button>
  )
}
