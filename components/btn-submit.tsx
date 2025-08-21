import { Loader2Icon, Upload } from 'lucide-react'
import { BtnSubmitProps } from './types'

export default function BtnSubmit({ files, uploading, handleUploadAll }: BtnSubmitProps) {
  const disabled = uploading || files.length === 0

  return (
    <div className="mt-5 flex justify-end">
      <button
        disabled={disabled}
        onClick={handleUploadAll}
        className={`w-full px-6 py-4 rounded-lg group relative bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500
      hover:shadow-[0_0_20px_rgba(192,38,211,0.3)] text-white font-semibold ${
        disabled && '!bg-gray-200 dark:!bg-zinc-800 !text-zinc-400 !cursor-not-allowed'
      }`}
      >
        {!disabled && (
          <div className="absolute inset-0 opacity-50 group-hover:opacity-75 transition-opacity duration-500 bg-gradient-to-r from-purple-400 to-blue-500"></div>
        )}
        <div className="flex items-center justify-center gap-2 relative z-10">
          {uploading ? (
            <>
              <Loader2Icon className="animate-spin h-4 w-4" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 group-hover:translate-y-[-1px] transition-transform duration-200" />
              <span>Upload</span>
            </>
          )}
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
      </button>
    </div>
  )
}
