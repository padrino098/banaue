
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import BookingAssistant from './components/BookingAssistant';
import RoomGalleryModal from './components/RoomGalleryModal';
import { ROOMS, FEATURES } from './constants';
import { Room } from './types';

const App: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'Booking Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleOpenGallery = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleCloseGallery = () => {
    setSelectedRoom(null);
  };

  const handleProceedToBooking = () => {
    setSelectedRoom(null);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const serviceId = 'service_iecqc98';
      const templateId = 'template_bx4gz5m';
      const publicKey = 'nbnsYFYxWm2Nu0PIn';

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.fullName,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'jassalkeneth24@gmail.com'
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ fullName: '', email: '', subject: 'Booking Inquiry', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">
      <Navbar />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32 pt-0">
        {/* Welcome Section */}
        <section id="about" className="text-center max-w-4xl mx-auto pt-20">
          <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            A Cordillera Treasure
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-8">Welcome to Paradise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-700 to-lime-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed italic">
            "Nestled in the heart of the magnificent Banaue Rice Terraces, our transient house offers a perfect blend of comfort and authentic Ifugao hospitality. Wake up to breathtaking views of the 2,000-year-old terraces and immerse yourself in the rich culture of the Cordillera region."
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Founded', val: '2012' },
              { label: 'Rating', val: '4.8/5' },
              { label: 'Rooms', val: '12' },
              { label: 'Elevation', val: '1500m' }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                <div className="text-2xl font-bold text-green-800">{stat.val}</div>
                <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Rooms & Spaces Section */}
        <section id="rooms">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-900 mb-4">Our Rooms & Shared Spaces</h2>
            <p className="text-stone-500 max-w-xl mx-auto">From cozy private lofts to shared community hubs, explore every corner of your home in the mountains.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                onView={handleOpenGallery}
              />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-green-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-24 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-terrace-pattern"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us</h2>
              <div className="w-16 h-1 bg-lime-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition-all duration-300">
                  <span className="text-4xl block mb-6">{feature.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-green-100/80 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-stone-900 to-stone-800 p-12 md:p-20 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready for an Unforgettable Experience?</h2>
            <p className="text-stone-300 text-lg mb-12 max-w-2xl mx-auto">Book your stay now and discover the magic of the Cordillera mountains with us.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="px-10 py-4 bg-lime-500 text-stone-900 font-bold rounded-full hover:bg-lime-400 transition-colors shadow-lg shadow-lime-500/20 uppercase tracking-widest text-sm">
                Reserve Now
              </a>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors uppercase tracking-widest text-sm">
                Back to Top
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold text-green-900 mb-8">Get in Touch</h2>
            <p className="text-stone-600 mb-12">
              We're open year-round to welcome travelers seeking adventure and tranquility. For reservations and inquiries, feel free to contact us via phone or email.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 flex-shrink-0">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">Our Location</h4>
                  <p className="text-stone-500">Poblacion, Banaue, Ifugao, Philippines</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 flex-shrink-0">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">Phone Number</h4>
                  <p className="text-stone-500">+63 967 406 8316</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 flex-shrink-0">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">Email Address</h4>
                  <p className="text-stone-500">jassalkeneth24@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 flex-shrink-0">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">Timing</h4>
                  <p className="text-stone-500">Check-in: 2PM | Check-out: 12NN</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
            <h3 className="text-2xl font-bold text-green-900 mb-8">Send a Message</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-xl flex items-center">
                <i className="fa-solid fa-check-circle mr-3 text-xl"></i>
                <div>
                  <p className="font-bold">Message Sent Successfully!</p>
                  <p className="text-sm">We'll get back to you soon.</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-xl flex items-center">
                <i className="fa-solid fa-exclamation-circle mr-3 text-xl"></i>
                <div>
                  <p className="font-bold">Failed to Send Message</p>
                  <p className="text-sm">Please try again or contact us directly at jassalkeneth24@gmail.com</p>
                </div>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none"
                >
                  <option>Booking Inquiry</option>
                  <option>General Question</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Your Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4} 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                  placeholder="Tell us about your trip plans..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-green-800 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-900/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    Sending...
                  </>
                ) : (
                  'Submit Reservation Request'
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-500 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-white">
                <span className="text-3xl">🏡</span>
                <span className="text-xl font-bold tracking-widest uppercase">Banaue Transient</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                A sustainable and heritage-focused accommodation in the heart of Ifugao, dedicated to providing authentic Cordillera experiences.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'twitter', 'whatsapp'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-700 hover:text-white transition-all">
                    <i className={`fa-brands fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#rooms" className="hover:text-white transition-colors">Accommodations</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Amenities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Newsletter</h4>
              <p className="text-sm">Get travel tips and exclusive seasonal offers.</p>
              <div className="flex">
                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-l-xl px-4 py-2 w-full focus:ring-1 focus:ring-green-500 outline-none" />
                <button className="bg-green-700 text-white px-4 py-2 rounded-r-xl hover:bg-green-600 transition-colors">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-10 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} Banaue Rice Terraces Transient House. Crafted with Ifugao Pride.</p>
            <p className="mt-2 text-stone-600">Experience the wonder. Embrace the culture. Create memories.</p>
          </div>
        </div>
      </footer>

      <BookingAssistant />
      
      {/* Room Details & Gallery Modal */}
      <RoomGalleryModal 
        room={selectedRoom} 
        onClose={handleCloseGallery}
        onBook={handleProceedToBooking}
      />
    </div>
  );
};

export default App;
