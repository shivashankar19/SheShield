
import React, { useState } from 'react';
import { Contact } from '../types';

interface ContactsPageProps {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
}

const ContactsPage: React.FC<ContactsPageProps> = ({ contacts, setContacts }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name,
        phone,
        relation
      };
      setContacts([...contacts, newContact]);
      setName('');
      setPhone('');
      setIsAdding(false);
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="bg-white p-6 rounded-3xl shadow-md border border-pink-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Safety Circle</h2>
            <p className="text-xs text-gray-500 font-medium">Alerts will be sent to these people.</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-90 ${
              isAdding ? 'bg-gray-200 text-gray-600' : 'bg-pink-600 text-white'
            }`}
          >
            <i className={`fas ${isAdding ? 'fa-xmark' : 'fa-plus'} text-lg`}></i>
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAdd} className="bg-pink-50 p-6 rounded-2xl space-y-4 mb-8 border border-pink-200 shadow-inner animate-scale-up">
            <div>
              <label className="block text-[11px] font-black text-pink-700 uppercase mb-1.5 ml-1">Contact Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3.5 bg-white border border-pink-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-400 shadow-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-pink-700 uppercase mb-1.5 ml-1">Phone Number</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3.5 bg-white border border-pink-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-400 shadow-sm"
                placeholder="+1..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-pink-700 uppercase mb-1.5 ml-1">Relation</label>
              <div className="relative">
                <select 
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full p-3.5 bg-white border border-pink-200 rounded-xl text-sm font-bold text-gray-900 appearance-none focus:ring-2 focus:ring-pink-500 outline-none shadow-sm"
                >
                  <option>Parent</option>
                  <option>Sibling</option>
                  <option>Partner</option>
                  <option>Friend</option>
                  <option>Other</option>
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
            <button className="w-full py-4 bg-pink-600 text-white font-black rounded-xl shadow-lg active:scale-95 transition-all text-base uppercase tracking-wider">
              Secure Contact
            </button>
          </form>
        )}

        <div className="space-y-4">
          {contacts.length === 0 ? (
            <div className="text-center py-16 px-6">
              <div className="w-20 h-20 bg-pink-50 text-pink-200 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-pink-100 shadow-inner">
                <i className="fas fa-user-shield text-4xl"></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Your circle is empty</h3>
              <p className="text-gray-500 text-sm max-w-[200px] mx-auto leading-relaxed">Add at least one person who can help you in an emergency.</p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group transition-all hover:bg-white hover:shadow-md">
                <div className="w-14 h-14 bg-pink-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
                  {contact.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-base">{contact.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-2 py-0.5 bg-pink-100 text-pink-700 font-black rounded-md uppercase border border-pink-200">
                      {contact.relation}
                    </span>
                    <span className="text-sm text-gray-600 font-mono font-bold">{contact.phone}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeContact(contact.id)}
                  className="w-10 h-10 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all flex items-center justify-center"
                >
                  <i className="fas fa-trash-can"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
