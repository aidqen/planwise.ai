import { getUserSession } from '@/lib/session'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server';
import { dbService } from '../../services/db.service';


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const usersCollection = await dbService.getCollection('User');

    const user = await usersCollection.findOne({ email });

    return NextResponse.json(user)
  } catch (err) {
    console.error('Error in upsert operation:', err);
    throw err;
  }
}