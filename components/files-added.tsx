import { AnimatePresence, motion } from 'motion/react'
import FileIcon from './file-icon'
import { X } from 'lucide-react'

const renderAddedFiles = (files: File[], handleRemoveFile: (idx: number) => void, uploading: boolean) => (
  <AnimatePresence>
    {files.map((f, idx) => (
      <motion.div
        key={f.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="flex items-center space-x-3 rounded-lg px-3 bg-transparent border-2 border-gray-400 dark:border-gray-700 dark:hover:border-white/90 hover:border-black/90 transition-colors duration-200 !h-16"
      >
        <FileIcon fileType={f.type} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{f.name}</p>
          <p className="text-xs text-gray-400 mt-1">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <button
          className="p-2 rounded-md transition text-gray-400 hover:text-red-600"
          onClick={() => handleRemoveFile(idx)}
          disabled={uploading}
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    ))}
  </AnimatePresence>
)
export default renderAddedFiles
