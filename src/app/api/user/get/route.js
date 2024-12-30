import { getUserSession } from '@/lib/session'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server';
import { dbService } from '../../services/db.service';


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    console.log("🚀 ~ file: route.js:11 ~ email:", email)

    const usersCollection = await dbService.getCollection('User');

    const user = await usersCollection.findOne({ email });
    console.log("🚀 ~ file: route.js:11 ~ user:", user)

    return NextResponse.json(user)
  } catch (err) {
    console.error('Error in upsert operation:', err);
    throw err;
  }
}