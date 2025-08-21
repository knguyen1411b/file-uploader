import { CloudUpload } from 'lucide-react'
import { IInputFiles } from './types'
import { motion } from 'motion/react'

export default function InputFiles({
  dragActive,
  openFileDialog,
  handleDrag,
  handleDrop,
  inputRef,
  handleFiles
}: IInputFiles) {
  return (
    <div>
      <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onClick={openFileDialog}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-4 flex flex-col items-center justify-center text-center transition-all duration-300
         ${
           dragActive
             ? 'border-indigo-500 bg-indigo-500/10 shadow-md shadow-indigo-500/20'
             : 'border-gray-400 dark:hover:!border-white/90 hover:!border-black/90 hover:!bg-white/10 dark:!border-gray-700'
         }`}
      >
        {dragActive && (
          <div
            className="absolute inset-0 h-full w-full rounded-xl"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
        <motion.div
          animate={dragActive ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
          transition={dragActive ? { repeat: Infinity, duration: 1.2 } : {}}
        >
          <CloudUpload
            size={80}
            className={`mb-1 transition-colors duration-300 ${dragActive ? 'text-indigo-400' : 'text-gray-500'}`}
          />
        </motion.div>
        <p className={`font-medium transition-colors duration-300 ${dragActive ? 'text-indigo-300' : 'text-gray-300'}`}>
          <span className="text-indigo-400 font-semibold">Click to select files</span> or drag and drop them here
        </p>
        <p className="text-xs text-gray-500 mt-2">Supports multiple file types (up to 200MB)</p>
      </motion.div>
    </div>
  )
}
