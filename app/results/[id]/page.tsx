import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

  const analysis = await prisma.analysis.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!analysis) redirect("/dashboard")

  const scoreColor = analysis.matchScore >= 80 ? '#22c55e' : analysis.matchScore >= 60 ? '#eab308' : '#ef4444'

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <a href="/dashboard" className="text-xl font-black">
          Tailor<span className="text-blue-500">CV</span>
        </a>
        <a href="/analyse" className="text-xs text-zinc-400 hover:text-white transition-colors">
          + New Analysis
        </a>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="text-zinc-500 text-sm mb-1">{analysis.companyName || 'Company'}</p>
          <h1 className="text-3xl font-black mb-6">{analysis.jobTitle}</h1>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center mb-8">
            <div style={{ fontSize: '72px', fontWeight: 900, color: scoreColor, lineHeight: 1 }}>
              {analysis.matchScore}%
            </div>
            <p className="text-zinc-400 mt-2 text-sm">CV Match Score</p>
            <p className="text-zinc-600 text-xs mt-1">
              {analysis.matchScore >= 80 ? '🟢 Strong match — apply with confidence!' :
               analysis.matchScore >= 60 ? '🟡 Good match — a few tweaks will help' :
               '🔴 Weak match — use the rewritten CV below'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-bold text-green-400 mb-4">✅ Matched Keywords ({analysis.matchedKeywords.length})</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.matchedKeywords.map((kw, i) => (
                <span key={`matched-${i}`} style={{ background: '#14532d', color: '#86efac', fontSize: '12px', padding: '4px 10px', borderRadius: '20px' }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-bold text-red-400 mb-4">❌ Missing Keywords ({analysis.missingKeywords.length})</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.missingKeywords.map((kw, i) => (
                <span key={`missing-${i}`} style={{ background: '#450a0a', color: '#fca5a5', fontSize: '12px', padding: '4px 10px', borderRadius: '20px' }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {analysis.skillsGap.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10">
            <h3 className="font-bold text-yellow-400 mb-4">⚠️ Skills Gap</h3>
            <ul className="space-y-2">
              {analysis.skillsGap.map((skill, i) => (
                <li key={`skill-${i}`} className="text-zinc-400 text-sm flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">→</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-blue-400">📄 Rewritten CV for this Role</h3>
          </div>
          <pre className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {analysis.rewrittenCV}
          </pre>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-purple-400">✉️ Cover Letter</h3>
          </div>
          <pre className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {analysis.coverLetter}
          </pre>
        </div>

      </div>
    </div>
  )
}