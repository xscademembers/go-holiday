import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Target, Heart, Users } from 'lucide-react';
import { SITE_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 md:pt-32 min-h-screen bg-white pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-400 text-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
          >
            <MapPin size={24} className="sm:w-8 sm:h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-4 sm:mb-6"
          >
            We Are Go Holidays
          </motion.h1>
          <p className="text-sm sm:text-base text-black tracking-[0.2em] uppercase font-bold px-2">
            {SITE_INFO.tagline}
          </p>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed font-light px-2 mt-4 italic">
            {SITE_INFO.brandLine}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-16 sm:mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop" 
              alt="Travel Adventure" 
              className="rounded-2xl sm:rounded-3xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-32 h-32 sm:w-48 sm:h-48 bg-lime-400/30 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-32 h-32 sm:w-48 sm:h-48 bg-black/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">Our Story</h2>
              <div className="w-16 sm:w-20 h-1 bg-lime-400 mb-4 sm:mb-6"></div>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-4">
                Welcome to Go Holidays, your travel partner for exploring the incredible destinations of India. Based in Nagpur, Maharashtra, we focus on domestic tour packages designed to make every journey comfortable, convenient and memorable.
              </p>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                Whether you are planning a relaxing family vacation, a romantic honeymoon, an adventurous getaway, a spiritual pilgrimage or a group trip, we help you explore travel options based on your interests, travel dates and budget. From destination selection and hotel accommodation to sightseeing and local transportation arrangements, our goal is to make travel planning simple and hassle-free.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-20 shadow-xl shadow-stone-200/50 border border-stone-100">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">The Go Holidays Promise</h2>
            <p className="text-stone-500 mt-3 text-sm sm:text-base">{SITE_INFO.supportingLine}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            <ValueCard 
              icon={<Users size={28} className="sm:w-8 sm:h-8" />}
              title="Our Mission"
              desc="To make travel planning convenient and enjoyable through personalized holiday experiences."
            />
            <ValueCard 
              icon={<Target size={28} className="sm:w-8 sm:h-8" />}
              title="Our Vision"
              desc="To become a preferred travel partner for domestic holidays across India."
            />
            <ValueCard 
              icon={<Heart size={28} className="sm:w-8 sm:h-8" />}
              title="Our Promise"
              desc="Personalized planning, flexible travel options and memorable holiday experiences."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="text-center group">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-lime-50 text-brand-900 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-lime-400 group-hover:text-black transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-lime-400/40 transform group-hover:-translate-y-2">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2 sm:mb-3">{title}</h3>
    <p className="text-stone-600 leading-relaxed text-sm sm:text-base">{desc}</p>
  </div>
);

export default About;
