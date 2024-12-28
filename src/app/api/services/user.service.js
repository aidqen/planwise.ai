import { dbService } from "./db.service"

export async function upsertUser(profile) {
  console.log("🚀 ~ file: user.service.js:4 ~ profile:", profile)
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
      console.log('User created:', result.upsertedId);
      return { created: true, id: result.upsertedId };
    } else {
      console.log('User updated:', profile.email);
      return { created: false, email: profile.email };
    }
  } catch (err) {
    console.error('Error in upsert operation:', err);
    throw err;
  }
}
