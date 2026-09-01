
import React, { useState, useEffect } from 'react';
import { User, CycleData } from '../types';
import { getSkincareAdvice, getHealthTips } from '../services/geminiService';

interface WelfareProps {
  user: User;
  onLogout: () => void;
  contactsCount: number;
  cycleData: CycleData;
  setCycleData: (data: CycleData) => void;
}

const Welfare: React.FC<WelfareProps> = ({ user, onLogout, contactsCount, cycleData, setCycleData }) => {
  const [skinType, setSkinType] = useState('Combination');
  const [skinConcern, setSkinConcern] = useState('Dullness');
  const [skincareAdvice, setSkincareAdvice] = useState('');
  const [healthTip, setHealthTip] = useState('');
  const [loadingSkin, setLoadingSkin] = useState(false);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [isEditingCycle, setIsEditingCycle] = useState(false);
  const [tempDate, setTempDate] = useState(cycleData.lastDate);

  // Calculate day of cycle
  const lastDate = new Date(cycleData.lastDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) % cycleData.cycleLength;
  const currentDay = diffDays === 0 ? 1 : diffDays;

  useEffect(() => {
    fetchHealthTips();
  }, [currentDay]);

  const fetchHealthTips = async () => {
    setLoadingHealth(true);
    try {
      const tip = await getHealthTips(currentDay);
      setHealthTip(tip || 'Focus on iron-rich foods and hydration today.');
    } finally {
      setLoadingHealth(false);
    }
  };

  const handleGenerateSkincare = async () => {
    setLoadingSkin(true);
    try {
      const advice = await getSkincareAdvice(skinType, skinConcern);
      setSkincareAdvice(advice || 'Consistency is key. Use a gentle cleanser and moisturizer.');
    } finally {
      setLoadingSkin(false);
    }
  };

  const saveCycleUpdate = () => {
    setCycleData({ ...cycleData, lastDate: tempDate });
    setIsEditingCycle(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="pt-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter px-2 mb-4">Welfare & Self-Care</h2>
      </div>

      {/* MENSTRUATION CYCLE TRACKER */}
      <div className="bg-white p-8 rounded-[40px] shadow-md border border-pink-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
            <i className="fas fa-calendar-check text-pink-600"></i>
            Cycle Tracker
          </h3>
          <button 
            onClick={() => setIsEditingCycle(!isEditingCycle)}
            className="text-[10px] font-black uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-100"
          >
            {isEditingCycle ? 'Cancel' : 'Edit Date'}
          </button>
        </div>

        <div className="flex items-center justify-between mb-8">
           <div className="text-left">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</p>
             <p className="text-2xl font-black text-slate-900">Day {currentDay}</p>
           </div>
           <div className="w-16 h-16 rounded-full bg-pink-600 text-white flex items-center justify-center text-xs font-black shadow-lg">
             {cycleData.cycleLength - currentDay} Left
           </div>
        </div>

        {isEditingCycle ? (
          <div className="space-y-4 mb-6 animate-scale-up p-5 bg-pink-50 rounded-3xl border border-pink-200">
            <div>
              <label className="block text-[10px] font-black text-pink-700 uppercase mb-1.5 ml-1">Last Cycle Start Date</label>
              <input 
                type="date" 
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="w-full p-4 bg-white border-2 border-pink-100 rounded-2xl font-bold outline-none text-slate-900"
              />
            </div>
            <button 
              onClick={saveCycleUpdate} 
              className="w-full py-4 bg-pink-600 text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all uppercase tracking-widest text-xs"
            >
              Update Log
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 p-6 rounded-3xl mb-6 border border-slate-100">
             <div className="flex items-center gap-3 mb-3">
                <i className="fas fa-clipboard-list text-pink-500 text-sm"></i>
                <span className="text-[10px] font-black uppercase text-pink-700 tracking-widest">Summary</span>
             </div>
             <p className="text-sm font-bold text-slate-700 leading-relaxed">
               You are currently on day {currentDay} of your cycle. Your next period is expected in {cycleData.cycleLength - currentDay} days. Keep track of any symptoms to improve prediction accuracy.
             </p>
          </div>
        )}
      </div>

      {/* SKINCARE SECTION */}
      <div className="bg-white p-8 rounded-[40px] shadow-md border border-slate-100">
        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
          <i className="fas fa-pump-soap text-blue-500"></i>
          Skincare Analyst
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="space-y-1">
             <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Skin Type</label>
             <select 
               value={skinType}
               onChange={(e) => setSkinType(e.target.value)}
               className="w-full p-4 bg-slate-50 rounded-2xl font-black text-xs border border-slate-100 outline-none text-slate-900"
             >
               <option>Oily</option>
               <option>Dry</option>
               <option>Combination</option>
               <option>Sensitive</option>
             </select>
          </div>
          <div className="space-y-1">
             <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Primary Concern</label>
             <select 
               value={skinConcern}
               onChange={(e) => setSkinConcern(e.target.value)}
               className="w-full p-4 bg-slate-50 rounded-2xl font-black text-xs border border-slate-100 outline-none text-slate-900"
             >
               <option>Acne</option>
               <option>Dullness</option>
               <option>Aging</option>
               <option>Texture</option>
             </select>
          </div>
        </div>

        <button 
          onClick={handleGenerateSkincare}
          disabled={loadingSkin}
          className="w-full py-4 bg-slate-900 text-white font-black rounded-3xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          {loadingSkin ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-wand-magic-sparkles"></i>}
          Analyze My Profile
        </button>

        {skincareAdvice && (
          <div className="mt-8 p-6 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner animate-scale-up">
            <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-4">Optimized Routine</h4>
            <div className="text-sm font-bold text-slate-700 leading-loose whitespace-pre-wrap">
              {skincareAdvice}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welfare;
