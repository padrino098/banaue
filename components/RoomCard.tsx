
import React from 'react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onView: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onView }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-100 flex flex-col h-full">
      <div 
        className="h-56 relative overflow-hidden cursor-pointer"
        onClick={() => onView(room)}
      >
        <img 
          src={room.images[0]} 
          alt={room.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <span className="text-white text-sm font-bold flex items-center">
            <i className="fa-solid fa-camera mr-2"></i> View Gallery
          </span>
        </div>
        <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-2xl shadow-lg">
          {room.icon}
        </div>
      </div>
      
      <div className="p-8 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-green-900 leading-tight">{room.title}</h3>
          <span className="bg-green-50 text-green-700 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap ml-2">
            {room.price > 0 ? (
              <>₱{room.price} <span className="text-xs font-normal">/ night</span></>
            ) : (
              'Included'
            )}
          </span>
        </div>
        
        <p className="text-stone-600 mb-6 leading-relaxed text-sm">
          {room.description}
        </p>
        
        <ul className="grid grid-cols-1 gap-2 mb-6">
          {room.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center text-xs text-stone-500">
              <i className="fa-solid fa-check text-green-500 mr-2"></i>
              {feature}
            </li>
          ))}
          {room.features.length > 3 && <li className="text-xs text-stone-400 font-medium">+ more amenities</li>}
        </ul>
      </div>
      
      <div className="p-8 pt-0 mt-auto">
        <button 
          onClick={() => onView(room)}
          className={`w-full py-4 border-2 font-bold rounded-xl transition-all duration-300 uppercase tracking-widest text-xs ${
            room.price > 0 
            ? 'border-green-800 text-green-800 hover:bg-green-800 hover:text-white' 
            : 'border-stone-200 text-stone-400 hover:border-green-800 hover:text-green-800'
          }`}
        >
          {room.price > 0 ? 'View & Book' : 'Explore Space'}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
