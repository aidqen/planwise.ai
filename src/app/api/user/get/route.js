import { getUserSession } from '@/lib/session'
import { authOptions } from '../../auth/[...nextauth]/route'


export async function GET(req) {
  try {
    const userDetails = getUserSession(authOptions)
    // const user = await prisma.user.findFirst({where: {_id: userDetails.id}}) // Modify query as needed
    return Response.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 })
  } finally {
    // await prisma.$disconnect()
  }
}