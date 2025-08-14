import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json(
        { error: "Không tìm thấy file" },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = Date.now() + '-' + file.name.replaceAll(' ', '_')
    
    // Đường dẫn lưu file
    const uploadDir = path.join(process.cwd(), 'public/upload')
    await writeFile(path.join(uploadDir, filename), buffer)

    // Trả về URL của file
    return NextResponse.json({ 
      url: `/upload/${filename}`
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: "Lỗi khi upload file" },
      { status: 500 }
    )
  }
}
