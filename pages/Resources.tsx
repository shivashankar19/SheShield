
import React, { useState } from 'react';
import { getSelfDefenseAdvice } from '../services/geminiService';

const Resources: React.FC = () => {
  const [scenario, setScenario] = useState('');
  const [tips, setTips] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchDefenseTips = async (specificScenario?: string) => {
    setLoading(true);
    const query = specificScenario || scenario || "General safety when walking alone at night";
    try {
      const result = await getSelfDefenseAdvice(query);
      setTips(result || "1. Stay aware of your surroundings. 2. Keep moving toward well-lit areas. 3. Trust your gut instinct.");
    } finally {
      setLoading(false);
    }
  };

  const quickScenarios = [
    "Walking home at night",
    "Public transport safety",
    "Dealing with a stalker",
    "Cab/Taxi safety",
  ];

  const safetyTips = [
    { title: 'Keys Ready', desc: 'Hold your keys in your hand before reaching your car or door.', icon: 'fa-key', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { title: 'Device Charge', desc: 'Keep your phone above 30% and carry a power bank.', icon: 'fa-battery-three-quarters', color: 'bg-green-100 text-green-800 border-green-200' },
    { title: 'Share Location', desc: 'Always share your live location with at least one trusted person.', icon: 'fa-location-arrow', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { title: 'No Headphones', desc: 'Avoid using noise-canceling headphones while walking alone.', icon: 'fa-headphones-simple', color: 'bg-red-100 text-red-800 border-red-200' },
    { title: 'Check Number Plate', desc: 'Always verify the cab number plate and driver identity before entering.', icon: 'fa-car-side', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { title: 'Public Spaces', desc: 'Try to stay in well-lit, crowded areas if you feel you are being followed.', icon: 'fa-users', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { title: 'Self Defense Tool', desc: 'Keep pepper spray or a high-decibel personal alarm in an accessible pocket.', icon: 'fa-spray-can-sparkles', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { title: 'Trust Instincts', desc: 'If a situation feels wrong, leave immediately without worrying about being polite.', icon: 'fa-brain', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-pink-100">
        <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter">Safety Advisor</h2>
        <p className="text-sm text-slate-500 mb-6 font-bold uppercase text-[10px] tracking-widest">AI Expert Guidance</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {quickScenarios.map((s) => (
            <button 
              key={s}
              onClick={() => { setScenario(s); fetchDefenseTips(s); }}
              className="px-4 py-2.5 bg-pink-100 text-pink-800 text-[10px] font-black rounded-xl hover:bg-pink-600 hover:text-white transition-all active:scale-95 uppercase tracking-wider"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Describe a scenario..."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="w-full p-5 bg-slate-100 border-2 border-slate-50 rounded-3xl text-sm font-bold text-slate-900 outline-none focus:border-pink-500 placeholder-slate-400"
          />
          <button 
            onClick={() => fetchDefenseTips()}
            className="absolute right-2 top-2 w-12 h-12 bg-pink-600 text-white rounded-2xl flex items-center justify-center shadow-md active:scale-90 transition-all"
          >
            <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
          </button>
        </div>

        {tips && (
          <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-2xl animate-scale-up border-b-4 border-pink-600">
            <h4 className="font-black mb-4 flex items-center gap-2 text-base tracking-tight">
              <i className="fas fa-shield-halved text-pink-500"></i>
              Actionable Defense Plan
            </h4>
            <div className="text-sm font-bold leading-relaxed whitespace-pre-wrap text-slate-300">
              {tips}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-[40px] shadow-md border border-pink-100">
        <h3 className="font-black text-slate-900 mb-6 text-xl tracking-tight">Prevention Checklist</h3>
        <div className="grid grid-cols-1 gap-4">
          {safetyTips.map((tip, idx) => (
            <div key={idx} className={`flex gap-4 p-5 rounded-[28px] border-2 ${tip.color} items-start shadow-sm`}>
              <div className="w-12 h-12 rounded-[18px] bg-white/50 flex items-center justify-center flex-shrink-0 shadow-inner">
                <i className={`fas ${tip.icon} text-xl`}></i>
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-tight mb-1">{tip.title}</p>
                <p className="text-xs font-bold leading-snug opacity-80">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
