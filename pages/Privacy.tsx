import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 md:pt-32 min-h-screen bg-white pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-50 text-brand-900 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-lime-200"
          >
            <Shield size={24} className="sm:w-8 sm:h-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 sm:mb-6"
          >
            Privacy Policy
          </motion.h1>
          <p className="text-stone-600 text-sm sm:text-base">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-stone-100 space-y-6 sm:space-y-8">

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">1. Information We Collect</h2>
              <p className="text-stone-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                At Go Holidays, we collect information that you provide directly to us when using our services:
              </p>
              <ul className="list-disc list-inside text-stone-600 space-y-2 ml-4 text-sm sm:text-base">
                <li>Personal identification information (Name, email address, phone number)</li>
                <li>Travel preferences and requirements</li>
                <li>Payment and billing information</li>
                <li>Communication history with our team</li>
                <li>Feedback and survey responses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">2. How We Use Your Information</h2>
              <p className="text-stone-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-stone-600 space-y-2 ml-4 text-sm sm:text-base">
                <li>Process and manage your travel bookings</li>
                <li>Communicate with you about your trips and inquiries</li>
                <li>Provide customer support and respond to your requests</li>
                <li>Send you promotional offers and updates (with your consent)</li>
                <li>Improve our services and website experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">3. Information Sharing</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted partners such as hotels, airlines, and tour operators solely for the purpose of fulfilling your travel bookings. All our partners are required to maintain the confidentiality of your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">4. Data Security</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">5. Your Rights</h2>
              <p className="text-stone-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-stone-600 space-y-2 ml-4 text-sm sm:text-base">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">6. Cookies</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us understand how you use our website. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">7. Changes to This Policy</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">8. Contact Us</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 sm:p-6 bg-lime-50 rounded-xl sm:rounded-2xl border border-lime-100">
                <p className="text-stone-700 font-medium text-sm sm:text-base">Go Holidays (Tours & Travel)</p>
                <p className="text-stone-600 text-sm sm:text-base">Plot No. 103, Near CIIMS Hospital, Bajaj Nagar, WHC Road, Nagpur, Maharashtra – 440010</p>
                <p className="text-stone-600 text-sm sm:text-base">Email: info@goholidays.org</p>
                <p className="text-stone-600 text-sm sm:text-base">Phone / WhatsApp: +91 91683 00111</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

