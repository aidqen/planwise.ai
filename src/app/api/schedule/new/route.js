import { dbService } from "../../services/db.service";
import { NextResponse } from "next/server"; // Ensure this import is present

export async function POST(req) {
    try {
        const schedule = await req.json();

        // Ensure the database connection and collection are valid
        const schedulesCollection = await dbService.getCollection('schedules');
        
        // Insert the schedule into the database
        const result = await schedulesCollection.insertOne(schedule);
        console.log("🚀 ~ file: route.js:13 ~ result:", result)
        schedule.id = result.insertedId;
        // Respond with the result, making sure it's valid JSON
        return NextResponse.json({ message: "Schedule added successfully", data: schedule }, { status: 200 });
    } catch (error) {
        console.error("Failed to save schedule:", error);

        // Return an error response if anything goes wrong
        return NextResponse.json(
            { error: "Failed to save schedule", details: error.message },
            { status: 500 }
        );
    }
}
