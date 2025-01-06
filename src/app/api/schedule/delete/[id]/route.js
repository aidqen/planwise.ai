import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbService } from "@/services/dbService";

export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return new NextResponse("Schedule ID is required", { status: 400 });
        }

        const scheduleCollection = await dbService.getCollection("schedules");
        
        // Find the schedule and verify ownership
        const schedule = await scheduleCollection.findOne({
            _id: id,
            userId: session.user.id
        });

        if (!schedule) {
            return new NextResponse("Schedule not found or unauthorized", { status: 404 });
        }

        // Delete the schedule
        await scheduleCollection.deleteOne({
            _id: id,
            userId: session.user.id
        });

        return new NextResponse("Schedule deleted successfully", { status: 200 });
    } catch (error) {
        console.error("[SCHEDULE_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}