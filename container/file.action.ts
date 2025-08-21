type IResponse = {
  success: boolean
  message: string
}

export const uploadFiles = async (file: File): Promise<IResponse> => {
  const formData = new FormData()
  formData.append('reqtype', 'fileupload')
  formData.append('fileToUpload', file)

  const response = await fetch('/api/catbox', {
    method: 'POST',
    body: formData
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    return {
      success: false,
      message: data.error
    }
  }

  return {
    success: true,
    message: data.url
  }
}
