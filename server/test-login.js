// Quick test for admin login
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config({ path: '../.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);

async function test() {
  try {
    await client.connect();
    const db = client.db('go_holidays');
    
    // Check current admin
    const admin = await db.collection('admin').findOne({});
    console.log('Current admin in DB:', admin);
    
    // Reset admin
    await db.collection('admin').deleteMany({});
    await db.collection('admin').insertOne({
      username: 'admin',
      password: 'goholidays',
      createdAt: new Date().toISOString()
    });
    
    // Verify
    const newAdmin = await db.collection('admin').findOne({});
    console.log('New admin in DB:', newAdmin);
    
    // Test login query
    const loginTest = await db.collection('admin').findOne({ 
      username: 'admin',
      password: 'goholidays' 
    });
    console.log('Login test result:', loginTest ? 'SUCCESS' : 'FAILED');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

test();

