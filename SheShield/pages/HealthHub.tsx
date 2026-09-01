
import React, { useState, useEffect } from 'react';
import { CycleData } from '../types';
import { getSkincareAdvice, getHealthTips } from '../services/geminiService';

interface HealthHubProps {
  cycleData: CycleData;
  setCycleData: (data: CycleData) => void;
}

const HealthHub: React.FC<HealthHubProps> = ({ cycleData, setCycleData }) => {
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

  const nextPeriod = new Date(lastDate);
  nextPeriod.setDate(lastDate.getDate() + cycleData.cycleLength);

  useEffect(() => {
    fetchHealthTips();
  }, [currentDay]);

  const fetchHealthTips = async () => {
    setLoadingHealth(true);
    try {
      const tip = await getHealthTips(currentDay);
      setHealthTip(tip || 'Keep hydrated and rest well today!');
    } finally {
      setLoadingHealth(false);
    }
  };

  const handleGenerateSkincare = async () => {
    setLoadingSkin(true);
    try {
      const advice = await getSkincareAdvice(skinType, skinConcern);
      setSkincareAdvice(advice || 'Wear SPF daily and keep skin clean.');
    } finally {
      setLoadingSkin(false);
    }
  };

  const saveCycleUpdate = () => {
    setCycleData({ ...cycleData, lastDate: tempDate });
    setIsEditingCycle(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* MENSTRUAL TRACKER */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex justify-between items-center">
          Cycle Tracker
          <span className="text-xs bg-pink-600 text-white px-3 py-1.5 rounded-full font-bold">Day {currentDay}</span>
        </h2>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-48 h-48 flex items-center justify-center rounded-full border-[12px] border-pink-50">
            <div 
              className="absolute inset-0 rounded-full border-[12px] border-pink-500 border-t-transparent transition-all"
              style={{ transform: `rotate(${(currentDay / cycleData.cycleLength) * 360}deg)` }}
            ></div>
            <div className="text-center">
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Next Period</span>
              <p className="text-3xl font-black text-gray-900 mt-1">{nextPeriod.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
              <p className="text-sm text-pink-600 font-bold mt-1">{cycleData.cycleLength - currentDay} days to go</p>
            </div>
          </div>
        </div>

        {isEditingCycle ? (
          <div className="bg-pink-50 p-4 rounded-2xl mb-4 border border-pink-200 animate-scale-up">
            <label className="block text-xs font-bold text-pink-700 uppercase mb-2">Last Period Start Date</label>
            <input 
              type="date" 
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              className="w-full p-3 bg-white border border-pink-200 rounded-xl text-gray-900 font-bold mb-3 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <div className="flex gap-2">
              <button onClick={saveCycleUpdate} className="flex-1 py-2 bg-pink-600 text-white rounded-lg font-bold text-sm">Save</button>
              <button onClick={() => setIsEditingCycle(false)} className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="bg-pink-50/80 p-5 rounded-2xl mb-4 border border-pink-100">
            <h4 className="font-bold text-pink-800 mb-2 flex items-center gap-2 text-sm">
              <i className="fas fa-sparkles"></i>
              Cycle Insight
            </h4>
            {loadingHealth ? (
              <div className="animate-pulse flex space-y-2 flex-col">
                <div className="h-2.5 bg-pink-200 rounded w-3/4"></div>
                <div className="h-2.5 bg-pink-200 rounded w-1/2"></div>
              </div>
            ) : (
              <p className="text-sm text-pink-900 font-medium leading-relaxed whitespace-pre-wrap">{healthTip}</p>
            )}
          </div>
        )}

        <button 
          onClick={() => setIsEditingCycle(true)}
          className="w-full py-3.5 border-2 border-dashed border-pink-300 text-pink-700 rounded-2xl text-sm font-bold hover:bg-pink-50 active:scale-[0.98] transition-all"
        >
          {isEditingCycle ? 'Editing Cycle...' : 'Update Cycle Dates'}
        </button>
      </div>

      {/* SKINCARE ADVICE */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">AI Skincare Expert</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-2 ml-1">My Skin Type</label>
            <div className="relative">
              <select 
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 appearance-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Dry">Dry</option>
                <option value="Oily">Oily</option>
                <option value="Combination">Combination</option>
                <option value="Sensitive">Sensitive</option>
                <option value="Normal">Normal</option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-2 ml-1">Top Concern</label>
            <div className="relative">
              <select 
                value={skinConcern}
                onChange={(e) => setSkinConcern(e.target.value)}
                className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 appearance-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Acne">Acne</option>
                <option value="Dullness">Dullness</option>
                <option value="Dark Circles">Dark Circles</option>
                <option value="Fine Lines">Fine Lines</option>
                <option value="Pores">Pores</option>
                <option value="Hyperpigmentation">Pigmentation</option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
        </div>

        <button 
          onClick={handleGenerateSkincare}
          disabled={loadingSkin}
          className="w-full py-4 gradient-bg text-white rounded-2xl font-bold shadow-lg disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center"
        >
          {loadingSkin ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-wand-magic-sparkles mr-2"></i>}
          Analyze & Get Routine
        </button>

        {skincareAdvice && (
          <div className="mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner">
            <div className="flex items-center gap-2 mb-4 text-pink-700 font-bold text-base">
              <i className="fas fa-notes-medical"></i>
              Your Personal Skincare Plan
            </div>
            <div className="prose prose-sm text-gray-800 font-medium whitespace-pre-wrap text-sm leading-loose">
              {skincareAdvice}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthHub;
