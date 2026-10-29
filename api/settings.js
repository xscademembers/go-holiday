import { connectToDatabase } from './lib/mongodb.js';

// Default site settings
const DEFAULT_SETTINGS = {
  heroBackgroundImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop'
};

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

  try {
    const { db } = await connectToDatabase();

    // GET - Fetch site settings
    if (req.method === 'GET') {
      let settings = await db.collection('settings').findOne({});

      // If no settings exist, create with defaults
      if (!settings) {
        await db.collection('settings').insertOne(DEFAULT_SETTINGS);
        settings = DEFAULT_SETTINGS;
        console.log('✅ Created default site settings');
      }

      return res.status(200).json({
        heroBackgroundImage: settings.heroBackgroundImage || DEFAULT_SETTINGS.heroBackgroundImage
      });
    }

    // PATCH - Update site settings
    if (req.method === 'PATCH') {
      const updates = req.body;
      updates.updatedAt = new Date().toISOString();

      let settings = await db.collection('settings').findOne({});

      if (!settings) {
        // Create settings if they don't exist
        await db.collection('settings').insertOne({ ...DEFAULT_SETTINGS, ...updates });
      } else {
        // Update existing settings
        await db.collection('settings').updateOne({}, { $set: updates });
      }

      return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Settings API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

