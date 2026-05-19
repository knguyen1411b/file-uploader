'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { toast } from 'sonner'

import type { UploadItem } from '../types'

const STORAGE_KEY = 'uploader.history'
const MAX_FILE_SIZE = 200 * 1024 * 1024

export function useFileUploader() {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [queue, setQueue] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [history, setHistory] = useState<UploadItem[]>([])

    const readHistoryFromStorage = () => {
        if (typeof window === 'undefined') return []
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        try {
            const parsed = JSON.parse(raw) as UploadItem[]
            return Array.isArray(parsed) ? parsed : []
        } catch {
            return []
        }
    }

    useEffect(() => {
        const syncHistory = () => {
            setHistory(readHistoryFromStorage())
        }

        syncHistory()
        window.addEventListener('storage', syncHistory)
        return () => window.removeEventListener('storage', syncHistory)
    }, [])

    const queuedSize = useMemo(() => queue.reduce((sum, item) => sum + item.size, 0), [queue])

    const persistHistory = (next: UploadItem[]) => {
        setHistory(next)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }

    const addFiles = (files: FileList | null) => {
        if (!files) return
        const existingNames = new Set(queue.map(file => file.name.toLowerCase()))
        const incomingNames = new Set<string>()
        const accepted: File[] = []
        for (const file of Array.from(files)) {
            const normalizedName = file.name.toLowerCase()

            if (file.size > MAX_FILE_SIZE) {
                toast.error(`${file.name} is larger than 200MB`)
            } else if (existingNames.has(normalizedName) || incomingNames.has(normalizedName)) {
                toast.error(`${file.name} is duplicated and was skipped`)
            } else {
                incomingNames.add(normalizedName)
                accepted.push(file)
            }
        }
        if (accepted.length > 0) setQueue(prev => [...prev, ...accepted])
    }

    const removeQueuedFile = (index: number) => {
        setQueue(prev => prev.filter((_, fileIndex) => fileIndex !== index))
    }

    const removeHistoryItem = (id: string) => {
        persistHistory(history.filter(item => item.id !== id))
    }

    const uploadAll = async () => {
        if (queue.length === 0) return
        setUploading(true)

        const nextItems: UploadItem[] = []
        for (const file of queue) {
            const payload = new FormData()
            payload.append('file', file)
            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: payload
                })
                const data = await response.json()
                if (!response.ok || !data.success) {
                    throw new Error(data.error ?? 'Upload failed')
                }

                nextItems.push({
                    id: data.file.id,
                    name: data.file.name,
                    size: data.file.size,
                    type: data.file.type,
                    url: data.file.url,
                    createdAt: new Date().toISOString()
                })
            } catch (error) {
                toast.error(`${file.name}: ${(error as Error).message}`)
            }
        }

        if (nextItems.length > 0) {
            persistHistory([...nextItems, ...history])
            setQueue([])
            toast.success(`Uploaded ${nextItems.length} file(s)`)
        }

        setUploading(false)
    }

    return {
        inputRef,
        queue,
        history,
        uploading,
        queuedSize,
        addFiles,
        removeQueuedFile,
        removeHistoryItem,
        uploadAll,
        persistHistory
    }
}
