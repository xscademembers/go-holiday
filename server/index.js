import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());

// Serve uploaded images statically (from root public folder) - MUST be before express.json()
const publicPath = path.join(__dirname, '..', 'public');
app.use('/uploads', express.static(path.join(publicPath, 'uploads')));

// JSON parser - AFTER static file serving (important for file uploads)
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(publicPath, 'uploads', 'tours');
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-random-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase();
    cb(null, `${basename}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('go_holidays');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// ==================== DEFAULT TOURS DATA ====================
const DEFAULT_TOURS = [
  {
    id: 'golden-triangle',
    title: 'The Royal Golden Triangle',
    location: 'Delhi - Agra - Jaipur',
    days: 6,
    price: 45000,
    category: 'Culture',
    packageType: 'domestic',
    featured: true,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop',
    description: 'Immerse yourself in the opulent history of North India. Witness the sunrise over the Taj Mahal, ride elephants at Amber Fort, and explore the vibrant bazaars of Delhi.',
    highlights: ['Sunrise at Taj Mahal', 'Amber Fort Jeep Ride', 'Rickshaw Ride in Chandni Chowk', 'Royal Rajasthani Dining Experience'],
    inclusions: ['5 Star Accommodation', 'Daily Breakfast', 'Private AC Car for all transfers', 'English Speaking Guide'],
    exclusions: ['International Flights', 'Visa Fees', 'Lunch & Dinner', 'Entrance Fees to Monuments', 'Tips & Gratuities'],
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', description: 'Welcome to India. Private luxury transfer to your 5-star heritage hotel.' },
      { day: 2, title: 'Old & New Delhi', description: 'Explore Red Fort, Jama Masjid, India Gate and Humayun\'s Tomb.' },
      { day: 3, title: 'Agra via Express Highway', description: 'Drive to Agra. Visit the majestic Agra Fort at sunset.' },
      { day: 4, title: 'The Taj Mahal & Jaipur', description: 'Early morning visit to Taj Mahal. Drive to Jaipur via Fatehpur Sikri.' },
      { day: 5, title: 'Pink City Royal Tour', description: 'Visit Amber Fort, City Palace, Jantar Mantar and Hawa Mahal.' },
      { day: 6, title: 'Return to Delhi', description: 'Leisurely drive back to Delhi for your departure flight.' }
    ]
  },
  {
    id: 'kerala-backwaters',
    title: 'Emerald Backwaters & Hills',
    location: 'Cochin - Munnar - Alleppey',
    days: 7,
    price: 38500,
    category: 'Nature',
    packageType: 'domestic',
    featured: true,
    image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1600&auto=format&fit=crop',
    description: 'Drift through the silent palm-fringed canals of God\'s Own Country. Breathe in the scent of tea in Munnar and rejuvenate with authentic Ayurveda.',
    highlights: ['Luxury Houseboat Stay', 'Tea Tasting in Munnar', 'Kathakali Cultural Show', 'Ayurvedic Rejuvenation Massage'],
    inclusions: ['Hotels & Breakfast', 'Private AC Car', 'English Speaking Guide'],
    exclusions: ['International Flights', 'Visa Fees', 'Lunch & Dinner', 'Entrance Fees to Monuments', 'Tips & Gratuities'],
    itinerary: [
      { day: 1, title: 'Arrival in Cochin', description: 'Transfer to Fort Kochi. Sunset cruise near Chinese fishing nets.' },
      { day: 2, title: 'Misty Munnar', description: 'Scenic drive to Munnar with stops at waterfalls.' },
      { day: 3, title: 'Tea Gardens & Trekking', description: 'Explore Eravikulam National Park and Tea Museum.' },
      { day: 4, title: 'Thekkady Spice Route', description: 'Drive to Periyar. Guided spice plantation tour.' },
      { day: 5, title: 'Alleppey Houseboat', description: 'Board your private premium houseboat for an overnight cruise.' },
      { day: 6, title: 'Marari Beach Relaxation', description: 'Unwind at a luxury beach resort.' },
      { day: 7, title: 'Departure', description: 'Transfer to Cochin airport with refreshed souls.' }
    ]
  },
  {
    id: 'ladakh-adventure',
    title: 'Himalayan Highs: Ladakh',
    location: 'Leh - Nubra - Pangong',
    days: 8,
    price: 52000,
    category: 'Adventure',
    packageType: 'trending',
    featured: true,
    showInPopup: true,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop',
    description: 'A surreal journey to the roof of the world. Conquer the highest motorable roads, camp by color-changing lakes, and find peace in ancient monasteries.',
    highlights: ['Khardung La Pass Crossing', 'Glamping at Pangong Lake', 'Thiksey Monastery Morning Prayer', 'Bactrian Camel Ride in Nubra'],
    inclusions: ['Hotels & Breakfast', 'Private AC Car', 'English Speaking Guide'],
    exclusions: ['International Flights', 'Visa Fees', 'Lunch & Dinner', 'Entrance Fees to Monuments', 'Tips & Gratuities'],
    itinerary: [
      { day: 1, title: 'Fly to Leh', description: 'Arrival and strict rest for acclimatization. Evening Shanti Stupa visit.' },
      { day: 2, title: 'Sham Valley Sights', description: 'Magnetic Hill, Gurudwara Pathar Sahib, and Sangam confluence.' },
      { day: 3, title: 'Nubra Valley via Khardung La', description: 'Drive across the world\'s highest motorable pass.' },
      { day: 4, title: 'Nubra to Pangong', description: 'Cross Shyok river route to reach the majestic Pangong Lake.' },
      { day: 5, title: 'Pangong to Leh', description: 'Sunrise at the lake. Return to Leh via Chang La.' },
      { day: 6, title: 'Leh Monasteries', description: 'Explore Hemis and Thiksey monasteries.' },
      { day: 7, title: 'Free Day in Leh', description: 'Explore the local market and cafes.' },
      { day: 8, title: 'Departure', description: 'Fly out with memories of the mountains.' }
    ]
  },
  {
    id: 'spiritual-varanasi',
    title: 'Eternal Kashi & The Ganges',
    location: 'Varanasi - Sarnath',
    days: 4,
    price: 22000,
    category: 'Spiritual',
    packageType: 'group-departures',
    featured: false,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1600&auto=format&fit=crop',
    description: 'Step back in time in the world\'s oldest living city. Witness the spectacular Ganga Aarti and boat rides that traverse the cycle of life and death.',
    highlights: ['Evening Ganga Aarti', 'Sunrise Boat Ride', 'Sarnath Buddhist Site', 'Hidden Alleys Walk'],
    inclusions: ['Hotels & Breakfast', 'Private AC Car', 'English Speaking Guide'],
    exclusions: ['International Flights', 'Visa Fees', 'Lunch & Dinner', 'Entrance Fees to Monuments', 'Tips & Gratuities'],
    itinerary: [
      { day: 1, title: 'Arrival in Varanasi', description: 'Check-in. Witness the mesmerizing evening Aarti at Dashashwamedh Ghat.' },
      { day: 2, title: 'Sunrise on Ganges', description: 'Morning boat ride. Kashi Vishwanath Temple darshan.' },
      { day: 3, title: 'Sarnath Excursion', description: 'Visit Dhamek Stupa where Buddha gave his first sermon.' },
      { day: 4, title: 'Departure', description: 'Transfer to airport.' }
    ]
  },
  {
    id: 'goa-beach-retreat',
    title: 'Sunkissed Goa Luxury',
    location: 'North & South Goa',
    days: 5,
    price: 32000,
    category: 'Relaxation',
    packageType: 'trending',
    featured: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    description: 'Experience the Portuguese charm of Goa. From vibrant beach parties to serene old churches and luxury resorts, this is the ultimate tropical escape.',
    highlights: ['Old Goa Heritage Walk', 'Private Yacht Cruise', 'Dudhsagar Waterfalls Jeep Safari', 'Candlelight Beach Dinner'],
    inclusions: ['Hotels & Breakfast', 'Private AC Car', 'English Speaking Guide'],
    exclusions: ['International Flights', 'Visa Fees', 'Lunch & Dinner', 'Entrance Fees to Monuments', 'Tips & Gratuities'],
    itinerary: [
      { day: 1, title: 'Arrival in Goa', description: 'VIP Transfer to your beachside resort.' },
      { day: 2, title: 'North Goa Vibes', description: 'Fort Aguada, Vagator and Anjuna beaches.' },
      { day: 3, title: 'Old Goa Heritage', description: 'Basilica of Bom Jesus and Latin Quarter walk.' },
      { day: 4, title: 'South Goa Serenity', description: 'Palolem beach and sunset cruise.' },
      { day: 5, title: 'Departure', description: 'Say goodbye to the sunny state.' }
    ]
  },
  {
    id: 'rajasthan-royal',
    title: 'Royal Forts & Lakes',
    location: 'Jodhpur - Udaipur',
    days: 6,
    price: 48000,
    category: 'Culture',
    packageType: 'domestic',
    featured: false,
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=1600&auto=format&fit=crop',
    description: 'A tale of two cities: The Blue City of Jodhpur and the White City of Udaipur. Stay in palaces and live like royalty.',
    highlights: ['Mehrangarh Fort Private Tour', 'Lake Pichola Sunset Cruise', 'Vintage Car Museum', 'Ranakpur Jain Temples'],
    inclusions: ['Hotels & Breakfast', 'Private AC Car', 'English Speaking Guide'],
    exclusions: ['International Flights', 'Visa Fees', 'Lunch & Dinner', 'Entrance Fees to Monuments', 'Tips & Gratuities'],
    itinerary: [
      { day: 1, title: 'Arrival in Jodhpur', description: 'Welcome to the Blue City. Leisure evening.' },
      { day: 2, title: 'Mehrangarh Glory', description: 'Explore the massive fort and Jaswant Thada.' },
      { day: 3, title: 'Drive to Udaipur', description: 'Stop at the intricately carved Ranakpur Temples.' },
      { day: 4, title: 'Udaipur City Palace', description: 'Grand tour of the City Palace and Jagdish Temple.' },
      { day: 5, title: 'Romantic Lakes', description: 'Boat ride on Lake Pichola and Jag Mandir visit.' },
      { day: 6, title: 'Departure', description: 'Transfer to Udaipur airport.' }
    ]
  },
  {
    id: 'goa-3n4d-package',
    title: 'Goa Beach Escape 3N/4D',
    location: 'Goa',
    days: 4,
    price: 30500,
    category: 'Relaxation',
    packageType: 'domestic',
    featured: true,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1600&auto=format&fit=crop',
    description: 'Experience the best of Goa with this 3 Nights / 4 Days package. Explore pristine beaches of North & South Goa, visit historic churches, enjoy boat cruises on River Mandovi, and relax at premium hotels with breakfast included.',
    highlights: [
      'Airport/Railway Station Pickup & Drop',
      'North Goa Sightseeing - Baga, Calangute, Anjuna Beaches',
      'South Goa Sightseeing - Old Goa Church, Mangueshi Temple',
      'Boat Cruise at River Mandovi',
      'Breakfast at Hotel',
      'AC Sedan for all transfers'
    ],
    inclusions: ['Hotels & Breakfast', 'Private AC Car', 'English Speaking Guide'],
    exclusions: ['International Flights', 'Visa Fees', 'Lunch & Dinner', 'Entrance Fees to Monuments', 'Tips & Gratuities'],
    itinerary: [
      { day: 1, title: 'Arrival at Goa', description: 'Arrive at Goa Airport/Railway Station. Private pickup and transfer to your hotel. Complete check-in and enjoy a comfortable overnight stay.' },
      { day: 2, title: 'South Goa Sightseeing (10 AM - 7 PM)', description: 'After breakfast, explore South Goa: Old Goa Church, Mangueshi Temple, Dona Paula, Miramar Beach, Panjim Shopping, and Boat Cruise at River Mandovi. Return to hotel for overnight stay.' },
      { day: 3, title: 'North Goa Sightseeing (10 AM - 5 PM)', description: 'After breakfast, drive to North Goa: Anjuna Beach, Vagator Beach, Baga Beach, Siquirim Beach, Calangute Beach, and Fort Aguada. Comfortable overnight stay at hotel.' },
      { day: 4, title: 'Departure', description: 'After breakfast, check out from hotel and transfer to Goa Airport/Railway Station for your return journey. Tour ends with beautiful memories!' }
    ]
  }
];

// ==================== TOUR ROUTES ====================

// GET all tours
app.get('/api/tours', async (req, res) => {
  try {
    let tours = await db.collection('tours').find({}).toArray();

    // If no tours exist, seed with default tours
    if (tours.length === 0) {
      await db.collection('tours').insertMany(DEFAULT_TOURS);
      tours = await db.collection('tours').find({}).toArray();
      console.log('✅ Seeded default tours');
    }

    // Ensure all tours have packageType field (migration for old tours)
    const toursNeedingUpdate = tours.filter(tour => !tour.packageType);
    if (toursNeedingUpdate.length > 0) {
      console.log(`⚠️ Found ${toursNeedingUpdate.length} tours without packageType, updating...`);
      for (const tour of toursNeedingUpdate) {
        await db.collection('tours').updateOne(
          { _id: tour._id },
          { $set: { packageType: 'domestic' } } // Default to domestic
        );
      }
      // Re-fetch tours after update
      tours = await db.collection('tours').find({}).toArray();
    }

    const transformed = tours.map(tour => ({
      ...tour,
      id: tour.id || tour._id.toString(),
      packageType: tour.packageType || 'domestic', // Ensure packageType exists
      _id: undefined
    }));

    res.json(transformed);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ error: 'Failed to fetch tours' });
  }
});

// GET single tour by ID
app.get('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let tour = await db.collection('tours').findOne({ id: id });

    if (!tour) {
      try {
        tour = await db.collection('tours').findOne({ _id: new ObjectId(id) });
      } catch (e) { }
    }

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    res.json({
      ...tour,
      id: tour.id || tour._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Error fetching tour:', error);
    res.status(500).json({ error: 'Failed to fetch tour' });
  }
});

// POST new tour
app.post('/api/tours', async (req, res) => {
  try {
    const tourData = req.body;

    if (!tourData.id) {
      tourData.id = `tour-${Date.now()}`;
    }

    tourData.createdAt = new Date().toISOString();

    await db.collection('tours').insertOne(tourData);

    res.status(201).json({
      ...tourData,
      id: tourData.id
    });
  } catch (error) {
    console.error('Error creating tour:', error);
    res.status(500).json({ error: 'Failed to create tour' });
  }
});

// PATCH update tour
app.patch('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updatedAt = new Date().toISOString();

    // Get the existing tour first to preserve fields that aren't being updated
    let existingTour = await db.collection('tours').findOne({ id: id });
    
    if (!existingTour) {
      try {
        existingTour = await db.collection('tours').findOne({ _id: new ObjectId(id) });
      } catch (e) {
        // Invalid ObjectId format
      }
    }

    if (!existingTour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    // Ensure image field is preserved if not explicitly updated
    if (!updates.hasOwnProperty('image') && existingTour.image) {
      updates.image = existingTour.image;
    }

    let result = await db.collection('tours').updateOne(
      { id: id },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      try {
        result = await db.collection('tours').updateOne(
          { _id: new ObjectId(id) },
          { $set: updates }
        );
      } catch (e) { }
    }

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating tour:', error);
    res.status(500).json({ error: 'Failed to update tour' });
  }
});

// DELETE tour
app.delete('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Tour ID is required' });
    }

    // Try to delete by custom id first
    let result = await db.collection('tours').deleteOne({ id: id });

    // If not found by custom id, try MongoDB _id
    if (result.deletedCount === 0) {
      try {
        if (ObjectId.isValid(id)) {
          result = await db.collection('tours').deleteOne({ _id: new ObjectId(id) });
        }
      } catch (e) {
        console.error('Error deleting tour by ObjectId:', e);
        // Invalid ObjectId format - continue to return 404
      }
    }

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Tour not found with ID: ' + id });
    }

    res.json({ success: true, message: 'Tour deleted successfully' });
  } catch (error) {
    console.error('Error deleting tour:', error);
    res.status(500).json({ error: 'Failed to delete tour: ' + error.message });
  }
});

// ==================== INQUIRY ROUTES ====================

// GET all inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await db.collection('inquiries')
      .find({})
      .sort({ date: -1 })
      .toArray();

    // Transform _id to id for frontend compatibility
    const transformed = inquiries.map(inquiry => ({
      ...inquiry,
      id: inquiry._id.toString(),
      _id: undefined
    }));

    res.json(transformed);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// POST new inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
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

    res.status(201).json({
      ...newInquiry,
      id: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
});

// PATCH - Mark inquiry as read
app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.collection('inquiries').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// DELETE inquiry
app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('inquiries').deleteOne({ _id: new ObjectId(id) });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// ==================== ADMIN AUTH ROUTES ====================

// Initialize default admin if not exists
async function initializeAdmin() {
  try {
    const existingAdmin = await db.collection('admin').findOne({});
    if (!existingAdmin) {
      await db.collection('admin').insertOne({
        username: 'admin',
        password: 'goholidays',
        passwordVersion: 1,
        createdAt: new Date().toISOString()
      });
      console.log('✅ Default admin credentials created');
    } else {
      // Sync password to current Go Holidays default (invalidates prior passwords)
      if (existingAdmin.password !== 'goholidays' || existingAdmin.username !== 'admin') {
        const newVersion = (existingAdmin.passwordVersion || 0) + 1;
        await db.collection('admin').updateOne(
          { _id: existingAdmin._id },
          { $set: { username: 'admin', password: 'goholidays', passwordVersion: newVersion } }
        );
        console.log('✅ Admin credentials updated to Go Holidays default');
      } else if (!existingAdmin.passwordVersion) {
        await db.collection('admin').updateOne(
          { _id: existingAdmin._id },
          { $set: { passwordVersion: 1 } }
        );
      } else {
        console.log('✅ Admin exists:', existingAdmin.username);
      }
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

// POST - Verify admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await db.collection('admin').findOne({
      username: username,
      password: password
    });

    if (admin) {
      res.json({
        success: true,
        message: 'Login successful',
        passwordVersion: admin.passwordVersion || 1
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// POST - Verify session (check if password version matches)
app.post('/api/admin/verify', async (req, res) => {
  try {
    const { passwordVersion } = req.body;

    const admin = await db.collection('admin').findOne({});

    if (!admin) {
      return res.status(401).json({ valid: false, message: 'No admin found' });
    }

    const currentVersion = admin.passwordVersion || 1;

    if (passwordVersion && parseInt(passwordVersion) === currentVersion) {
      res.json({ valid: true, passwordVersion: currentVersion });
    } else {
      res.status(401).json({ valid: false, message: 'Session expired - password was changed' });
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ valid: false, message: 'Verification failed' });
  }
});

// GET - Get admin info (for checking if credentials exist)
app.get('/api/admin/check', async (req, res) => {
  try {
    const admin = await db.collection('admin').findOne({});
    res.json({ exists: !!admin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check admin' });
  }
});

// POST - Reset admin credentials to default
app.post('/api/admin/reset', async (req, res) => {
  try {
    // Get current version to increment
    const currentAdmin = await db.collection('admin').findOne({});
    const newVersion = (currentAdmin?.passwordVersion || 0) + 1;

    await db.collection('admin').deleteMany({});
    await db.collection('admin').insertOne({
      username: 'admin',
      password: 'goholidays',
      passwordVersion: newVersion,
      createdAt: new Date().toISOString()
    });
    res.json({
      success: true,
      message: 'Admin credentials reset to default (admin/goholidays). All sessions invalidated.',
      passwordVersion: newVersion
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset admin' });
  }
});

// Upload image endpoint - SIMPLE AND DIRECT
app.post('/api/upload/image', (req, res) => {
  console.log('📤 Upload request received');

  upload.single('image')(req, res, (err) => {
    // Handle multer errors
    if (err) {
      console.error('❌ Upload error:', err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            error: 'File too large. Maximum size is 10MB.',
            success: false
          });
        }
        return res.status(400).json({
          error: `Upload error: ${err.code} - ${err.message}`,
          success: false
        });
      }
      return res.status(400).json({
        error: err.message || 'Failed to upload image',
        success: false
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      console.error('❌ No file in request');
      return res.status(400).json({
        error: 'No file uploaded. Please select an image file.',
        success: false
      });
    }

    // Return the path relative to public folder
    const imagePath = `/uploads/tours/${req.file.filename}`;
    const fullPath = path.join(publicPath, 'uploads', 'tours', req.file.filename);

    console.log('✅ Image uploaded successfully:', req.file.filename);
    console.log('   Path:', imagePath);
    console.log('   Full path:', fullPath);

    res.json({
      success: true,
      imagePath: imagePath,
      filename: req.file.filename
    });
  });
});

// ==================== SITE SETTINGS ROUTES ====================

// Default site settings
const DEFAULT_SETTINGS = {
  heroBackgroundImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop'
};

// GET site settings
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await db.collection('settings').findOne({});

    // If no settings exist, create with defaults
    if (!settings) {
      await db.collection('settings').insertOne(DEFAULT_SETTINGS);
      settings = DEFAULT_SETTINGS;
      console.log('✅ Created default site settings');
    }

    res.json({
      heroBackgroundImage: settings.heroBackgroundImage || DEFAULT_SETTINGS.heroBackgroundImage
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PATCH update site settings
app.patch('/api/settings', async (req, res) => {
  try {
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

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
connectDB().then(() => {
  initializeAdmin();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

