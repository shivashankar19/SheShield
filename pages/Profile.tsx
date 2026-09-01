
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  contactsCount: number;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, contactsCount }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-10 text-slate-900">
      <div className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100 text-center">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-xl border-4 border-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
        <div className="space-y-1 mb-6">
          <p className="text-slate-500 font-bold text-sm">{user.email}</p>
          <p className="text-pink-600 font-black text-sm tracking-tight">{user.phone}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-50 mb-6">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Circle</p>
            <p className="text-lg font-black text-slate-900">{contactsCount}</p>
          </div>
          <div className="text-center border-l border-r border-slate-50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Status</p>
            <p className="text-lg font-black text-green-600">Verified</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Reports</p>
            <p className="text-lg font-black text-slate-900">0</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">
            Account Security Active
          </div>
          <button onClick={onLogout} className="w-full p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 font-black text-sm text-red-600 mt-4 active:scale-95 transition-all">
            <i className="fas fa-right-from-bracket"></i>
            Logout Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
