import { dbService } from "../../services/db.service";

export default async function PUT(req, context) {
    try {
        const scheduleToSave = await req.json()
        
        const schedulesCollection = await dbService.getCollection('schedules')
        schedulesCollection.updateOne({_id: scheduleToSave._id}, {$set: scheduleToSave})
    } catch (err) {
        throw err
    }
}