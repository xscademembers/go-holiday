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
    const { passwordVersion } = req.body;

    // Get current admin
    const admin = await db.collection('admin').findOne({});
    
    if (!admin) {
      return res.status(401).json({ valid: false, message: 'No admin found' });
    }

    const currentVersion = admin.passwordVersion || 1;
    
    // Check if the stored version matches current version
    if (passwordVersion && parseInt(passwordVersion) === currentVersion) {
      return res.status(200).json({ valid: true, passwordVersion: currentVersion });
    } else {
      return res.status(401).json({ valid: false, message: 'Session expired - password was changed' });
    }
  } catch (error) {
    console.error('Verify Error:', error);
    res.status(500).json({ valid: false, message: 'Verification failed' });
  }
}

