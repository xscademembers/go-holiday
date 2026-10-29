import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Heart, Globe, Star, Users, Map, X, MapPin, Calendar, Flame } from 'lucide-react';
import { TESTIMONIALS, SITE_INFO } from '../constants';
import { useData } from '../context/DataContext';
import TourCard from '../components/TourCard';

const Home: React.FC = () => {
  const { tours, siteSettings } = useData();
  const featuredTours = tours.filter(t => t.featured);

  // Trending Popup State
  const [showPopup, setShowPopup] = useState(false);
  const popupTour = tours.find(t => t.showInPopup);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('trendingPopupShown');

    if (!popupShown && popupTour) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [popupTour]);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('trendingPopupShown', 'true');
  };

  return (
    <div className="w-full overflow-hidden bg-white">

      {/* Trending Tour Popup */}
      <AnimatePresence>
        {showPopup && popupTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white shadow-lg transition-all"
              >
                <X size={20} />
              </button>

              {/* Trending Badge */}
              <div className="absolute top-4 left-4 z-20">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="bg-lime-400 text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <Flame size={16} className="animate-pulse" />
                  TRENDING NOW
                </motion.div>
              </div>

              {/* Tour Image */}
              <div className="relative h-56 overflow-hidden bg-stone-200">
                <img
                  src={popupTour.image || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop'}
                  alt={popupTour.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                  <span className="text-stone-500 text-xs">Starting from</span>
                  <div className="text-2xl font-bold text-brand-900">₹{popupTour.price.toLocaleString()}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-stone-500 text-sm mb-2">
                  <MapPin size={14} />
                  <span>{popupTour.location}</span>
                  <span className="text-stone-300">•</span>
                  <Calendar size={14} />
                  <span>{popupTour.days} Days</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">
                  {popupTour.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {popupTour.description}
                </p>

                {/* Highlights */}
                {popupTour.highlights && popupTour.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {popupTour.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-lime-50 text-brand-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <Link
                    to={`/tours/${popupTour.id}`}
                    onClick={closePopup}
                    className="flex-1 bg-lime-400 text-black py-3 rounded-xl font-bold text-center hover:bg-brand-900 hover:text-lime-400 transition-all lime-glow flex items-center justify-center gap-2"
                  >
                    View Details <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/contact"
                    onClick={closePopup}
                    className="px-6 py-3 border-2 border-stone-200 text-stone-700 rounded-xl font-bold hover:bg-stone-50 transition-colors"
                  >
                    Enquire
                  </Link>
                </div>

                {/* Urgency Text */}
                <p className="text-center text-black text-xs font-bold mt-4 flex items-center justify-center gap-1">
                  <Flame size={12} />
                  Limited slots available! Book now to secure your spot.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[600px] md:min-h-[700px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={siteSettings.heroBackgroundImage}
            alt="India Gate Delhi"
            className="w-full h-full object-cover"
          />
          {/* Enhanced Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/60" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto text-white mt-0 md:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 sm:mb-6 flex justify-center"
          >
            <span className="bg-black/40 backdrop-blur-md border border-lime-400/40 text-lime-400 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase shadow-lg">
              {SITE_INFO.tagline}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-lime-400 font-script text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 drop-shadow-md"
          >
            Go Holidays
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl px-2"
          >
            Discover India.<br className="hidden sm:block" />
            <span className="text-lime-400"> Experience More.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-sm sm:text-base text-white/90 mb-3 italic drop-shadow-md"
          >
            {SITE_INFO.brandLine}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-stone-100 mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md opacity-90 px-2"
          >
            {SITE_INFO.heroSubheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <Link
              to="/tours"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-lime-400 text-black rounded-full font-bold text-base sm:text-lg hover:bg-white transition-all hover:scale-105 lime-glow flex items-center justify-center gap-2"
            >
              Explore Tour Packages <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </Link>
            <Link
              to="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/40 text-white rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-brand-900 transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              Customize Your Trip
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <section className="relative z-20 container mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 md:-mt-20 mb-12 sm:mb-16 md:mb-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-stone-900/10 p-6 sm:p-8 md:p-12 border border-stone-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-y-8 gap-x-4">
            <StatItem number="10k+" label="Happy Travelers" icon={<Users className="text-brand-900" />} />
            <StatItem number="500+" label="Destinations" icon={<Map className="text-brand-900" />} />
            <StatItem number="15+" label="Years Experience" icon={<ShieldCheck className="text-brand-900" />} />
            <StatItem number="4.9" label="Average Rating" icon={<Star className="text-brand-900" />} />
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div className="max-w-2xl">
              <span className="text-brand-700 font-bold tracking-wider uppercase text-xs sm:text-sm mb-2 block">
                <span className="inline-block w-2 h-2 rounded-full bg-lime-400 mr-2 align-middle"></span>
                Premium Collections
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                Curated Experiences
              </h2>
            </div>
            <Link to="/tours" className="group flex items-center gap-2 text-stone-900 font-bold border-b-2 border-lime-400 pb-1 hover:text-brand-900 hover:border-brand-900 transition-all text-sm sm:text-base">
              View All Tours <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredTours.map((tour, idx) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-16 sm:py-20 md:py-24 bg-brand-900 text-white relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-400/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-lime-400 font-bold tracking-wider uppercase text-xs sm:text-sm mb-4 block">Why Choose Go Holidays?</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 sm:mb-8 leading-tight">
                Your Journey, Our Planning, <br className="hidden sm:block" /> Memories Forever.
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <FeatureRow
                  title="Personalized Travel Planning"
                  desc="Options tailored to your preferences, travel dates and budget — family trips, honeymoons, adventures and more."
                  icon={<Heart className="w-5 h-5 sm:w-6 sm:h-6 text-black" />}
                />
                <FeatureRow
                  title="Flexible Package Options"
                  desc="Different destinations, trip durations and accommodation categories across India."
                  icon={<Globe className="w-5 h-5 sm:w-6 sm:h-6 text-black" />}
                />
                <FeatureRow
                  title="Nagpur-Based Support"
                  desc="Connect with our local team for transparent quotations, itinerary help and booking assistance."
                  icon={<ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-black" />}
                />
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop" className="rounded-xl sm:rounded-2xl translate-y-4 sm:translate-y-8 shadow-2xl border border-white/10" alt="Humayun's Tomb Delhi" />
                <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop" className="rounded-xl sm:rounded-2xl shadow-2xl border border-white/10" alt="Jaipur Palace" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-24 bg-lime-50/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-brand-700 font-bold tracking-wider uppercase text-xs sm:text-sm mb-2 block">
              <span className="inline-block w-2 h-2 rounded-full bg-lime-400 mr-2 align-middle"></span>
              Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">Traveler Diaries</h2>
            <p className="text-stone-600 text-sm sm:text-base">Stories from those who have experienced the magic with us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 relative group hover:border-lime-200">
                <div className="text-lime-100 absolute top-4 sm:top-6 right-6 sm:right-8 text-5xl sm:text-7xl font-serif leading-none group-hover:text-lime-200 transition-colors">"</div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-4 border-lime-50 group-hover:border-lime-200 transition-colors shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=200&auto=format&fit=crop';
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base">{t.name}</h4>
                    <p className="text-xs text-brand-600 font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
                <p className="text-stone-600 italic relative z-10 leading-relaxed text-sm sm:text-base">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-24 container mx-auto px-4 sm:px-6">
        <div className="bg-brand-900 rounded-2xl sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-lime-400/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-lime-400/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6">Ready for your next adventure?</h2>
            <p className="text-lime-400 text-base sm:text-lg mb-8 sm:mb-10">Let Go Holidays help you plan the perfect itinerary that suits your style and budget.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/contact" className="bg-lime-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white transition-colors lime-glow">
                Start Planning
              </Link>
              <Link to="/tours" className="bg-transparent border border-white/40 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:border-lime-400 hover:text-lime-400 transition-colors">
                Browse Tours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ number, label, icon }: { number: string, label: string, icon: React.ReactNode }) => (
  <div className="text-center group">
    <div className="flex justify-center mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform bg-lime-400 w-12 h-12 sm:w-16 sm:h-16 rounded-full items-center mx-auto shadow-sm">
      {icon}
    </div>
    <div className="text-2xl sm:text-3xl font-bold text-stone-900 mb-1">{number}</div>
    <div className="text-xs text-stone-500 font-bold uppercase tracking-wide">{label}</div>
  </div>
);

const FeatureRow = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
  <div className="flex gap-4 sm:gap-5">
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-lime-400 flex items-center justify-center shrink-0 shadow-lg shadow-lime-400/30 text-black">
      {icon}
    </div>
    <div>
      <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
      <p className="text-stone-300 leading-relaxed text-xs sm:text-sm">{desc}</p>
    </div>
  </div>
);

export default Home;