
import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  activeView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setView }) => {
  const navItems = [
    { id: 'dashboard' as AppView, icon: 'fa-house', label: 'Home' },
    { id: 'safety' as AppView, icon: 'fa-location-crosshairs', label: 'Tracking' },
    { id: 'welfare' as AppView, icon: 'fa-heart-pulse', label: 'Welfare' },
    { id: 'resources' as AppView, icon: 'fa-shield-halved', label: 'Advice' },
    { id: 'contacts' as AppView, icon: 'fa-user-group', label: 'Circle' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-pink-200 px-1 py-3 z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 min-w-[64px] ${
              activeView === item.id ? 'text-pink-700 scale-110' : 'text-gray-400 opacity-60'
            }`}
          >
            <i className={`fas ${item.icon} text-lg mb-0.5`}></i>
            <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
