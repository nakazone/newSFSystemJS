import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const city = await prisma.city.findUnique({
    where: { id: params.id },
  })

  if (!city) {
    return NextResponse.json({ error: 'City not found' }, { status: 404 })
  }

  return NextResponse.json(city)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    const city = await prisma.city.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: data.slug,
        state: data.state,
        zipCode: data.zipCode,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        description: data.description,
        localContent: data.localContent,
        neighborhoods: data.neighborhoods,
        latitude: data.latitude,
        longitude: data.longitude,
        published: data.published,
      },
    })

    return NextResponse.json(city)
  } catch (error: any) {
    console.error('Error updating city:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update city' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.city.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting city:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete city' },
      { status: 500 }
    )
  }
}
