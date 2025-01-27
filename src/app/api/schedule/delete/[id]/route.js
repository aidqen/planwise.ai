import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbService } from "@/app/api/services/db.service";

export async function DELETE(req, { params }) {
    try {

        const { id } = params;
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!id || !userId) {
            return new NextResponse("Schedule ID and User ID are required", { status: 400 });
        }

        const scheduleCollection = await dbService.getCollection("schedules");
        
        if (schedule?.creator?.id !== userId) NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Delete the schedule
        await scheduleCollection.deleteOne({
            _id: id,
        });

        return new NextResponse("Schedule deleted successfully", { status: 200 });
    } catch (error) {
        console.error("[SCHEDULE_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}