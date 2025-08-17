import { MongoClient, ObjectId } from "mongodb"
import { Db } from "mongodb"


export const collections = {
  users: "users",
  sessions: "sessions",
  verificationTokens: "verification_tokens",
  accounts: "accounts",
}


export interface UserDocument {
  _id?: ObjectId
  uid: string // 9-digit unique identifier
  name?: string
  email: string
  password: string
  image?: string
  emailVerified?: Date
  createdAt?: Date
  updatedAt?: Date
  role?: string
  subscription?: string
  verificationToken?: string
  verificationTokenExpiry?: Date
  resetToken?: string
  resetTokenExpiry?: Date
  language?: string
}


export interface SessionDocument {
  _id?: ObjectId
  userId: string
  expires: Date
  sessionToken: string
}


export interface VerificationTokenDocument {
  _id?: ObjectId
  identifier: string
  token: string
  expires: Date
}


export interface AccountDocument {
  _id?: ObjectId
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: Date
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}


let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;


async function connectToDatabase() {
  
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  
  const connectionString = process.env.MONGODB_URI || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Database connection string not found in environment variables. Please set MONGODB_URI or DATABASE_URL.");
  }

  
  const DATABASE_NAME = "savetik_db";

  
  if (!cachedClient) {
    cachedClient = new MongoClient(connectionString);
    await cachedClient.connect();
  }

  if (!cachedDb) {
    cachedDb = cachedClient.db(DATABASE_NAME);
    
    if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
      console.log(`Connected to MongoDB database: ${DATABASE_NAME}`);
    }
  }

  return { client: cachedClient, db: cachedDb };
}


export async function getDb(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}


export async function getCollection(collectionName: string) {
  const db = await getDb();
  return db.collection(collectionName);
}


export const db = {
  getDb,
  getCollection,
  collections,
};


export { ObjectId };
