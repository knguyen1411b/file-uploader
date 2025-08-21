import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const CATBOX_ENDPOINT = 'https://catbox.moe/user/api.php'

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.formData()
    const reqtype = incoming.get('reqtype')?.toString()

    if (!reqtype) {
      return NextResponse.json({ success: false, error: 'Missing reqtype' }, { status: 400 })
    }

    const fd = new FormData()
    fd.set('reqtype', reqtype)

    if (reqtype === 'fileupload') {
      const file = incoming.get('fileToUpload') as File | null
      if (!file) {
        return NextResponse.json({ success: false, error: 'Missing fileToUpload' }, { status: 400 })
      }
      fd.append('fileToUpload', file, file.name)
    }
    const resp = await fetch(CATBOX_ENDPOINT, {
      method: 'POST',
      body: fd
    })
    const text = (await resp.text()).trim()
    if (!resp.ok) {
      return NextResponse.json(
        {
          success: false,
          error: text || 'Upload failed',
          status: resp.status
        },
        { status: resp.status }
      )
    }
    return NextResponse.json(
      {
        success: true,
        url: text,
        status: resp.status
      },
      { status: resp.status }
    )
  } catch (err: unknown) {
    console.error('Catbox proxy error:', err)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        detail: (err as Error)?.message || String(err)
      },
      { status: 500 }
    )
  }
}
