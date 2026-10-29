import { Tour, Testimonial, PackageType } from './types';

export const APP_NAME = "Go Holidays";

/** Single source of truth for contact & brand details (from Go Holidays content brief) */
export const SITE_INFO = {
  name: 'Go Holidays',
  legalName: 'Go Holidays (Tours & Travel)',
  website: 'https://goholidays.org',
  tagline: 'Travel | Explore | Belong',
  brandLine: 'The world is yours and we are your eyes',
  heroHeadline: 'Discover India. Experience More.',
  heroSubheadline:
    "Explore India's beautiful destinations with thoughtfully planned domestic tour packages, comfortable stays, sightseeing and memorable travel experiences.",
  supportingLine: 'Your Journey, Our Planning, Memories Forever.',
  phoneDisplay: '+91 91683 00111',
  phoneTel: '+919168300111',
  whatsappUrl: 'https://wa.me/919168300111',
  email: 'info@goholidays.org',
  emailAlt: 'goholidaysgloble@gmail.com',
  addressLines: [
    'Plot No. 103, Near CIIMS Hospital,',
    'Bajaj Nagar, WHC Road,',
    'Nagpur, Maharashtra – 440010',
  ],
  addressOneLine:
    'Plot No. 103, Near CIIMS Hospital, Bajaj Nagar, WHC Road, Nagpur, Maharashtra – 440010',
  hours: 'Tuesday–Sunday, 10:00 AM – 7:00 PM',
  weeklyOff: 'Monday',
  socialHandle: '@goholidays.in',
  social: {
    instagram: 'https://www.instagram.com/goholidays.in',
    facebook: 'https://www.facebook.com/goholidays.in',
    x: 'https://x.com/goholidays_in',
    threads: 'https://www.threads.com/@goholidays.in',
  },
  mapEmbedUrl:
    'https://www.google.com/maps?q=Plot+No.+103,+Near+CIIMS+Hospital,+Bajaj+Nagar,+WHC+Road,+Nagpur,+Maharashtra+440010&output=embed',
} as const;

// Package Type Categories for tabs
export const PACKAGE_TYPES: { id: PackageType; name: string; icon: string }[] = [
  { id: 'trending', name: 'Trending Packages', icon: '🔥' },
  { id: 'domestic', name: 'Domestic Packages', icon: '🇮🇳' },
  { id: 'international', name: 'International Packages', icon: '🌍' },
  { id: 'group-departures', name: 'Fix Group Departures', icon: '👥' },
  { id: 'jungle-safaris', name: 'Jungle Safaris', icon: '🐅' },
  { id: 'cruise', name: 'Cruise', icon: '🚢' },
  { id: 'pilgrimage', name: 'Pilgrimage Packages', icon: '🙏' },
];

export const TOURS: Tour[] = [
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

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Anjali Sharma",
    role: "Mumbai, Maharashtra",
    text: "Go Holidays curated the most magical Rajasthan trip. The hotels were exquisite and the guides were incredibly knowledgeable.",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Robert Davidson",
    role: "Delhi, NCR",
    text: "As a photographer, I needed specific timing for shots. The team customized the entire Ladakh itinerary perfectly. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Priya Menon",
    role: "Bangalore, Karnataka",
    text: "Traveling alone in India can be daunting, but Go Holidays made me feel so safe and pampered throughout my Kerala trip.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  }
];