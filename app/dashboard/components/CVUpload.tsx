'use client'

import { useState, useRef } from 'react'

interface Props {
  hasExistingCV: boolean
  existingFileName?: string
}

export default function CVUpload({ hasExistingCV, existingFileName }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
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
    const res = await fetch('/api/cv', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.success) {
      window.location.reload()
    } else {
      setError('Upload failed. Please try again.')
    }
    setUploading(false)
  }

  return (
    <div style={{ width: '100%' }}>
      {hasExistingCV && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' }}>
          <span style={{ fontSize: '20px' }}>📄</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a' }}>{existingFileName}</p>
            <p style={{ fontSize: '12px', color: '#16a34a', marginTop: '2px' }}>Active CV</p>
          </div>
        </div>
      )}

      <label
        htmlFor="cv-upload"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #e8e8e8',
          borderRadius: '10px',
          padding: '14px 16px',
          cursor: 'pointer',
          background: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>📎</span>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a' }}>
              {uploading ? 'Uploading...' : hasExistingCV ? 'Replace CV' : 'Upload CV'}
            </p>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '1px' }}>PDF files only</p>
          </div>
        </div>
        <div style={{ background: '#0a0a0a', color: '#fff', fontSize: '13px', fontWeight: 600, padding: '8px 16px', borderRadius: '8px' }}>
          {uploading ? 'Uploading...' : 'Choose File'}
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

      {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
    </div>
  )
}