import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { logo_url } = body

    // Validate input
    if (!logo_url) {
      return NextResponse.json({ error: 'logo_url is required' }, { status: 400 })
    }

    // Validate URL format
    let url: URL
    try {
      url = new URL(logo_url)
    } catch (error) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    // Fetch the image from the URL
    const imageResponse = await fetch(logo_url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}` },
        { status: imageResponse.status }
      )
    }

    // Check content type
    const contentType = imageResponse.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'URL does not point to a valid image' }, { status: 400 })
    }

    // Convert to buffer
    const imageBuffer = await imageResponse.arrayBuffer()

    // Convert to base64
    const base64 = Buffer.from(imageBuffer).toString('base64')
    const mimeType = contentType || 'image/png'
    const base64Data = `data:${mimeType};base64,${base64}`

    // Return success response
    return NextResponse.json({
      success: true,
      base64: base64Data,
      mimeType,
      size: imageBuffer.byteLength,
      originalUrl: logo_url
    })
  } catch (error) {
    console.error('Error converting image to base64:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Optional: Add GET method for testing
export async function GET() {
  return NextResponse.json({
    message: 'Image to Base64 API endpoint',
    usage: 'Send POST request with { "logo_url": "your-image-url" }',
    example: {
      method: 'POST',
      body: {
        logo_url: 'https://example.com/image.png'
      }
    }
  })
}
