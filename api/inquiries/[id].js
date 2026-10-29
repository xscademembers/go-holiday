import { ObjectId } from 'mongodb';
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

  const { id } = req.query;

  try {
    const { db } = await connectToDatabase();

    if (req.method === 'PATCH') {
      const { status } = req.body;

      await db.collection('inquiries').updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );

      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      await db.collection('inquiries').deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

