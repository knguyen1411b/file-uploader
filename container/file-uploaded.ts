import { useState } from 'react'
import { IFileUploader } from '../components/types'
import { toast } from 'sonner'

interface IFileUploadedProps {
  files: IFileUploader[]
  setFiles: (files: IFileUploader[]) => void
}
export default function FileUploadedContainer({ files, setFiles }: IFileUploadedProps) {
  const [fileSelected, setFileSelected] = useState<IFileUploader | null>(null)
  const [open, setOpen] = useState(false)

  const handleRemove = (id: number) => {
    setFiles(files.filter((f) => f.id !== id))
    toast.success('File removed successfully')
  }

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard')
  }
  return {
    fileSelected,
    setFileSelected,
    open,
    setOpen,
    handleRemove,
    handleCopy,
    files,
    setFiles
  }
}
