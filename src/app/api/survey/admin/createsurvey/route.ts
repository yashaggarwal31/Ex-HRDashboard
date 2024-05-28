import { NextResponse } from 'next/server'
import { Json } from '@/types/database.types'
import { AddSurvey } from '@/lib/surveys'
import { getUserIdFromClerkId } from '@/lib/users'

// export const dynamic = 'force-dynamic'

interface Survey {
  title: string
  survey_fields: Json
  created_by: string
  closes_at: string
  survey_img: string
}

export async function POST (req: Request) {
  let creatorID

  console.log('hello')
  const request: Survey = await req.json()

  creatorID = request.created_by

  if (!request.title || typeof request.title !== 'string') {
    return NextResponse.json(
      { status: 400, statusText: 'title is not defined or is not a string' },
      { status: 400 }
    )
  }

  if (typeof request.created_by !== 'number' || isNaN(request.created_by)) {
    creatorID = await getUserIdFromClerkId(request.created_by)
  }

  if (!request.closes_at || typeof request.closes_at !== 'string') {
    return NextResponse.json(
      {
        status: 400,
        statusText: 'closes_at is not defined or is not a string'
      },
      { status: 400 }
    )
  }

  // request.created_by = user_id
  // console.log(request);

  const result = await AddSurvey(request, creatorID)
  console.log(result)
  return NextResponse.json({ Response: result })
}
