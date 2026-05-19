import { NextRequest } from 'next/server'

import { describe, expect, it } from 'vitest'

import { GET } from '../app/api/upload/[id]/route'
import { POST } from '../app/api/upload/route'

describe('upload routes', () => {
    it('returns 400 when file field is missing', async () => {
        const req = new NextRequest('http://localhost/api/upload', { method: 'POST', body: new FormData() })
        const response = await POST(req)
        const body = await response.json()

        expect(response.status).toBe(400)
        expect(body.success).toBe(false)
    })

    it('stores and serves uploaded file', async () => {
        const formData = new FormData()
        formData.append('file', new File(['hello'], 'demo.txt', { type: 'text/plain' }))

        const req = new NextRequest('http://localhost/api/upload', { method: 'POST', body: formData })
        const uploadedResponse = await POST(req)
        const uploadedBody = await uploadedResponse.json()

        expect(uploadedResponse.status).toBe(200)
        expect(uploadedBody.success).toBe(true)

        const fileId = uploadedBody.file.id as string
        const downloadResponse = await GET(new Request(`http://localhost/api/upload/${fileId}`), {
            params: Promise.resolve({ id: fileId })
        })

        expect(downloadResponse.status).toBe(200)
        expect(await downloadResponse.text()).toBe('hello')
    })
})
