import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const searchParams = request.nextUrl.searchParams
  const is_active = searchParams.get('is_active')
  const role = searchParams.get('role')?.trim() || undefined
  const where: { is_active?: number; role?: string } = {}
  if (is_active !== null && is_active !== undefined && is_active !== '') {
    where.is_active = parseInt(is_active, 10)
  }
  if (role) where.role = role
  try {
    const users = await prisma.user.findMany({
      where: Object.keys(where).length ? where : undefined,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        is_active: true,
      },
    })
    return NextResponse.json({ success: true, users })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
