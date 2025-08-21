'use client'

import { Copy, Download, QrCode, X } from 'lucide-react'
import FileIcon from './file-icon'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { QRCodeCanvas } from 'qrcode.react'
import { motion, AnimatePresence } from 'motion/react'
import FileUploadedContainer from '../container/file-uploaded'
import { IFileUploadedProps } from './types'

export default function FileUploaded({ files, setFiles }: IFileUploadedProps) {
  const { fileSelected, setFileSelected, open, setOpen, handleRemove, handleCopy } = FileUploadedContainer({
    files,
    setFiles
  })

  return (
    <>
      {files.length > 0 && (
        <div className="mt-3 space-y-3">
          <h3 className="text-md font-semibold text-gray-600 dark:text-gray-400">Uploaded ({files.length})</h3>
          <AnimatePresence>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex items-center space-x-3 rounded-lg px-3 bg-transparent border-2 border-gray-400 dark:border-gray-700 dark:hover:border-white/90 hover:border-black/90 transition-colors duration-200 !h-16"
              >
                <FileIcon fileType={file.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-2 rounded-md transition text-gray-400 hover:text-green-700"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 rounded-md transition text-gray-400 hover:text-blue-700"
                    onClick={() => handleCopy(file.url)}
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 rounded-md transition text-gray-400 hover:text-cyan-600"
                    onClick={() => {
                      setFileSelected(file)
                      setOpen(true)
                    }}
                  >
                    <QrCode className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 rounded-md transition text-gray-400 hover:text-red-600"
                    onClick={() => handleRemove(file.id)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center mb-2">QR Code</DialogTitle>
            <DialogDescription>
              Scan the QR code to access the file: {` `}
              <span className="text-indigo-400">{fileSelected?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            {fileSelected && (
              <QRCodeCanvas value={fileSelected.url} size={200} className="border-2 border-white shadow-md" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
