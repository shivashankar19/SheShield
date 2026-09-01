
import React, { useState } from 'react';

interface LoginProps {
  onAuthSuccess: (userData: { name: string, email: string, phone: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onAuthSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return alert("Please enter your name to proceed.");
    if (phone.trim().length < 10) return alert("Please enter a valid mobile number.");
    
    setLoading(true);
    // Direct login simulation
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({ 
        name: name.trim(), 
        email: `${name.toLowerCase().replace(/\s/g, '')}@sheshield.local`, 
        phone: phone.trim() 
      });
    }, 800);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6 text-slate-900">
      <div className="w-full max-w-sm bg-white rounded-[45px] shadow-2xl overflow-hidden animate-fade-in border border-white/50">
        <div className="p-9 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-600 text-white rounded-[24px] mb-5 shadow-2xl transform rotate-3">
              <i className="fas fa-shield-heart text-4xl"></i>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">SheShield</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Instant Safety Access</p>
          </div>

          <form onSubmit={handleDirectLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-[11px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Identify Yourself</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter Your Full Name" 
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-black text-slate-900 focus:border-pink-500 outline-none transition-all placeholder:text-slate-300" 
              />
            </div>

            <div className="text-left">
              <label className="block text-[11px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Mobile Terminal</label>
              <input 
                type="tel" 
                required 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Mobile Number" 
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-black text-slate-900 focus:border-pink-500 outline-none transition-all placeholder:text-slate-300" 
              />
            </div>

            <button 
              disabled={loading} 
              type="submit" 
              className="w-full py-6 bg-pink-600 text-white font-black rounded-3xl shadow-xl active:scale-95 transition-all uppercase tracking-widest mt-4 text-sm"
            >
              {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'GET STARTED'}
            </button>
          </form>

          <p className="mt-8 text-[10px] text-slate-300 font-bold leading-relaxed uppercase tracking-tighter">
            Hardware encryption & GPS synchronization<br/>will initialize after entry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
