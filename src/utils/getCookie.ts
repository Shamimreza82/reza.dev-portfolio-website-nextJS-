'use server'

import { cookies } from 'next/headers'

export async function getCookie(name: string): Promise<string | null> {
  const cookieStore = await cookies()             // request-scoped cookie jar
  return cookieStore.get(name)?.value ?? null
}
