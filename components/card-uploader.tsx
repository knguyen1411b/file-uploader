'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import InputFiles from './input-files'
import MiniInputFiles from './mini-file-upload'
import FileUploaded from './file-uploaded'
import CardUploaderContainer from '../container/card-uploader'
import BtnSubmit from './btn-submit'
import renderAddedFiles from './files-added'
import Link from 'next/link'

export default function CardUploader() {
  const {
    files,
    fileUploaders,
    setFileUploaders,
    uploading,
    dragActive,
    inputRef,
    handleFiles,
    handleRemoveFile,
    handleDrag,
    handleDrop,
    openFileDialog,
    handleUploadAll
  } = CardUploaderContainer()

  const fileInputProps = {
    dragActive,
    openFileDialog,
    handleDrag,
    handleDrop,
    inputRef,
    handleFiles
  }

  const renderAdded = () => (
    <div className="space-y-3">
      <h3 className="text-md font-semibold text-gray-600 dark:text-gray-400">Added ({files.length})</h3>
      {renderAddedFiles(files, handleRemoveFile, uploading)}
      <MiniInputFiles {...fileInputProps} />
    </div>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto [background:linear-gradient(45deg,#080b11,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border-[3px] border-transparent animate-border overflow-hidden">
      <div className="w-full h-full px-1 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
        <CardHeader className="space-y-2 text-center sm:text-left">
          <CardTitle className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
            Upload your file
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Made with <span className="text-red-500">❤️</span> by{' '}
            <span className="font-medium text-blue-900">
              <Link href="https://github.com/knguyen1411b" target="_blank">
                knguyen1411b
              </Link>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent onDragEnter={handleDrag}>
          {files.length === 0 ? <InputFiles {...fileInputProps} /> : renderAdded()}
          {files.length > 0 && <BtnSubmit files={files} uploading={uploading} handleUploadAll={handleUploadAll} />}
          <FileUploaded files={fileUploaders} setFiles={setFileUploaders} />
        </CardContent>
      </div>
    </Card>
  )
}
