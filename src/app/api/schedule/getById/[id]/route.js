import { dbService } from "@/app/api/services/db.service";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    try {
        const { params } = context
        const { id } = params; 
        console.log("🚀 ~ file: route.js:6 ~ id:", id);

        const schedulesCollection = await dbService.getCollection('schedules');

        const schedule = await schedulesCollection.findOne({ _id: ObjectId.createFromHexString(id) });
        console.log("🚀 ~ file: route.js:11 ~ schedule:", schedule);

        return NextResponse.json(schedule);
    } catch (err) {
        console.error('Error in upsert operation:', err);
        throw err;
    }
}
