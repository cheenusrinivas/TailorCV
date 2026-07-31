import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import CVUpload from "./components/CVUpload"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/signin")
  }

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
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black">
          Tailor<span className="text-blue-500">CV</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-zinc-400 text-sm">{session.user?.name}</span>
          <a href="/api/auth/signout" className="text-xs border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-400 hover:text-white transition-colors">
            Sign out
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* CV Upload Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-black mb-2">Your CV</h2>
          <p className="text-zinc-500 text-sm mb-6">
            Upload your CV once — we'll use it for all your analyses.
          </p>
          <CVUpload
            hasExistingCV={!!cv}
            existingFileName={cv?.fileName}
          />
        </div>

        {/* Analyse Button */}
        {cv && (
          <div className="mb-12">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-black mb-2">Ready to analyse?</h3>
              <p className="text-zinc-400 text-sm mb-6">
                Paste a job description and get your tailored CV in seconds.
              </p>
              
                <a vhref="/analyse"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                Analyse a Job →
              </a>
            </div>
          </div>
        )}

        {/* Past Analyses */}
        {analyses.length > 0 && (
          <div>
            <h2 className="text-2xl font-black mb-6">Past Analyses</h2>
            <div className="space-y-3">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex justify-between items-center hover:border-zinc-600 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-white font-semibold">{analysis.jobTitle}</p>
                    {analysis.companyName && (
                      <p className="text-zinc-500 text-sm mt-0.5">{analysis.companyName}</p>
                    )}
                    <p className="text-zinc-600 text-xs mt-1">
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-black ${
                      analysis.matchScore >= 80 ? 'text-green-400' :
                      analysis.matchScore >= 60 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {analysis.matchScore}%
                    </div>
                    <p className="text-zinc-600 text-xs mt-0.5">match</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {analyses.length === 0 && cv && (
          <div className="text-center py-12 text-zinc-600">
            <div className="text-4xl mb-3">🎯</div>
            <p>No analyses yet — paste a job description to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}