import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#0a0a0a' }}>

      {/* Navbar */}
      <nav style={{ borderBottom: '1px solid #f0f0f0', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>
          Tailor<span style={{ color: '#2563eb' }}>CV</span>
        </div>
        <a href="/signin" style={{ background: '#0a0a0a', color: '#fff', padding: '8px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
          Get Started
        </a>
      </nav>

      {/* Hero */}
      {/* Hero */}
      <div style={{ background: 'radial-gradient(circle, #e8f0fe 1px, transparent 1px)', backgroundSize: '24px 24px', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 32px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#f0f7ff', color: '#2563eb', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '20px', marginBottom: '24px', letterSpacing: '0.05em' }}>
          Powered by Gemini AI
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '20px' }}>
          Your CV, tailored for<br />
          <span style={{ color: '#2563eb' }}>every job you apply to</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#666', lineHeight: 1.7, marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>
          Upload your CV once. Paste any job description. Get a tailored CV, match score and cover letter in seconds.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/signin" style={{ background: '#0a0a0a', color: '#fff', padding: '14px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}>
            Start for free →
          </a>
          <a href="#how" style={{ background: '#f5f5f5', color: '#0a0a0a', padding: '14px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>
            See how it works
          </a>
        </div>
        <p style={{ fontSize: '13px', color: '#999', marginTop: '16px' }}>Free to use · No credit card required</p>
      </div>

      {/* Stats */}
      <div style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '32px', display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap' }}>
        {[
          { number: '< 30s', label: 'Analysis time' },
          { number: '100%', label: 'AI powered' },
          { number: 'Free', label: 'To get started' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-1px' }}>{stat.number}</div>
            <div style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>{stat.label}</div>
          </div>

        ))}
      </div>
      </div>

      {/* How it works */}
      <div id="how" style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 32px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 800, textAlign: 'center', marginBottom: '12px', letterSpacing: '-1px' }}>How it works</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '56px', fontSize: '16px' }}>Three steps to a tailored CV</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {[
            { step: '01', title: 'Upload your CV', desc: 'Upload your CV as a PDF once. We store it securely and use it for all your analyses.' },
            { step: '02', title: 'Paste job description', desc: 'Copy and paste the job description from any job board — LinkedIn, Indeed, company site.' },
            { step: '03', title: 'Get your tailored CV', desc: 'AI analyses both and returns a match score, missing keywords, rewritten CV and cover letter.' },
          ].map((item) => (
            <div key={item.step} style={{ padding: '28px', border: '1px solid #f0f0f0', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', letterSpacing: '0.1em', marginBottom: '12px' }}>{item.step}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.3px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What you get */}
      <div style={{ background: '#f8f8f8', padding: '80px 32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, textAlign: 'center', marginBottom: '12px', letterSpacing: '-1px' }}>What you get</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '56px', fontSize: '16px' }}>Every analysis includes</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { icon: '📊', title: 'Match Score', desc: '0-100% score showing how well your CV matches the job' },
              { icon: '✅', title: 'Matched Keywords', desc: 'Keywords you already have that the employer wants' },
              { icon: '❌', title: 'Missing Keywords', desc: 'Important keywords from the JD missing from your CV' },
              { icon: '⚠️', title: 'Skills Gap', desc: 'Honest assessment of what you need to be a stronger candidate' },
              { icon: '📄', title: 'Rewritten CV', desc: 'Your CV rewritten and optimised for that specific role' },
              { icon: '✉️', title: 'Cover Letter', desc: 'A professional cover letter tailored for that company and role' },
            ].map((item) => (
              <div key={item.title} style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-1px' }}>Ready to get more interviews?</h2>
        <p style={{ color: '#666', marginBottom: '32px', fontSize: '16px' }}>Join job seekers already using TailorCV to stand out.</p>
        <a href="/signin" style={{ background: '#0a0a0a', color: '#fff', padding: '16px 40px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}>
          Get started for free →
        </a>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #f0f0f0', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontWeight: 700, fontSize: '16px' }}>Tailor<span style={{ color: '#2563eb' }}>CV</span></div>
        <p style={{ fontSize: '13px', color: '#999' }}>Built by <a href="https://srini-builds.netlify.app" style={{ color: '#0a0a0a', fontWeight: 600 }}>Srinivas Udhayasankar</a></p>
      </div>
    </div>
  )
}