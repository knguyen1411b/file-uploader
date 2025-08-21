import { useRef, useState, useCallback, useEffect } from 'react'
import { uploadFiles } from './file.action'
import { toast } from 'sonner'
import { IFileUploader } from '../components/types'

const MAX_FILE_SIZE = 200 * 1024 * 1024

export default function CardUploaderContainer() {
  const [files, setFiles] = useState<File[]>([])
  const [fileUploaders, setFileUploaders] = useState<IFileUploader[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('uploadedFiles')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        setFileUploaders(parsed)
      }
    }
  }, [])

  useEffect(() => {
    if (fileUploaders.length > 0) {
      localStorage.setItem('uploadedFiles', JSON.stringify(fileUploaders))
    } else {
      localStorage.removeItem('uploadedFiles')
    }
  }, [fileUploaders])

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return

    const filesArray = Array.from(newFiles)

    filesArray.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large (>${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)} MB)`)
      } else {
        setFiles((prev) => [...prev, file])
        toast.success(`Added file: ${file.name}`)
      }
    })
  }, [])

  const handleRemoveFile = useCallback(
    (index: number) => {
      if (uploading) {
        toast.error('Cannot remove files while uploading')
        return
      }
      toast.success(`Removed file: ${files[index].name}`)
      setFiles((prev) => prev.filter((_, i) => i !== index))
    },
    [files, uploading]
  )

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const openFileDialog = () => {
    inputRef.current?.click()
  }

  const handleUploadAll = async () => {
    setUploading(true)
    for (const file of files) {
      const res = await uploadFiles(file)
      if (res.success) {
        setFileUploaders((prev) => [
          ...prev,
          {
            id: Date.now(),
            name: file.name,
            url: res.message,
            size: file.size,
            uploadAt: new Date(),
            type: file.type
          }
        ])
        toast.success(`Uploaded: ${file.name}`)
        setFiles((prev) => prev.filter((f) => f.name !== file.name))
      } else {
        toast.error(`Failed to upload ${file.name}: ${res.message}`)
      }
    }

    setUploading(false)
  }

  return {
    files,
    setFiles,
    fileUploaders,
    setFileUploaders,
    uploading,
    setUploading,
    dragActive,
    setDragActive,
    inputRef,
    handleFiles,
    handleRemoveFile,
    handleDrag,
    handleDrop,
    openFileDialog,
    handleUploadAll
  }
}
