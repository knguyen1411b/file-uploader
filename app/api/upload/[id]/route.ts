import { NextResponse } from 'next/server'

import { getUpload } from '../../../../lib/upload-store'

export const runtime = 'nodejs'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const upload = getUpload(id)

    if (!upload) {
        return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 })
    }

    const stream = new ReadableStream<Uint8Array>({
        start(controller) {
            controller.enqueue(Uint8Array.from(upload.bytes))
            controller.close()
        }
    })

    return new Response(stream, {
        status: 200,
        headers: {
            'content-type': upload.contentType,
            'content-length': String(upload.size),
            'content-disposition': `attachment; filename="${encodeURIComponent(upload.fileName)}"`,
            'cache-control': 'no-store'
        }
    })
}
