import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-black mb-4">
          Tailor<span className="text-blue-500">CV</span>
        </h1>
        <p className="text-zinc-400 text-xl mb-4">
          AI-powered CV tailoring for every job you apply to.
        </p>
        <p className="text-zinc-600 text-sm mb-10">
          Upload your CV once. Paste any job description. Get a tailored CV, cover letter and match score in seconds.
        </p>
        
          <a href="/signin"
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            fontWeight: 700,
            fontSize: '16px',
            padding: '16px 40px',
            borderRadius: '12px',
            textDecoration: 'none',
          }}
        >
          Get Started — It's Free
        </a>
        <p className="text-zinc-700 text-xs mt-6">No credit card required</p>
      </div>
    </div>
  )
}