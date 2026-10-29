import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Heart } from 'lucide-react';
import { Tour } from '../types';
import { motion } from 'framer-motion';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-900/5 border border-stone-100 flex flex-col h-full transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-stone-200">
        <img 
          src={tour.image || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop'} 
          alt={tour.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop';
          }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-lime-400 px-3 py-1 text-xs font-bold tracking-wider text-black rounded-full uppercase shadow-lg">
          {tour.category}
        </div>

        {/* Wishlist Button (Decorative) */}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-sm text-white transition-colors">
          <Heart size={18} />
        </button>

        {/* Price Tag Overlay on Hover */}
        <div className="absolute bottom-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
           <span className="bg-lime-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg text-sm">
             ₹{tour.price.toLocaleString('en-IN')}
           </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow relative">
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-brand-900 transition-colors line-clamp-1">
            {tour.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-500 mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 bg-stone-50 px-2 sm:px-2.5 py-1 rounded-md">
            <Clock size={12} className="sm:w-3.5 sm:h-3.5 text-brand-700" />
            <span>{tour.days} Days</span>
          </div>
          <div className="flex items-center gap-1.5 bg-stone-50 px-2 sm:px-2.5 py-1 rounded-md flex-1 min-w-0">
            <MapPin size={12} className="sm:w-3.5 sm:h-3.5 text-brand-700 shrink-0" />
            <span className="truncate">{tour.location}</span>
          </div>
        </div>
        
        <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 mb-4 sm:mb-6 flex-grow leading-relaxed">
          {tour.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-stone-100 mt-auto gap-3">
          <div className="flex flex-col relative min-w-0">
            <span className="text-xs text-stone-400 uppercase tracking-wide">From</span>
            <span className="text-base sm:text-lg font-bold text-stone-900">₹{tour.price.toLocaleString('en-IN')}</span>
          </div>
          
          <Link 
            to={`/tours/${tour.id}`}
            className="flex items-center justify-center gap-1.5 sm:gap-2 bg-brand-900 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm group-hover:bg-lime-400 group-hover:text-black transition-colors duration-300 shadow-md whitespace-nowrap shrink-0"
          >
            View Details
            <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;