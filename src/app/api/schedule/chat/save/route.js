import { dbService } from '@/app/api/services/db.service'
import { ObjectId } from 'mongodb'

export async function POST(request) {
  try {
    const { scheduleId, chat } = await request.json()
    if (!scheduleId || !chat) {
      throw new Error('Missing scheduleId or chat')
    }

    const schedulesCollection = await dbService.getCollection('schedules')
    
    const result = await schedulesCollection.updateOne(
      { _id: ObjectId.createFromHexString(scheduleId) },
      { $set: { chat } }
    )

    if (result.matchedCount === 0) {
      throw new Error('Schedule not found')
    }

    return new Response(JSON.stringify({ 
      success: true,
      scheduleId,
      chat 
    }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {
    console.error('Save chat error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to save chat', 
        details: error.message 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
}