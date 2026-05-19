import { NextResponse } from 'next/server'

import { saveUpload } from '../../../lib/upload-store'

export const runtime = 'nodejs'

export async function POST(request: Request) {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
        return NextResponse.json({ success: false, error: 'Missing file field' }, { status: 400 })
    }

    const bytes = Buffer.from(await file.arrayBuffer())
    const upload = saveUpload(file.name, file.type || 'application/octet-stream', bytes)

    return NextResponse.json({
        success: true,
        file: {
            id: upload.id,
            name: upload.fileName,
            size: upload.size,
            type: upload.contentType,
            url: `/api/upload/${upload.id}`
        }
    })
}
