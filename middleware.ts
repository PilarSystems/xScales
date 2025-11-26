import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSupabaseAdmin } from './lib/supabaseAdmin'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  if (!pathname.startsWith('/app')) return NextResponse.next()

  const token = req.cookies.get('sb-access-token')?.value || req.cookies.get('sb:token')?.value
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  try {
    const supabaseAdmin = getSupabaseAdmin()
    // @ts-ignore - use server admin to validate the token
    const { data } = await (supabaseAdmin.auth.getUser as any)(token)
    const user = data?.user
    if (!user) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  } catch (err) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/app/:path*']
}
