import { signIn } from "@/lib/auth"

export default function SignInPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <nav style={{ padding: '20px 32px', borderBottom: '1px solid #f0f0f0' }}>
        <a href="/" style={{ fontWeight: 800, fontSize: '18px', textDecoration: 'none', color: '#0a0a0a', letterSpacing: '-0.5px' }}>
          Tailor<span style={{ color: '#2563eb' }}>CV</span>
        </a>
      </nav>

      {/* Center card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '8px' }}>
              Tailor<span style={{ color: '#2563eb' }}>CV</span>
            </h1>
            <p style={{ color: '#666', fontSize: '15px' }}>Sign in to start tailoring your CV</p>
          </div>

          {/* Card */}
          <div style={{ border: '1px solid #e8e8e8', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>

            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
              }}
            >
              <button
                type="submit"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontSize: '15px',
                  fontWeight: 600,
                  background: '#fff',
                  color: '#0a0a0a',
                  cursor: 'pointer',
                }}
              >
                <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: '#999' }}>
                Free to use · No credit card required
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              '✅ Upload your CV once, use it forever',
              '✅ AI match score for every job',
              '✅ Rewritten CV + cover letter in seconds',
            ].map((item) => (
              <p key={item} style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}