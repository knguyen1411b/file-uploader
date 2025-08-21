import { IInputFiles } from './types'
import { motion } from 'motion/react'

export default function MiniInputFiles({
  handleFiles,
  inputRef,
  dragActive,
  openFileDialog,
  handleDrag,
  handleDrop
}: IInputFiles) {
  return (
    <div>
      <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onClick={openFileDialog}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed px-4 !h-16 flex items-center justify-center text-center transition-all duration-300
         ${
           dragActive
             ? 'border-indigo-500 bg-indigo-500/10 shadow-md shadow-indigo-500/20'
             : 'border-gray-400 dark:hover:!border-white/90 hover:!border-black/90 hover:!bg-white/10 dark:!border-gray-700'
         }`}
      >
        {dragActive && (
          <div
            className="absolute inset-0 h-full w-full rounded-lg"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
        <motion.p
          animate={dragActive ? { scale: [1, 1.05, 1] } : {}}
          transition={dragActive ? { repeat: Infinity, duration: 1.2 } : {}}
          className={`font-medium text-sm transition-colors duration-300 ${
            dragActive ? 'text-indigo-300' : 'text-gray-300'
          }`}
        >
          <span className="text-indigo-400 font-semibold">Click to select files</span> or drag and drop
        </motion.p>
      </motion.div>
    </div>
  )
}
// className="flex items-center space-x-3 rounded-lg px-3 bg-transparent border-2 border-gray-400 dark:border-gray-700
//  dark:hover:border-white/90 hover:border-black/90 transition-colors duration-200 !h-16"
