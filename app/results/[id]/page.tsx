import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import CopyButton from '../CopyButton'

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

  const analysis = await prisma.analysis.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!analysis) redirect("/dashboard")

  const scoreColor = analysis.matchScore >= 80 ? '#16a34a' : analysis.matchScore >= 60 ? '#ca8a04' : '#dc2626'
  const scoreBg = analysis.matchScore >= 80 ? '#f0fdf4' : analysis.matchScore >= 60 ? '#fefce8' : '#fef2f2'
  const scoreLabel = analysis.matchScore >= 80 ? '🟢 Strong match — apply with confidence!' : analysis.matchScore >= 60 ? '🟡 Good match — a few tweaks will help' : '🔴 Weak match — use the rewritten CV below'

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', color: '#0a0a0a' }}>

      {/* Navbar */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
        <a href="/dashboard" style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px', textDecoration: 'none', color: '#0a0a0a' }}>
          Tailor<span style={{ color: '#2563eb' }}>CV</span>
        </a>
        <a href="/analyse" style={{ fontSize: '13px', background: '#0a0a0a', color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          + New Analysis
        </a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          {analysis.companyName && (
            <p style={{ fontSize: '14px', color: '#999', marginBottom: '4px' }}>{analysis.companyName}</p>
          )}
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-1px' }}>{analysis.jobTitle}</h1>
        </div>

        {/* Match Score */}
        <div style={{ background: scoreBg, border: `1px solid ${scoreColor}30`, borderRadius: '16px', padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '80px', fontWeight: 900, color: scoreColor, lineHeight: 1, letterSpacing: '-3px' }}>
            {analysis.matchScore}%
          </div>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>CV Match Score</p>
          <p style={{ color: scoreColor, fontSize: '14px', fontWeight: 600, marginTop: '8px' }}>{scoreLabel}</p>
        </div>

        {/* Keywords Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#16a34a', marginBottom: '16px' }}>
              ✅ Matched Keywords ({analysis.matchedKeywords.length})
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {analysis.matchedKeywords.map((kw, i) => (
                <span key={i} style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '12px', padding: '4px 10px', borderRadius: '20px', fontWeight: 500 }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#dc2626', marginBottom: '16px' }}>
              ❌ Missing Keywords ({analysis.missingKeywords.length})
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {analysis.missingKeywords.map((kw, i) => (
                <span key={i} style={{ background: '#fef2f2', color: '#dc2626', fontSize: '12px', padding: '4px 10px', borderRadius: '20px', fontWeight: 500 }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Gap */}
        {analysis.skillsGap.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ca8a04', marginBottom: '16px' }}>⚠️ Skills Gap</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {analysis.skillsGap.map((skill, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#666' }}>
                  <span style={{ color: '#ca8a04' }}>→</span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rewritten CV */}
        <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#2563eb' }}>📄 Rewritten CV for this Role</h3>
            <CopyButton text={analysis.rewrittenCV} />
          </div>
          <pre style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {analysis.rewrittenCV}
          </pre>
        </div>

        {/* Cover Letter */}
        <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#7c3aed' }}>✉️ Cover Letter</h3>
            <CopyButton text={analysis.coverLetter} />
          </div>
          <pre style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {analysis.coverLetter}
          </pre>
        </div>

      </div>
    </div>
  )
}