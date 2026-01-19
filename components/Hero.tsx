
import React from 'react';
import terracesBg from './assets/bg-terraces.jpg';

const Hero: React.FC = () => {
  return (
    <header id="home" className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-emerald-950">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/70 via-emerald-900/35 to-transparent z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/35 via-transparent to-emerald-800/30 z-10"></div>
        <img 
          src={terracesBg}
          alt="Banaue Rice Terraces" 
          className="w-full h-full object-cover"
        />
        {/* Animated pattern overlay for subtle texture */}
        <div className="absolute inset-0 bg-terrace-pattern animate-terrace opacity-15 z-20"></div>
      </div>

      <div className="relative z-30 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
          Banaue Rice Terraces Transient House
        </h1>
        <p className="text-xl md:text-2xl text-green-100 mb-10 font-light max-w-2xl mx-auto italic">
          "Experience the 8th Wonder of the World from Your Doorstep"
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#rooms" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-green-900 font-bold rounded-full shadow-xl hover:scale-105 transition-transform duration-300 uppercase tracking-widest text-sm"
          >
            Explore Rooms
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-4 bg-green-700 text-white font-bold rounded-full shadow-xl hover:bg-green-600 transition-colors duration-300 uppercase tracking-widest text-sm"
          >
            Book Your Stay
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
