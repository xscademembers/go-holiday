import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Terms: React.FC = () => {
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
            <FileText size={24} className="sm:w-8 sm:h-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 sm:mb-6"
          >
            Terms & Conditions
          </motion.h1>
          <p className="text-stone-600 text-sm sm:text-base">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-stone-100 space-y-6 sm:space-y-8">

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">1. Acceptance of Terms</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                By accessing and using the services of Go Holidays (Tours & Travel), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">2. Booking and Reservations</h2>
              <ul className="list-disc list-inside text-stone-600 space-y-2 ml-4 text-sm sm:text-base">
                <li>All bookings are subject to availability and confirmation</li>
                <li>A booking is confirmed only upon receipt of the required deposit or full payment</li>
                <li>Prices are subject to change without prior notice until booking is confirmed</li>
                <li>All rates are quoted in Indian Rupees (INR) unless otherwise specified</li>
                <li>Additional charges may apply for peak season, festivals, and special events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">3. Payment Terms</h2>
              <ul className="list-disc list-inside text-stone-600 space-y-2 ml-4 text-sm sm:text-base">
                <li>A minimum deposit of 30% is required at the time of booking</li>
                <li>Full payment must be received 15 days prior to the travel date</li>
                <li>Payments can be made via bank transfer, credit/debit cards, or UPI</li>
                <li>All payments are non-refundable unless otherwise stated in the cancellation policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">4. Cancellation Policy</h2>
              <div className="bg-stone-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                <ul className="text-stone-600 space-y-3 text-sm sm:text-base">
                  <li className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-stone-200 pb-2">
                    <span>30+ days before departure:</span>
                    <span className="font-medium">20% cancellation fee</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-stone-200 pb-2">
                    <span>15-29 days before departure:</span>
                    <span className="font-medium">50% cancellation fee</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-stone-200 pb-2">
                    <span>7-14 days before departure:</span>
                    <span className="font-medium">75% cancellation fee</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <span>Less than 7 days:</span>
                    <span className="font-medium">No refund</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">5. Travel Documents</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Travelers are responsible for obtaining valid passports, visas, and any other travel documents required for their journey. Go Holidays is not liable for any issues arising from incomplete or invalid travel documents.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">6. Travel Insurance</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We strongly recommend that all travelers obtain comprehensive travel insurance covering trip cancellation, medical emergencies, baggage loss, and other unforeseen circumstances. Go Holidays can assist in arranging travel insurance upon request.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">7. Liability Limitations</h2>
              <p className="text-stone-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                Go Holidays acts as an intermediary between travelers and service providers. We are not liable for:
              </p>
              <ul className="list-disc list-inside text-stone-600 space-y-2 ml-4 text-sm sm:text-base">
                <li>Acts of God, natural disasters, or force majeure events</li>
                <li>Delays or cancellations by airlines, hotels, or other service providers</li>
                <li>Personal injury, illness, or loss of property during travel</li>
                <li>Changes in government regulations or travel advisories</li>
                <li>Any circumstances beyond our reasonable control</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">8. Itinerary Changes</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                We reserve the right to modify itineraries due to weather conditions, safety concerns, or operational requirements. Alternative arrangements of similar value will be provided when possible. No refunds will be given for minor changes that do not significantly affect the tour experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">9. Traveler Conduct</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Travelers are expected to conduct themselves in a respectful manner. We reserve the right to terminate services without refund if a traveler's behavior is deemed disruptive, dangerous, or offensive to others.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">10. Governing Law</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Nagpur, Maharashtra.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 sm:mb-4">11. Contact Information</h2>
              <p className="text-stone-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                For any questions regarding these Terms and Conditions, please contact us:
              </p>
              <div className="p-4 sm:p-6 bg-lime-50 rounded-xl sm:rounded-2xl border border-lime-100">
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

export default Terms;

