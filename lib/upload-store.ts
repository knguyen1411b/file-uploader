export type StoredUpload = {
    id: string
    fileName: string
    contentType: string
    size: number
    bytes: Buffer
    createdAt: number
}

const store = new Map<string, StoredUpload>()

export function saveUpload(fileName: string, contentType: string, bytes: Buffer): StoredUpload {
    const id = crypto.randomUUID()
    const item: StoredUpload = {
        id,
        fileName,
        contentType,
        size: bytes.byteLength,
        bytes,
        createdAt: Date.now()
    }
    store.set(id, item)
    return item
}

export function getUpload(id: string): StoredUpload | undefined {
    return store.get(id)
}
