import { dbService } from "@/app/api/services/db.service";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        console.log("🚀 ~ file: route.js:6 ~ id:", id);

        const schedulesCollection = await dbService.getCollection('schedules');

        const schedule = await schedulesCollection.findOne({ id });
        console.log("🚀 ~ file: route.js:11 ~ schedule:", schedule);

        return NextResponse.json(schedule);
    } catch (err) {
        console.error('Error in upsert operation:', err);
        throw err;
    }
}
