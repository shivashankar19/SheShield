
import React, { useState, useEffect, useCallback } from 'react';
import { User, AppView, Contact, Location, DispatchStatus, CycleData } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SafetyHub from './pages/SafetyHub';
import Resources from './pages/Resources';
import ContactsPage from './pages/ContactsPage';
import Welfare from './pages/Welfare';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('login');
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('sh_user_session');
    return saved ? JSON.parse(saved) : { name: '', email: '', phone: '', isLoggedIn: false, isVerified: false };
  });
  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const saved = localStorage.getItem('sh_contacts');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  
  const [cycleData, setCycleData] = useState<CycleData>(() => {
    const saved = localStorage.getItem('sh_cycle_data');
    return saved ? JSON.parse(saved) : { lastDate: new Date().toISOString().split('T')[0], cycleLength: 28 };
  });

  const [location, setLocation] = useState<Location | null>(null);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [dispatchLogs, setDispatchLogs] = useState<DispatchStatus[]>([]);
  const [sosStatus, setSosStatus] = useState<string>('');

  // REAL-TIME GPS TRACKING
  useEffect(() => {
    if (!user.isLoggedIn) return;

    if (!navigator.geolocation) {
      alert("Critical Error: GPS Hardware not accessible.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({ 
          lat: pos.coords.latitude, 
          lng: pos.coords.longitude, 
          timestamp: Date.now() 
        });
      },
      (err) => {
        console.warn("GPS Signal Lost:", err.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [user.isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('sh_user_session', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sh_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('sh_cycle_data', JSON.stringify(cycleData));
  }, [cycleData]);

  const handleAuthSuccess = (userData: Partial<User>) => {
    setUser({
      name: userData.name || 'Shield User',
      email: userData.email || '',
      phone: userData.phone || '',
      isLoggedIn: true,
      isVerified: true
    });
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser({ name: '', email: '', phone: '', isLoggedIn: false, isVerified: false });
    localStorage.removeItem('sh_user_session');
    setView('login');
  };

  const handleSOS = useCallback(async (active: boolean) => {
    setIsSOSActive(active);
    if (active) {
      setSosStatus('BROADCASTING ALERTS...');
      const initialLogs: DispatchStatus[] = contacts.map(c => ({
        contactId: c.id,
        contactName: c.name,
        status: 'pending'
      }));
      setDispatchLogs(initialLogs);

      const locLink = location 
        ? `https://maps.google.com/?q=${location.lat},${location.lng}` 
        : "Awaiting GPS Fix...";
      
      const currentTime = new Date().toLocaleString();

      // Broadcast sequence
      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        setDispatchLogs(prev => prev.map(log => log.contactId === contact.id ? { ...log, status: 'sending' } : log));
        await new Promise(resolve => setTimeout(resolve, 800));
        setDispatchLogs(prev => prev.map(log => log.contactId === contact.id ? { ...log, status: 'delivered' } : log));
        
        // Professional emergency alert format as requested
        const message = `EMERGENCY ALERT\nI am in danger and need immediate help.\nMy current location: ${locLink}\nTime: ${currentTime}\nPlease contact the police or reach me as soon as possible.`;
        console.log(`%c[HELP DISPATCH TO ${contact.name}]`, "color: #e11d48; font-weight: bold;");
        console.log(message);
      }
    } else {
      setDispatchLogs([]);
    }
  }, [contacts, location]);

  if (!user.isLoggedIn) {
    return <Login onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen pb-20 bg-pink-50 text-slate-900 overflow-x-hidden">
      <header className="gradient-bg p-4 sticky top-0 z-50 flex justify-between items-center text-white shadow-xl">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
          <i className="fas fa-shield-heart text-2xl"></i>
          <h1 className="text-xl font-bold tracking-tighter">SheShield</h1>
        </div>
        <div onClick={() => setView('profile')} className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border-2 border-white/30 font-black text-lg cursor-pointer hover:bg-white/30 transition-colors">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </header>

      {isSOSActive && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-sm mb-6">
            <div className="bg-red-600 px-8 py-3 rounded-full text-white font-black animate-pulse inline-flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              HELP BROADCAST ACTIVE
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-6 text-left shadow-2xl">
              <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4">Message Queue</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {contacts.map((log) => {
                  const status = dispatchLogs.find(l => l.contactId === log.id)?.status || 'pending';
                  return (
                    <div key={log.id} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-2xl border border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${status === 'delivered' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
                        <span className="text-white font-bold text-xs">{log.name}</span>
                      </div>
                      <span className="text-[9px] font-black uppercase text-slate-500">{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-[35px] border border-white/10 mb-8 w-full max-w-sm">
             <i className="fas fa-satellite-dish text-4xl text-red-500 mb-3 animate-bounce"></i>
             <p className="text-white font-black text-xs uppercase tracking-widest">Live GPS Telemetry</p>
             <div className="mt-3 font-mono text-red-400 text-[10px] bg-black/40 p-2 rounded-lg">
               {location ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` : 'SYNCHRONIZING...'}
             </div>
          </div>

          <button onClick={() => handleSOS(false)} className="w-full max-w-xs py-6 bg-white text-red-600 font-black rounded-3xl text-xl shadow-2xl active:scale-95 transition-all">DEACTIVATE HELP</button>
        </div>
      )}

      <main className="p-4 md:max-w-2xl md:mx-auto">
        {view === 'dashboard' && <Dashboard location={location} isSOSActive={isSOSActive} onSOS={handleSOS} setView={setView} contactsCount={contacts.length} />}
        {view === 'safety' && <SafetyHub location={location} />}
        {view === 'resources' && <Resources />}
        {view === 'contacts' && <ContactsPage contacts={contacts} setContacts={setContacts} />}
        {view === 'welfare' && <Welfare user={user} onLogout={handleLogout} contactsCount={contacts.length} cycleData={cycleData} setCycleData={setCycleData} />}
        {view === 'profile' && <Profile user={user} onLogout={handleLogout} contactsCount={contacts.length} />}
      </main>

      <Navbar activeView={view} setView={setView} />
      {!isSOSActive && view !== 'dashboard' && (
        <button onClick={() => handleSOS(true)} className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-red-600 text-white shadow-2xl z-40 flex items-center justify-center sos-pulse border-4 border-white active:scale-90 transition-transform">
          <span className="text-sm font-black">HELP</span>
        </button>
      )}
    </div>
  );
};

export default App;
