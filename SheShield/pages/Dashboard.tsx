
import React from 'react';
import { Location, AppView } from '../types';

interface DashboardProps {
  location: Location | null;
  isSOSActive: boolean;
  onSOS: (active: boolean) => void;
  setView: (view: AppView) => void;
  contactsCount: number;
}

const Dashboard: React.FC<DashboardProps> = ({ location, isSOSActive, onSOS, setView, contactsCount }) => {
  const helplines = [
    { name: 'Police / PCR', number: '100', color: 'bg-blue-600', icon: 'fa-building-shield' },
    { name: 'Women Support', number: '1091', color: 'bg-pink-600', icon: 'fa-venus' },
    { name: 'Medical / Ambulance', number: '108', color: 'bg-red-500', icon: 'fa-truck-medical' },
    { name: 'Domestic Abuse', number: '181', color: 'bg-purple-600', icon: 'fa-hand-holding-heart' },
    { name: 'Child Safety', number: '1098', color: 'bg-emerald-600', icon: 'fa-child' },
    { name: 'Railway Security', number: '139', color: 'bg-zinc-700', icon: 'fa-train' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* PRIMARY ALERT BUTTON */}
      <div className={`p-10 rounded-[50px] shadow-2xl text-center transition-all duration-500 border-2 ${isSOSActive ? 'bg-red-600 text-white border-red-700' : 'bg-white border-pink-100'}`}>
        <h2 className={`text-2xl font-black mb-4 tracking-tighter ${isSOSActive ? 'text-white' : 'text-slate-900'}`}>
          {isSOSActive ? 'DISPATCHING ALERTS' : 'Safety Portal'}
        </h2>
        
        <div className="flex justify-center my-10">
          <button 
            onClick={() => onSOS(!isSOSActive)}
            className={`w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 shadow-[0_25px_50px_-12px_rgba(220,38,38,0.5)] ${
              isSOSActive 
                ? 'bg-white text-red-600 border-8 border-red-100' 
                : 'bg-red-600 text-white border-8 border-red-50 sos-pulse'
            }`}
          >
            <i className={`fas ${isSOSActive ? 'fa-stop' : 'fa-bolt-lightning'} text-6xl mb-2`}></i>
            <span className="font-black text-3xl tracking-tighter">{isSOSActive ? 'CANCEL' : 'HELP'}</span>
          </button>
        </div>

        <p className={`text-[11px] font-black uppercase tracking-[0.3em] ${isSOSActive ? 'text-white animate-pulse' : 'text-slate-400'}`}>
          {isSOSActive ? 'NOTIFYING SAFETY CIRCLE' : 'TAP TO ALERT SAFETY CIRCLE'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => setView('safety')} className="bg-white p-6 rounded-[35px] shadow-sm border border-slate-100 flex flex-col items-center cursor-pointer active:scale-95 transition-transform">
          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-[18px] flex items-center justify-center mb-3">
            <i className="fas fa-satellite-dish text-xl"></i>
          </div>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">GPS Status</span>
          <span className={`text-xs font-black mt-1 ${location ? 'text-green-600' : 'text-orange-500'}`}>
            {location ? 'SYNCED' : 'AWAITING LOCK'}
          </span>
        </div>
        <div onClick={() => setView('contacts')} className="bg-white p-6 rounded-[35px] shadow-sm border border-slate-100 flex flex-col items-center cursor-pointer active:scale-95 transition-transform">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-[18px] flex items-center justify-center mb-3">
            <i className="fas fa-users-viewfinder text-xl"></i>
          </div>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Circle</span>
          <span className="text-xs font-black text-slate-900 mt-1">{contactsCount} Contacts</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[45px] shadow-md border border-slate-50">
        <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3 text-xl tracking-tight">
          <i className="fas fa-phone-flip text-pink-600"></i>
          Emergency Response
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {helplines.map((service, idx) => (
            <a 
              key={idx}
              href={`tel:${service.number}`}
              className="flex items-center gap-5 p-5 rounded-[28px] bg-slate-50 border border-slate-100 hover:bg-white active:scale-[0.98] transition-all group"
            >
              <div className={`w-14 h-14 ${service.color} text-white rounded-[22px] flex items-center justify-center shadow-lg`}>
                <i className={`fas ${service.icon} text-xl`}></i>
              </div>
              <div className="flex-1">
                <p className="font-black text-slate-900 text-base leading-tight tracking-tight">{service.name}</p>
                <p className="text-sm font-black text-pink-600 mt-0.5">{service.number}</p>
              </div>
              <i className="fas fa-chevron-right text-xs text-slate-300"></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
