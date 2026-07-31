'use client'

import { useState, useRef } from 'react'

interface Props {
  hasExistingCV: boolean
  existingFileName?: string
}

export default function CVUpload({ hasExistingCV, existingFileName }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file')
      return
    }

    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('cv', file)

    const res = await fetch('/api/cv', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    if (data.success) {
      window.location.reload()
    } else {
      setError('Upload failed. Please try again.')
    }

    setUploading(false)
  }

  return (
    <div className="w-full">
      {hasExistingCV && (
        <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
          <span className="text-2xl">📄</span>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{existingFileName}</p>
            <p className="text-blue-400 text-xs mt-0.5">Active CV — upload a new one to replace</p>
          </div>
        </div>
      )}

<label
  htmlFor="cv-upload"
  className={`block border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
    dragOver
      ? 'border-blue-500 bg-blue-500/10'
      : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/50'
  }`}
  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
  onDragLeave={() => setDragOver(false)}
  onDrop={(e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }}
>
<div style={{
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  background: '#2563eb',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 600,
  padding: '12px 24px',
  borderRadius: '12px',
  cursor: 'pointer',
}}>
  <span>📁</span>
  <span>{uploading ? 'Uploading...' : 'Choose PDF File'}</span>
</div>

  <input
  id="cv-upload"
  type="file"
  accept=".pdf"
  style={{ display: 'none' }}
    onChange={(e) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    }}
  />
</label>

      {error && (
        <p className="text-red-400 text-sm mt-3">{error}</p>
      )}
    </div>
  )
      }