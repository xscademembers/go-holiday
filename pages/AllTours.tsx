import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import TourCard from '../components/TourCard';
import { PACKAGE_TYPES } from '../constants';
import { PackageType } from '../types';

const AllTours: React.FC = () => {
  const { tours, toursLoading } = useData();
  const location = useLocation();
  
  // Get tab from URL hash or default to first tab (trending)
  const getInitialTab = (): PackageType => {
    const hash = location.hash.replace('#', '') as PackageType;
    const validTab = PACKAGE_TYPES.find(p => p.id === hash);
    return validTab ? hash : 'trending';
  };

  const [activeTab, setActiveTab] = useState<PackageType>(getInitialTab);

  // Update tab when URL hash changes
  useEffect(() => {
    const hash = location.hash.replace('#', '') as PackageType;
    const validTab = PACKAGE_TYPES.find(p => p.id === hash);
    if (validTab) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  // Filter tours by active tab - handle missing packageType by defaulting to 'domestic'
  const filteredTours = tours.filter(tour => {
    const tourPackageType = tour.packageType || 'domestic'; // Default to domestic if missing
    return tourPackageType === activeTab;
  });

  // Get active tab info
  const activeTabInfo = PACKAGE_TYPES.find(p => p.id === activeTab);


  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-white pb-16 sm:pb-20 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-3 sm:mb-4"
          >
            <span className="text-brand-800 font-bold uppercase tracking-widest text-xs sm:text-sm bg-lime-50 px-3 sm:px-4 py-2 rounded-full border border-lime-200">
              Explore Our Packages
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-3 sm:mb-4"
          >
            Our Curated Journeys
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 text-base sm:text-lg leading-relaxed px-2"
          >
            Whether you seek spiritual peace, adrenaline-pumping adventure, or royal luxury, we have a package designed just for you.
          </motion.p>
        </div>

        {/* Tabs Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 sm:mb-10"
        >
          {/* Desktop Tabs */}
          <div className="hidden md:flex justify-center gap-2 flex-wrap">
            {PACKAGE_TYPES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setActiveTab(pkg.id)}
                className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === pkg.id
                    ? 'bg-brand-900 text-lime-400 shadow-lg shadow-brand-900/30 scale-105'
                    : 'bg-white text-stone-700 hover:bg-lime-50 hover:text-brand-900 border border-stone-200'
                }`}
              >
                <span className="text-lg">{pkg.icon}</span>
                {pkg.name}
              </button>
            ))}
          </div>

          {/* Mobile Tabs - Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {PACKAGE_TYPES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setActiveTab(pkg.id)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium text-xs transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === pkg.id
                      ? 'bg-brand-900 text-lime-400 shadow-lg shadow-brand-900/30'
                      : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  <span>{pkg.icon}</span>
                  {pkg.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Tab Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-900 flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl">{activeTabInfo?.icon}</span>
            {activeTabInfo?.name}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-lime-400 mx-auto mt-2 sm:mt-3 rounded-full"></div>
        </div>

        {/* Tours Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {toursLoading ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
                <p className="text-stone-500">Loading tours...</p>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-100">
                <div className="text-6xl mb-4">{activeTabInfo?.icon}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">No Tours Available Yet</h3>
                <p className="text-stone-500">We're working on adding amazing {activeTabInfo?.name.toLowerCase()}. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TourCard tour={tour} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllTours;
