'use client'
import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied ? '#16a34a' : '#0a0a0a',
        color: '#fff',
        fontSize: '12px',
        padding: '6px 14px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'background 0.2s',
      }}
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  )
}