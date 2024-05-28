'use server'

import { cookies } from 'next/headers'

export async function create (data) {
  cookies().set('name', 'lee')
  // or
}
