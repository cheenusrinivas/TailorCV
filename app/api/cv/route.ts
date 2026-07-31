import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
const pdfParse = require("pdf-parse/lib/pdf-parse.js")

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("cv") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
const buffer = Buffer.from(bytes)
let extractedText = ''
try {
  const parsed = await pdfParse(buffer)
  extractedText = parsed.text
} catch {
  extractedText = 'Could not parse PDF text'
}

  await prisma.cV.updateMany({
    where: { userId: session.user.id, isActive: true },
    data: { isActive: false },
  })

  const cv = await prisma.cV.create({
    data: {
      userId: session.user.id,
      fileName: file.name,
      extractedText,
      isActive: true,
    },
  })

  return NextResponse.json({ success: true, cvId: cv.id })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const cv = await prisma.cV.findFirst({
    where: { userId: session.user.id, isActive: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ cv })
}