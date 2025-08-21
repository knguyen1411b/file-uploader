import {
  File,
  FileText,
  FileCode,
  FileArchive,
  FileSpreadsheet,
  FileType,
  ImageIcon,
  Music,
  Video,
  Presentation,
  FileJson,
  FileCog
} from 'lucide-react'

const FileIcon = ({ fileType }: { fileType: string }) => {
  const size = 'h-7 w-7'

  if (!fileType) return <File className={`${size} text-gray-400`} />

  if (fileType.startsWith('image/')) return <ImageIcon className={`${size} text-blue-400`} />
  if (fileType.startsWith('video/')) return <Video className={`${size} text-purple-400`} />
  if (fileType.startsWith('audio/')) return <Music className={`${size} text-pink-400`} />

  switch (fileType) {
    case 'application/pdf':
      return <FileText className={`${size} text-red-500`} />
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return <FileType className={`${size} text-blue-500`} />
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return <FileSpreadsheet className={`${size} text-green-500`} />
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return <Presentation className={`${size} text-orange-500`} />
    case 'application/zip':
    case 'application/x-7z-compressed':
    case 'application/x-rar-compressed':
    case 'application/x-tar':
      return <FileArchive className={`${size} text-yellow-500`} />
    case 'application/json':
      return <FileJson className={`${size} text-emerald-400`} />
    case 'text/plain':
      return <FileText className={`${size} text-gray-400`} />
    case 'text/html':
    case 'text/css':
    case 'application/javascript':
    case 'application/x-typescript':
      return <FileCode className={`${size} text-indigo-400`} />
    default:
      if (fileType.includes('xml')) return <FileCog className={`${size} text-teal-400`} />
      return <File className={`${size} text-gray-400`} />
  }
}

export default FileIcon
