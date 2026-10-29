import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Star, Phone, Shield, CheckCircle, X } from 'lucide-react';
import { useData } from '../context/DataContext';

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tours } = useData();
  const tour = tours.find(t => t.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tour) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-stone-600 bg-white">
        <h2 className="text-3xl font-serif font-bold mb-4">Tour Not Found</h2>
        <Link to="/tours" className="px-6 py-3 bg-lime-400 text-black rounded-full hover:bg-brand-900 hover:text-lime-400 transition-colors">
          Back to All Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img
          src={tour.image || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop'}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-stone-900/20" />

        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-16 pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto">
            <Link to="/tours" className="inline-flex items-center text-white/90 hover:text-white mb-4 sm:mb-8 transition-colors bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-white/10">
              <ArrowLeft size={14} className="sm:w-4 sm:h-4 mr-2" /> Back to Tours
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className="bg-lime-400 text-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide uppercase shadow-lg">
                  {tour.category}
                </span>
                {tour.featured && (
                  <span className="bg-brand-900 text-lime-400 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide uppercase shadow-lg">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-xl">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-white/90">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg border border-white/10">
                  <Calendar size={18} className="sm:w-5 sm:h-5 text-lime-400" />
                  <span className="font-medium text-xs sm:text-sm md:text-base">{tour.days} Days / {tour.days - 1} Nights</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg border border-white/10">
                  <MapPin size={18} className="sm:w-5 sm:h-5 text-lime-400" />
                  <span className="font-medium text-xs sm:text-sm md:text-base">{tour.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-white relative z-10 -mt-6 sm:-mt-10 rounded-t-2xl sm:rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16">

              {/* Overview */}
              <section>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <span className="w-1.5 h-6 sm:h-8 bg-lime-400 rounded-full"></span>
                  The Experience
                </h2>
                <div className="text-stone-600 leading-relaxed text-base sm:text-lg bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-100 shadow-sm">
                  {tour.description}
                </div>
              </section>

              {/* Highlights */}
              {tour.highlights && tour.highlights.length > 0 && (
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                    <span className="w-1.5 h-6 sm:h-8 bg-lime-400 rounded-full"></span>
                    Trip Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {tour.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-start gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-stone-100 hover:border-brand-200 transition-colors"
                      >
                        <div className="bg-lime-50 p-2 rounded-full text-brand-900 shrink-0">
                          <Star size={18} className="sm:w-5 sm:h-5 fill-current" />
                        </div>
                        <span className="text-stone-800 font-medium text-base sm:text-lg">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Itinerary */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-8 sm:mb-10 flex items-center gap-2 sm:gap-3">
                    <span className="w-1.5 h-6 sm:h-8 bg-lime-400 rounded-full"></span>
                    Detailed Itinerary
                  </h2>
                  <div className="space-y-0 relative border-l-2 border-stone-200 ml-3 sm:ml-4 md:ml-6">
                    {tour.itinerary.map((day, index) => (
                      <motion.div
                        key={day.day || index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative pl-10 sm:pl-12 pb-10 sm:pb-12 last:pb-0 group"
                      >
                        <div className="absolute -left-[15px] sm:-left-[19px] md:-left-[21px] top-0 w-8 h-8 sm:w-10 sm:h-10 bg-white border-4 border-stone-200 text-stone-400 rounded-full flex items-center justify-center font-bold shadow-sm group-hover:bg-lime-400 group-hover:text-black group-hover:border-lime-200 transition-all duration-300 z-10 text-xs sm:text-sm">
                          Day {day.day}
                        </div>
                        <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                          <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2 sm:mb-3">{day.title}</h3>
                          <p className="text-stone-600 leading-relaxed text-sm sm:text-base">{day.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar - Sticky */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-24 sm:top-28 space-y-6 sm:space-y-8">

                {/* Booking Card */}
                <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-lime-50 rounded-bl-full -mr-6 -mt-6 sm:-mr-8 sm:-mt-8 z-0"></div>

                  <div className="relative z-10">
                    <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-stone-100">
                      <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">Starting From</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-bold text-stone-900">₹{tour.price.toLocaleString('en-IN')}</span>
                        <span className="text-stone-500 font-medium text-sm sm:text-base">/ person</span>
                      </div>
                    </div>

                    {/* Inclusions */}
                    {tour.inclusions && tour.inclusions.length > 0 && (
                      <div className="mb-6 sm:mb-8">
                        <div className="space-y-3">
                          {tour.inclusions.map((inclusion, index) => (
                            <div key={index} className="flex items-start gap-3 text-stone-700">
                              <CheckCircle size={16} className="text-green-600 mt-1 shrink-0" />
                              <span className="text-sm sm:text-base leading-relaxed">{inclusion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Exclusions */}
                    {tour.exclusions && tour.exclusions.length > 0 && (
                      <div className="mb-6 sm:mb-8">
                        <div className="space-y-3">
                          {tour.exclusions.map((exclusion, index) => (
                            <div key={index} className="flex items-start gap-3 text-stone-700">
                              <X size={16} className="text-red-500 mt-1 shrink-0" />
                              <span className="text-sm sm:text-base leading-relaxed">{exclusion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link to="/contact" className="block w-full text-center bg-lime-400 text-black py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-brand-900 hover:text-lime-400 transition-colors lime-glow mb-3">
                      Request Quote
                    </Link>
                    <p className="text-center text-xs text-stone-400 font-medium">100% Customizable • No Payment Now</p>
                  </div>
                </div>

                {/* Assurance Card */}
                <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-200 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm text-brand-900">
                    <Shield size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="font-bold text-stone-900 mb-2 text-sm sm:text-base">Book with Confidence</h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">24/7 On-trip Support • Best Price Guarantee • Flexible Cancellations</p>
                </div>

                {/* Contact Card */}
                <div className="bg-stone-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-lime-400/10"></div>
                  <div className="relative z-10">
                    <h3 className="font-serif font-bold text-lg sm:text-xl mb-2">Have Questions?</h3>
                    <p className="text-stone-400 text-xs sm:text-sm mb-4 sm:mb-6">Our travel experts are here to customize your trip.</p>
                    <div className="space-y-3">
                      <a href="tel:+919168300111" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full transition-colors border border-white/10 w-full text-sm sm:text-base">
                        <Phone size={16} className="sm:w-[18px] sm:h-[18px]" /> +91 91683 00111
                      </a>
                      <a href="https://wa.me/919168300111" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-lime-400 hover:bg-white text-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full transition-colors w-full text-sm sm:text-base">
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;