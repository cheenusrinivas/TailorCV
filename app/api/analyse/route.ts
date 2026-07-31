import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { jobTitle, companyName, jobDescription } = await req.json()

  const cv = await prisma.cV.findFirst({
    where: { userId: session.user.id, isActive: true },
  })

  if (!cv) {
    return NextResponse.json({ error: "No CV found. Please upload your CV first." }, { status: 400 })
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

  const prompt = `You are an expert CV/resume consultant and ATS specialist.

I will give you a candidate's CV and a job description. Analyse them and respond ONLY with a valid JSON object. No markdown, no backticks, just raw JSON.

CV TEXT:
${cv.extractedText}

JOB DESCRIPTION:
${jobDescription}

JOB TITLE: ${jobTitle}
COMPANY: ${companyName || 'Not specified'}

Respond ONLY with this exact JSON structure:
{
  "matchScore": <number 0-100>,
  "matchedKeywords": [<array of keywords found in both CV and JD>],
  "missingKeywords": [<array of important keywords in JD but missing from CV>],
  "skillsGap": [<array of skills the candidate lacks>],
  "rewrittenCV": "<full rewritten CV text optimised for this specific job>",
  "coverLetter": "<professional cover letter for this specific role>"
}`

  try {
    const result = await model.generateContent(prompt)
    const responseText = result.response.text().trim()

    const clean = responseText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    const analysis = await prisma.analysis.create({
      data: {
        userId: session.user.id,
        cvId: cv.id,
        jobTitle,
        companyName: companyName || null,
        jobDescription,
        matchScore: parsed.matchScore,
        matchedKeywords: parsed.matchedKeywords,
        missingKeywords: parsed.missingKeywords,
        skillsGap: parsed.skillsGap,
        rewrittenCV: parsed.rewrittenCV,
        coverLetter: parsed.coverLetter,
      },
    })

    return NextResponse.json({ success: true, analysisId: analysis.id })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 })
  }
}