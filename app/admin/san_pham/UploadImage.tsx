"use client"
import { useState } from "react"

interface Props {
  name: string
}

export default function UploadImage({ name }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState("")
  const [error, setError] = useState("")

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Kiểm tra file type
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file hình ảnh')
      return
    }

    // Kiểm tra kích thước file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước file không được vượt quá 5MB')
      return
    }

    setError("")
    setIsUploading(true)

    try {
      // Tạo preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload file
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Upload failed')
      }

      const data = await res.json()
      
      // Cập nhật giá trị cho input hidden
      const hiddenInput = document.querySelector(`input[name="${name}"]`) as HTMLInputElement
      if (hiddenInput) {
        hiddenInput.value = data.url
      }

    } catch (error) {
      console.error("Error:", error)
      setError("Có lỗi xảy ra khi tải ảnh lên")
      setPreview("")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 
              file:text-sm file:font-semibold 
              file:bg-orange-50 file:text-orange-700 
              hover:file:bg-orange-100
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </label>
        {isUploading && (
          <svg className="animate-spin h-5 w-5 text-orange-500" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {preview && (
        <div className="mt-4">
          <div className="relative w-40 h-40">
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-contain rounded-lg border border-gray-200"
            />
            <button
              onClick={() => {
                setPreview("")
                const hiddenInput = document.querySelector(`input[name="${name}"]`) as HTMLInputElement
                if (hiddenInput) {
                  hiddenInput.value = ""
                }
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 