'use client'

interface Analysis {
  id: string
  jobTitle: string
  companyName: string | null
  matchScore: number
  createdAt: Date
}

export default function AnalysesList({ analyses }: { analyses: Analysis[] }) {
  if (analyses.length === 0) return null

  return (
    <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '28px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Past Analyses</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            onClick={() => window.location.href = `/results/${analysis.id}`}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #f0f0f0', borderRadius: '12px', cursor: 'pointer' }}
          >
            <div>
              <p style={{ fontWeight: 600, fontSize: '15px', marginBottom: '2px' }}>{analysis.jobTitle}</p>
              {analysis.companyName && (
                <p style={{ fontSize: '13px', color: '#999' }}>{analysis.companyName}</p>
              )}
              <p style={{ fontSize: '12px', color: '#ccc', marginTop: '2px' }}>
                {new Date(analysis.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 800,
                color: analysis.matchScore >= 80 ? '#16a34a' : analysis.matchScore >= 60 ? '#ca8a04' : '#dc2626'
              }}>
                {analysis.matchScore}%
              </div>
              <p style={{ fontSize: '12px', color: '#999' }}>match</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}