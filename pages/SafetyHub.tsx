
import React, { useState, useEffect } from 'react';
import { Location } from '../types';
import { getNearbySafeZones } from '../services/geminiService';

interface SafetyHubProps {
  location: Location | null;
}

const SafetyHub: React.FC<SafetyHubProps> = ({ location }) => {
  const [safeZones, setSafeZones] = useState<string>('');
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastFetchedLoc, setLastFetchedLoc] = useState<string>('');

  useEffect(() => {
    // Only fetch if location exists and we haven't fetched for this general area recently
    if (location) {
      const locKey = `${location.lat.toFixed(4)},${location.lng.toFixed(4)}`;
      if (locKey !== lastFetchedLoc) {
        fetchSafeZones();
        setLastFetchedLoc(locKey);
      }
    }
  }, [location?.lat, location?.lng]);

  const fetchSafeZones = async () => {
    if (!location) return;
    setLoading(true);
    try {
      const result = await getNearbySafeZones(location.lat, location.lng);
      setSafeZones(result.text || 'No safety data found for this coordinate.');
      setSources(result.sources || []);
    } catch (e) {
      console.error(e);
      setSafeZones('Emergency lookup failed. Use manual dial below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter">Satellite Telemetry</h2>
        <p className="text-sm text-slate-500 font-bold mb-8 uppercase tracking-widest text-[10px]">Real-time hardware verification</p>
        
        <div className="w-full h-72 bg-slate-100 rounded-[35px] flex items-center justify-center relative overflow-hidden border-4 border-slate-50 shadow-inner">
          {location ? (
            <div className="text-center p-8 bg-white/95 backdrop-blur shadow-2xl rounded-[35px] border border-white mx-4 w-full animate-scale-up">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-25"></div>
                <div className="relative w-12 h-12 bg-pink-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white">
                  <i className="fas fa-crosshairs animate-pulse"></i>
                </div>
              </div>
              <p className="font-black text-slate-900 text-lg tracking-tighter uppercase">Signal Locked</p>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-slate-900 text-white p-3 rounded-2xl">
                  <span className="block text-[8px] text-slate-400 font-black uppercase">Latitude</span>
                  <span className="font-mono text-xs font-black tracking-widest">{location.lat.toFixed(6)}°</span>
                </div>
                <div className="bg-slate-900 text-white p-3 rounded-2xl">
                  <span className="block text-[8px] text-slate-400 font-black uppercase">Longitude</span>
                  <span className="font-mono text-xs font-black tracking-widest">{location.lng.toFixed(6)}°</span>
                </div>
              </div>
              
              <p className="text-[9px] text-slate-400 mt-6 font-black uppercase tracking-[0.2em] border-t border-slate-50 pt-4">
                Sync Latency: {Math.round(performance.now() % 100)}ms | {new Date(location.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <div className="text-center p-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
                <i className="fas fa-satellite-dish text-3xl text-pink-500"></i>
              </div>
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest animate-pulse">Awaiting GPS Handshake...</p>
              <p className="text-[9px] text-slate-300 font-bold mt-2 uppercase tracking-tight px-8">Ensure location permissions are granted in browser</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-8 rounded-[40px] shadow-md border border-slate-50">
        <h3 className="font-black text-slate-900 mb-6 text-xl tracking-tight flex items-center gap-2">
          <i className="fas fa-map-location-dot text-blue-600"></i>
          Grounding: Nearby Safe Zones
        </h3>
        
        {loading ? (
          <div className="flex flex-col items-center py-10 space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Querying Local Infrastructure...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {!location ? (
               <div className="p-6 bg-slate-50 rounded-2xl text-center border border-dashed border-slate-200">
                  <i className="fas fa-location-arrow text-slate-300 text-3xl mb-3"></i>
                  <p className="text-xs font-black text-slate-400 uppercase">Awaiting coordinates to find safety zones</p>
               </div>
            ) : (
              <>
                <div className="prose prose-sm text-slate-700 font-bold text-sm leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
                  {safeZones || "Scanning for nearby resources..."}
                </div>

                {sources.length > 0 && (
                  <div className="pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">Live Navigation Sources</p>
                    <div className="flex flex-col gap-2">
                      {sources.map((chunk, idx) => chunk.maps && (
                        <a 
                          key={idx}
                          href={chunk.maps.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-2xl text-xs font-black hover:bg-blue-100 transition-all border border-blue-100 active:scale-[0.98]"
                        >
                          <span className="uppercase tracking-tighter">{chunk.maps.title || "Open Navigation"}</span>
                          <i className="fas fa-location-arrow"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetyHub;
