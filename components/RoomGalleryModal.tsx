
import React, { useState, useEffect } from 'react';
import { Room } from '../types';

interface RoomGalleryModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: () => void;
}

const RoomGalleryModal: React.FC<RoomGalleryModalProps> = ({ room, onClose, onBook }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    if (room) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [room]);

  if (!room) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-stone-900/80 backdrop-blur-sm transition-all duration-300 animate-fade-in">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-scale-up">
        {/* Gallery Section */}
        <div className="lg:w-2/3 bg-stone-100 relative h-64 sm:h-96 lg:h-full">
          <img 
            src={room.images[activeImageIndex]} 
            alt={`${room.title} view ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
          
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 lg:hidden w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center px-4 space-x-2">
            {room.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  activeImageIndex === idx ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt="Side view thumbnail" />
              </button>
            ))}
          </div>

          <div className="absolute top-6 right-6 px-4 py-2 bg-black/40 backdrop-blur text-white text-xs font-bold rounded-full uppercase tracking-tighter">
             View {activeImageIndex + 1} of {room.images.length}
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:w-1/3 p-8 lg:p-12 overflow-y-auto flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-4xl mb-4 block">{room.icon}</span>
              <h2 className="text-3xl font-bold text-green-900 leading-tight">{room.title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="hidden lg:flex w-10 h-10 bg-stone-100 text-stone-400 rounded-full items-center justify-center hover:bg-stone-200 hover:text-stone-600 transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="mb-8">
             <div className="text-green-700 font-bold text-xl mb-4">
                {room.price > 0 ? `₱${room.price.toLocaleString()} / night` : 'Included in Stay'}
             </div>
             <p className="text-stone-600 leading-relaxed italic text-sm">
                "{room.description}"
             </p>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Amenities & Features</h4>
            <div className="grid grid-cols-1 gap-3">
              {room.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <i className="fa-solid fa-check text-green-500 mr-3"></i>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-8">
            <button 
              onClick={onBook}
              className="w-full py-4 bg-green-800 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/10 uppercase tracking-widest"
            >
              {room.price > 0 ? 'Book This Room Now' : 'Check Availability'}
            </button>
            <p className="text-center text-[10px] text-stone-400 mt-4 font-medium uppercase tracking-tighter">
              * Reservations are subject to availability and weather conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomGalleryModal;
