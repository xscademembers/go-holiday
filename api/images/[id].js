import { connectToDatabase } from '../lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Image ID is required' });
    }

    const { db } = await connectToDatabase();
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid image ID' });
    }

    const image = await db.collection('images').findOne({ 
      _id: new ObjectId(id) 
    });

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Set appropriate content type
    res.setHeader('Content-Type', image.mimetype || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    
    // Return the base64 image data
    // The imageData is stored as data URL, so we can send it directly
    // But we need to extract just the base64 part and convert it
    if (image.data.startsWith('data:')) {
      const base64Data = image.data.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      return res.status(200).send(buffer);
    } else {
      // Fallback: if stored as pure base64
      const buffer = Buffer.from(image.data, 'base64');
      return res.status(200).send(buffer);
    }

  } catch (error) {
    console.error('Image retrieval error:', error);
    return res.status(500).json({ error: 'Failed to retrieve image' });
  }
}

