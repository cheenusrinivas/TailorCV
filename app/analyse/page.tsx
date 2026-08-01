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

    const res = await fetch('/api/analyse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobTitle, companyName, jobDescription }),
    })

    const text = await res.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      setError('Server error. Please try again.')
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
    <div style={{ minHeight: '100vh', background: '#fafafa', color: '#0a0a0a' }}>

      {/* Navbar */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
        <a href="/dashboard" style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px', textDecoration: 'none', color: '#0a0a0a' }}>
          Tailor<span style={{ color: '#2563eb' }}>CV</span>
        </a>
        <a href="/dashboard" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>
          ← Back to dashboard
        </a>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '8px' }}>
            Analyse a Job
          </h1>
          <p style={{ color: '#666', fontSize: '15px' }}>
            Paste the job description and we'll tailor your CV to match it perfectly.
          </p>
        </div>

        {/* Form */}
        <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#0a0a0a' }}>
              Job Title *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Full Stack Engineer"
              style={{ width: '100%', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '12px 16px', fontSize: '15px', outline: 'none', background: '#fafafa', color: '#0a0a0a' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#0a0a0a' }}>
              Company Name <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Google"
              style={{ width: '100%', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '12px 16px', fontSize: '15px', outline: 'none', background: '#fafafa', color: '#0a0a0a' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#0a0a0a' }}>
              Job Description *
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={12}
              style={{ width: '100%', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '12px 16px', fontSize: '15px', outline: 'none', background: '#fafafa', color: '#0a0a0a', resize: 'vertical', fontFamily: 'inherit' }}
            />
            <p style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>
              {jobDescription.length} characters — more detail = better results
            </p>
          </div>

          {error && (
            <p style={{ color: '#dc2626', fontSize: '14px' }}>{error}</p>
          )}

          <button
            onClick={handleAnalyse}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#666' : '#0a0a0a',
              color: '#fff',
              fontWeight: 700,
              fontSize: '16px',
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '🤖 Analysing with AI...' : '✨ Analyse My CV'}
          </button>

          {loading && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#999', fontSize: '14px' }}>This takes about 15-20 seconds...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}