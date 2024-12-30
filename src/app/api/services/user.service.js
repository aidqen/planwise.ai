import { dbService } from "./db.service"

export async function upsertUser(profile) {
  try {
    const usersCollection = await dbService.getCollection('User');

    const result = await usersCollection.updateOne(
      { email: profile.email }, // Find user by email
      {
        $set: {
          name: profile.name,  // Fields to update or insert
          email: profile.email, // Ensures email is always set
        },
      },
      { upsert: true } // Create a new document if none matches the filter
    );

    if (result.upsertedCount > 0) {
      return { created: true, id: result.upsertedId };
    } else {
      return { created: false, email: profile.email };
    }
  } catch (err) {
    console.error('Error in upsert operation:', err);
    throw err;
  }
}

