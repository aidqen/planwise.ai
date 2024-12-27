import { MongoClient } from 'mongodb'

export const dbService = { getCollection }

var dbConn = null
const DB_URL = process.env.DATABASE_URL
const DB_NAME = process.env.DB_NAME

async function getCollection(collectionName) {
	try {
		const db = await _connect()
		const collection = await db.collection(collectionName)
		return collection
	} catch (err) {
		throw err
	}
}

async function _connect() {
	if (dbConn) return dbConn

	try {
		const client = await MongoClient.connect(DB_URL)
		return dbConn = client.db(DB_NAME)
	} catch (err) {
		throw err
	}
}