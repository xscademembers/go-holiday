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
    const { username, password } = req.body;

    // Check if admin exists, if not create default with passwordVersion
    let admin = await db.collection('admin').findOne({});
    
    if (!admin) {
      await db.collection('admin').insertOne({
        username: 'admin',
        password: 'goholidays',
        passwordVersion: 1,
        createdAt: new Date().toISOString()
      });
      admin = { username: 'admin', password: 'goholidays', passwordVersion: 1 };
    } else if (admin.password !== 'goholidays' || admin.username !== 'admin') {
      // Sync prior passwords to current Go Holidays default
      const newVersion = (admin.passwordVersion || 0) + 1;
      await db.collection('admin').updateOne(
        { _id: admin._id },
        { $set: { username: 'admin', password: 'goholidays', passwordVersion: newVersion } }
      );
      admin = { ...admin, username: 'admin', password: 'goholidays', passwordVersion: newVersion };
    } else if (!admin.passwordVersion) {
      await db.collection('admin').updateOne(
        { _id: admin._id },
        { $set: { passwordVersion: 1 } }
      );
      admin.passwordVersion = 1;
    }

    // Verify credentials
    const validAdmin = await db.collection('admin').findOne({
      username: username,
      password: password
    });

    if (validAdmin) {
      return res.status(200).json({ 
        success: true, 
        message: 'Login successful',
        passwordVersion: validAdmin.passwordVersion || 1
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
}

