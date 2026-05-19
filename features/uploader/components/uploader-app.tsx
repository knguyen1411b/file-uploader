'use client'

import { useState } from 'react'

import { Copy, Download, Github, Moon, QrCode, Sparkles, Sun, Trash2, UploadCloud } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { toast } from 'sonner'

import { useTheme } from '@/app/provider'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { useFileUploader } from '../hooks/use-file-uploader'
import type { UploadItem } from '../types'

function formatMb(size: number) {
    return `${(size / 1024 / 1024).toFixed(2)} MB`
}

export default function UploaderApp() {
    const {
        inputRef,
        queue,
        history,
        uploading,
        queuedSize,
        addFiles,
        removeQueuedFile,
        removeHistoryItem,
        uploadAll
    } = useFileUploader()

    const [qrItem, setQrItem] = useState<UploadItem | null>(null)
    const { resolvedTheme, setTheme } = useTheme()
    const isInitialEmpty = queue.length === 0 && history.length === 0

    const downloadFile = async (item: UploadItem) => {
        try {
            const response = await fetch(item.url)
            if (!response.ok) {
                toast.error(`Cannot download ${item.name}. File may have expired.`)
                return
            }

            const blob = await response.blob()
            const objectUrl = URL.createObjectURL(blob)
            const anchor = document.createElement('a')
            anchor.href = objectUrl
            anchor.download = item.name
            document.body.appendChild(anchor)
            anchor.click()
            anchor.remove()
            URL.revokeObjectURL(objectUrl)
        } catch {
            toast.error(`Cannot download ${item.name}`)
        }
    }

    return (
        <main className="mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-6xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
            <section className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[0_18px_48px_rgba(2,8,23,0.12)] sm:p-6 lg:p-8">
                <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:28px_28px]" />

                <header className="relative mb-6 flex items-start justify-between gap-4 lg:mb-8">
                    <div>
                        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] backdrop-blur">
                            <Sparkles size={14} aria-hidden="true" /> File Workspace
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Upload Studio</h1>
                        <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
                            A clean command-center layout for fast uploads, QR sharing, and stable local history.
                        </p>
                        <a
                            href="https://github.com/knguyen1411b"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                        >
                            <Github size={16} aria-hidden="true" />
                            <span>@knguyen1411b</span>
                        </a>
                    </div>

                    <button
                        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text)] transition-transform hover:scale-105"
                        aria-label="Toggle theme"
                    >
                        <>
                            <Sun size={18} className="hidden dark:block" aria-hidden="true" />
                            <Moon size={18} className="block dark:hidden" aria-hidden="true" />
                        </>
                    </button>
                </header>

                <div className="relative grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
                    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 backdrop-blur sm:p-5">
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={e => addFiles(e.target.files)}
                        />
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="group flex h-52 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--surface-strong)] px-4 text-center transition-colors hover:border-[var(--accent)] sm:h-56"
                        >
                            <UploadCloud
                                className="text-[var(--accent)] transition-transform group-hover:-translate-y-0.5"
                                size={38}
                                aria-hidden="true"
                            />
                            <span className="text-lg font-medium">Select files to upload</span>
                            <span className="text-sm text-[var(--text-muted)]">
                                Supports multiple files, max 200MB each
                            </span>
                        </button>

                        <div className="mt-4 space-y-2">
                            {queue.map((file, index) => (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2.5"
                                >
                                    <div>
                                        <p className="max-w-[24ch] truncate text-sm font-medium sm:max-w-[30ch]">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)]">{formatMb(file.size)}</p>
                                    </div>
                                    <button
                                        onClick={() => removeQueuedFile(index)}
                                        className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                                        aria-label={`Remove ${file.name}`}
                                    >
                                        <Trash2 size={16} aria-hidden="true" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-[var(--text-muted)]">Queued: {formatMb(queuedSize)}</p>
                            <button
                                onClick={uploadAll}
                                disabled={uploading || queue.length === 0}
                                className="rounded-xl bg-[var(--accent-strong)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {uploading ? 'Uploading…' : 'Upload Files'}
                            </button>
                        </div>
                    </section>

                    <aside className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 backdrop-blur sm:p-5">
                        <h2 className="text-xl font-semibold">Uploaded Library</h2>
                        <p className="mb-4 text-sm text-[var(--text-muted)]">
                            Download, copy link, open QR, or remove history.
                        </p>

                        <div className="space-y-2">
                            {history.length === 0 && (
                                <p className="text-sm text-[var(--text-muted)]">No uploaded files yet.</p>
                            )}
                            {history.map(item => (
                                <div
                                    key={item.id}
                                    className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2.5"
                                >
                                    <div className="mb-2">
                                        <p className="max-w-[22ch] truncate text-sm font-medium sm:max-w-[28ch]">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)]">{formatMb(item.size)}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => downloadFile(item)}
                                            className="rounded-md p-2 text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                                            aria-label={`Download ${item.name}`}
                                        >
                                            <Download size={16} aria-hidden="true" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigator.clipboard
                                                    .writeText(window.location.origin + item.url)
                                                    .then(() => toast.success('Link copied'))
                                            }
                                            className="rounded-md p-2 text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                                            aria-label={`Copy link for ${item.name}`}
                                        >
                                            <Copy size={16} aria-hidden="true" />
                                        </button>
                                        <button
                                            onClick={() => setQrItem(item)}
                                            className="rounded-md p-2 text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                                            aria-label={`Open QR for ${item.name}`}
                                        >
                                            <QrCode size={16} aria-hidden="true" />
                                        </button>
                                        <button
                                            onClick={() => removeHistoryItem(item.id)}
                                            className="rounded-md p-2 text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                                            aria-label={`Remove ${item.name} from history`}
                                        >
                                            <Trash2 size={16} aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>

            <Dialog open={qrItem !== null} onOpenChange={open => !open && setQrItem(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Share via QR</DialogTitle>
                        <DialogDescription>Scan to open {qrItem?.name}</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-2">
                        {qrItem && (
                            <QRCodeCanvas
                                value={window.location.origin + qrItem.url}
                                size={220}
                                className="rounded-xl border border-[var(--border)] bg-white p-2"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    )
}
