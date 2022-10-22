// @ts-nocheck
import { message } from 'antd'
import type { UploadProps } from 'antd'
import client from 'utils/client'
import { UserWithClaims } from 'types/user'

export const customRequest: (
  user: UserWithClaims | null,
) => UploadProps['customRequest'] =
  (user: UserWithClaims | null) =>
  async ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onSuccess,
    onProgress,
    withCredentials,
  }) => {
    const formData = new FormData()
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key] as string | Blob)
      })
    }

    formData.append(filename ?? '', file)
    const idToken = await user?.getIdToken()

    client
      .post(action, formData, {
        withCredentials,
        headers: { ...headers, Authorization: idToken },
        onUploadProgress: ({ total, loaded }) => {
          onProgress?.(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file,
          )
        },
      })
      .then(({ data: response }) => {
        onSuccess?.(response, file)
      })
      .catch(onError)

    return {
      abort() {
        message.error('upload progress is aborted.')
      },
    }
  }
