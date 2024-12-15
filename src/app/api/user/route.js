import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const user = await prisma.user.findFirst() // Modify query as needed
    return Response.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}