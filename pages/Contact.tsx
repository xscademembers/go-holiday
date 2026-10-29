import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SITE_INFO } from '../constants';

const Contact: React.FC = () => {
  const { addInquiry } = useData();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', tripLocation: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send to Context
    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      tripLocation: formData.tripLocation,
      message: formData.message
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', tripLocation: '', message: '' });
    }, 3000);
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 min-h-screen bg-white pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-brand-700 font-bold uppercase tracking-wider text-xs sm:text-sm mb-2 block">
            <span className="inline-block w-2 h-2 rounded-full bg-lime-400 mr-2 align-middle"></span>
            Plan Your Next Holiday
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">Start Your Journey</h1>
          <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">Ready to explore India? Tell us where you want to go, when you want to travel and your preferred budget — we'll help you find the right domestic package.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-6xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-stone-100">
          
          <div className="bg-brand-900 p-8 sm:p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-lime-400 rounded-full translate-x-1/3 -translate-y-1/3 blur-[100px] opacity-25"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-lime-400 rounded-full -translate-x-1/3 translate-y-1/3 blur-[80px] opacity-15"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-8 sm:mb-10">Contact Information</h2>
              <div className="space-y-8 sm:space-y-10">
                <ContactInfoItem 
                  icon={<Phone size={20} className="sm:w-6 sm:h-6" />}
                  label="Mobile & WhatsApp"
                  lines={[SITE_INFO.phoneDisplay]}
                />
                <ContactInfoItem 
                  icon={<Mail size={20} className="sm:w-6 sm:h-6" />}
                  label="Email Us"
                  lines={[SITE_INFO.email, SITE_INFO.emailAlt]}
                />
                <ContactInfoItem 
                  icon={<MapPin size={20} className="sm:w-6 sm:h-6" />}
                  label="Visit Us"
                  lines={[...SITE_INFO.addressLines]}
                />
                <ContactInfoItem 
                  icon={<Clock size={20} className="sm:w-6 sm:h-6" />}
                  label="Business Hours"
                  lines={[SITE_INFO.hours, `Weekly off: ${SITE_INFO.weeklyOff}`]}
                />
              </div>
            </div>

            <div className="mt-12 sm:mt-16 relative z-10">
              <a
                href={SITE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-lime-400 text-black font-bold px-5 py-3 rounded-full hover:bg-white transition-colors text-sm lime-glow"
              >
                Plan Your Holiday on WhatsApp
              </a>
            </div>
          </div>

          <div className="p-8 sm:p-12 lg:p-16 bg-white">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-6 sm:mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-100 outline-none transition-all text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-100 outline-none transition-all text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-100 outline-none transition-all text-sm sm:text-base"
                    placeholder={SITE_INFO.phoneDisplay}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Planned Trip Location</label>
                  <input 
                    type="text" 
                    required
                    value={formData.tripLocation}
                    onChange={(e) => setFormData({...formData, tripLocation: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-100 outline-none transition-all text-sm sm:text-base"
                    placeholder="e.g. Rajasthan, Kerala, Himalayas"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-100 outline-none transition-all resize-none text-sm sm:text-base"
                  placeholder="Tell us about your dream trip..."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={submitted}
                className={`w-full font-bold py-3 sm:py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base ${
                  submitted 
                    ? 'bg-green-600 text-white shadow-green-600/30' 
                    : 'bg-brand-900 text-white hover:bg-lime-400 hover:text-black'
                }`}
              >
                {submitted ? (
                  <>Message Sent <Check size={18} /></>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 max-w-6xl mx-auto"
        >
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-brand-700 font-bold uppercase tracking-wider text-xs sm:text-sm mb-2 block">
              <span className="inline-block w-2 h-2 rounded-full bg-lime-400 mr-2 align-middle"></span>
              Find Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Our Location</h2>
          </div>
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-stone-100">
            <iframe 
              src={SITE_INFO.mapEmbedUrl}
              width="100%" 
              height="400"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Go Holidays Location — Bajaj Nagar, Nagpur"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ContactInfoItem = ({ icon, label, lines }: { icon: React.ReactNode, label: string, lines: string[] }) => (
  <div className="flex items-start gap-4 sm:gap-5">
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-lime-400 border border-white/5">
      {icon}
    </div>
    <div>
      <p className="text-stone-400 text-xs sm:text-sm mb-1 uppercase tracking-wide font-medium">{label}</p>
      {lines.map((line, i) => (
        <p key={i} className="font-medium text-sm sm:text-base md:text-lg break-words">{line}</p>
      ))}
    </div>
  </div>
);

export default Contact;