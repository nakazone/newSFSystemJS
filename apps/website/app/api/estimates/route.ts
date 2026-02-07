import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Save lead to database
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        city: data.city,
        message: data.message,
        source: 'form',
        page: data.page || '/free-estimate',
        status: 'NEW',
      },
    })

    // TODO: Send email notification
    // TODO: Integrate with CRM (GoHighLevel, HubSpot, etc.)

    return NextResponse.json(
      { success: true, message: 'Estimate request received', id: lead.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing estimate:', error)
    return NextResponse.json(
      { success: false, message: 'Error processing request' },
      { status: 500 }
    )
  }
}
