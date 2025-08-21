export interface IFileUploader {
  id: number
  name: string
  url: string
  size: number
  uploadAt: Date
  type: string
}

export interface IInputFiles {
  handleFiles: (files: FileList | null) => void
  inputRef: React.RefObject<HTMLInputElement>
  dragActive: boolean
  openFileDialog: () => void
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
}

export interface IFileUploader {
  id: number
  name: string
  url: string
  size: number
  uploadAt: Date
  type: string
}

export interface IFileUploader {
  id: number
  name: string
  url: string
  size: number
  uploadAt: Date
  type: string
}

export interface IFileUploadedProps {
  files: IFileUploader[]
  setFiles: (files: IFileUploader[]) => void
}

export interface BtnSubmitProps {
  files: File[]
  uploading: boolean
  handleUploadAll: () => void
}
