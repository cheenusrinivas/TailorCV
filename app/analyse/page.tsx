'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AnalysePage() {
  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleAnalyse() {
    if (!jobTitle || !jobDescription) {
      setError('Please fill in the job title and description')
      return
    }

    setLoading(true)
    setError('')

    console.log('Sending request...')

    const res = await fetch('/api/analyse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobTitle, companyName, jobDescription }),
    })

    console.log('Response status:', res.status)

    const text = await res.text()
    console.log('Raw response:', text)

    let data
    try {
      data = JSON.parse(text)
    } catch {
      setError(`Server error: ${text.slice(0, 200)}`)
      setLoading(false)
      return
    }

    if (data.success) {
      router.push(`/results/${data.analysisId}`)
    } else {
      setError(data.error || 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <a href="/dashboard" className="text-xl font-black">
          Tailor<span className="text-blue-500">CV</span>
        </a>
        <a href="/dashboard" className="text-xs text-zinc-400 hover:text-white transition-colors">
          ← Back to dashboard
        </a>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-black mb-2">Analyse a Job</h1>
          <p className="text-zinc-400">Paste the job description and we'll tailor your CV to match it perfectly.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Job Title *</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Full Stack Engineer"
              style={{ width: '100%', background: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Company Name <span className="text-zinc-500 font-normal">(optional)</span></label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Google"
              style={{ width: '100%', background: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Job Description *</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={12}
              style={{ width: '100%', background: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical' }}
            />
            <p className="text-zinc-600 text-xs mt-2">{jobDescription.length} characters — more detail = better results</p>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleAnalyse}
            disabled={loading}
            style={{ width: '100%', background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: '16px', padding: '16px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1 }}
          >
            {loading ? '🤖 Analysing with AI...' : '✨ Analyse My CV'}
          </button>

          {loading && (
            <div className="text-center py-4">
              <p className="text-zinc-400 text-sm">This takes about 15-20 seconds...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}