import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import CVUpload from "./components/CVUpload"
import AnalysesList from "./components/AnalysesList"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

  const cv = await prisma.cV.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  const analyses = await prisma.analysis.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', color: '#0a0a0a' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
        <div style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px' }}>
          Tailor<span style={{ color: '#2563eb' }}>CV</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>{session.user?.name}</span>
          <a href="/api/auth/signout" style={{ fontSize: '13px', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '6px 14px', color: '#666', textDecoration: 'none', background: '#fff' }}>Sign out</a>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Your CV</h2>
          <p style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>Upload once — used for all your analyses</p>
          <CVUpload hasExistingCV={!!cv} existingFileName={cv?.fileName} />
        </div>

        {cv && (
          <div style={{ background: '#0a0a0a', borderRadius: '16px', padding: '28px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Ready to analyse a job?</h3>
              <p style={{ fontSize: '14px', color: '#888' }}>Paste a job description and get your tailored CV instantly</p>
            </div>
            <a href="/analyse" style={{ background: '#fff', color: '#0a0a0a', padding: '12px 24px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>Analyse a Job</a>
          </div>
        )}

        <AnalysesList analyses={analyses} />

        {analyses.length === 0 && cv && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#999' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎯</div>
            <p style={{ fontSize: '15px' }}>No analyses yet — paste a job description to get started!</p>
          </div>
        )}

        {!cv && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#999' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
            <p style={{ fontSize: '15px' }}>Upload your CV above to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
