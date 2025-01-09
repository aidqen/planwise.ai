import { dbService } from "@/app/api/services/db.service";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        // `params` is automatically available here
        const id = params?.id; // Access `id` directly
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const schedulesCollection = await dbService.getCollection('schedules');
        const schedule = await schedulesCollection.findOne({ _id: new ObjectId(id) });

        if (!schedule) {
            return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
        }

        return NextResponse.json(schedule);
    } catch (err) {
        console.error('Error fetching schedule:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
