import { NextResponse } from 'next/server';
import { dbService } from '../../services/db.service';
import { ObjectId } from 'mongodb';

export async function PUT(req) {
    try {
        const userToSave = await req.json();
        console.log("🚀 ~ file: route.js:8 ~ userToSave:", userToSave)

        const usersCollection = await dbService.getCollection('User');
        
        // First let's check if the user exists

        const result = await usersCollection.updateOne(
            { _id: ObjectId.createFromHexString(userToSave._id) },
            { 
                $set: { 
                    name: userToSave.name, 
                    image: userToSave.image,
                    schedules: userToSave?.schedules ? [...userToSave.schedules] : [], // This is an array, spread it
                    updatedAt: new Date(),
                    preferences: userToSave?.preferences || {}, // Use object directly
                    routines: userToSave?.routines ? [...userToSave.routines] : [],
                    goals: userToSave?.goals ? [...userToSave.goals] : [],
                } 
            },
            { upsert: true } // This will create the document if it doesn't exist
        );


        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            return NextResponse.json({ error: "User not found and update failed" }, { status: 404 });
        }

        // Fetch and return the updated user
        const updatedUser = await usersCollection.findOne({ _id: ObjectId.createFromHexString(userToSave._id)});
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}