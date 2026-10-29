import { connectToDatabase } from '../lib/mongodb.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', success: false });
  }

  try {
    // Vercel serverless functions automatically parse JSON body
    // Access req.body directly like other API functions
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        error: 'Request body is missing. Please try again.',
        success: false 
      });
    }

    const { imageData, filename, mimetype } = req.body;

    if (!imageData) {
      return res.status(400).json({ 
        error: 'No image data provided. Please select an image file.',
        success: false 
      });
    }

    // Validate image data format
    if (!imageData.startsWith('data:image/')) {
      return res.status(400).json({ 
        error: 'Invalid image format. Please select a valid image file.',
        success: false 
      });
    }

    // Validate file size (10MB limit for base64)
    const base64Data = imageData.split(',')[1];
    if (!base64Data) {
      return res.status(400).json({ 
        error: 'Invalid image data format',
        success: false 
      });
    }

    const sizeInBytes = (base64Data.length * 3) / 4;
    if (sizeInBytes > 10 * 1024 * 1024) {
      return res.status(400).json({ 
        error: 'File too large. Maximum size is 10MB.',
        success: false 
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const ext = filename?.split('.').pop() || mimetype?.split('/')[1] || 'jpg';
    const uniqueFilename = `tour-${timestamp}-${random}.${ext}`;

    // Store image in MongoDB
    const { db } = await connectToDatabase();
    const result = await db.collection('images').insertOne({
      filename: uniqueFilename,
      originalFilename: filename || uniqueFilename,
      mimetype: mimetype || 'image/jpeg',
      data: imageData,
      size: sizeInBytes,
      uploadedAt: new Date().toISOString(),
    });

    // Return path that will be used to retrieve the image
    const imagePath = `/api/images/${result.insertedId.toString()}`;

    return res.status(200).json({
      success: true,
      imagePath: imagePath,
      filename: uniqueFilename,
      id: result.insertedId.toString(),
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to upload image. Please try again.',
      success: false 
    });
  }
}
