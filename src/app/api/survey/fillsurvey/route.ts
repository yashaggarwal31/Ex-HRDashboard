import { NextResponse } from 'next/server'
import { Json } from '@/types/database.types'
import { cookies } from 'next/headers'
import { addUserResponse } from '@/lib/surveys'

export const dynamic = 'force-dynamic'

interface SurveyResponse {
  user_id: number
  survey_id: number
  response_data: Json
}
export async function POST (req: Request) {
  const data: SurveyResponse = await req.json()

  // if (typeof data.user_id !== 'number' || isNaN(data.user_id)) {
  //     return NextResponse.json({ status: 400, statusText: "user_id is not a number or is undefined" }, {status: 400});
  // }

  if (typeof data.survey_id !== 'number' || isNaN(data.survey_id)) {
    return NextResponse.json(
      {
        status: 400,
        statusText: 'survey_id is not a number or is undefined'
      },
      { status: 400 }
    )
  }

  const result = await addUserResponse(data)
  return NextResponse.json({ Response: result }, { status: result.status })

  //   return NextResponse.json({ status: 401 })
}
