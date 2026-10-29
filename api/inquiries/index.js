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

  try {
    const { db } = await connectToDatabase();

    if (req.method === 'GET') {
      const inquiries = await db.collection('inquiries')
        .find({})
        .sort({ date: -1 })
        .toArray();

      const transformed = inquiries.map(inquiry => ({
        ...inquiry,
        id: inquiry._id.toString(),
        _id: undefined
      }));

      return res.status(200).json(transformed);
    }

    if (req.method === 'POST') {
      const { name, email, phone, tripLocation, message } = req.body;

      const newInquiry = {
        name,
        email,
        phone,
        tripLocation,
        message,
        date: new Date().toISOString(),
        status: 'new'
      };

      const result = await db.collection('inquiries').insertOne(newInquiry);

      return res.status(201).json({
        ...newInquiry,
        id: result.insertedId.toString()
      });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

