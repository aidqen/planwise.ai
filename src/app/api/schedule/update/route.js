import { dbService } from "../../services/db.service"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export async function PUT(req) {
    try {
        const scheduleToSave = await req.json()
        
        const schedulesCollection = await dbService.getCollection('schedules')
        const result = await schedulesCollection.updateOne(
            { _id: ObjectId.createFromHexString(scheduleToSave.id) },
            { 
                $set: {
                    name: scheduleToSave.name,
                    preferences: scheduleToSave.preferences,
                    schedule: scheduleToSave.schedule,
                    updatedAt: scheduleToSave.updatedAt
                } 
            }
        )

        return NextResponse.json({ success: true, result })
    } catch (err) {
        console.error('Error updating schedule:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}