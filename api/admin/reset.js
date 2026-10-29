import { connectToDatabase } from '../lib/mongodb.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();

    // Get current admin to increment passwordVersion
    const currentAdmin = await db.collection('admin').findOne({});
    const newVersion = (currentAdmin?.passwordVersion || 0) + 1;

    await db.collection('admin').deleteMany({});
    await db.collection('admin').insertOne({
      username: 'admin',
      password: 'goholidays',
      passwordVersion: newVersion,
      createdAt: new Date().toISOString()
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Admin credentials reset to default (admin/goholidays). All sessions invalidated.',
      passwordVersion: newVersion
    });
  } catch (error) {
    console.error('Reset Error:', error);
    res.status(500).json({ error: 'Failed to reset admin' });
  }
}

