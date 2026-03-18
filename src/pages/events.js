import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../components/AuthContext';
import { Modal } from '../components/UI';

const COLORS = ['bg-brand-950', 'bg-emerald-800', 'bg-purple-900'];

function CreateEventModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '', event_type: 'Webinar', price: 'Free' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    if (!form.title || !form.date) { setError('Title and date are required'); return; }
    setLoading(true);
    const { error: err } = await supabase.from('events').insert({ ...form, author_id: user.id });
    if (err) setError(err.message);
    else { onCreated(); onClose(); }
    setLoading(false);
  };
  return (
    <Modal onClose={onClose}>
      <div className="p-8">
        <h3 className="font-display text-2xl font-extrabold mb-4">Host an event</h3>
        {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-4">{error}</div>}
        <div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Event title</label><input type="text" placeholder="e.g. GST Compliance Workshop" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
        <div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Description</label><textarea placeholder="What will this event cover?" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950 resize-none" /></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block font-semibold text-[13px] mb-1.5">Date</label><input type="text" placeholder="e.g. April 15, 2026" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
          <div><label className="block font-semibold text-[13px] mb-1.5">Location</label><input type="text" placeholder="e.g. Virtual or Mumbai" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block font-semibold text-[13px] mb-1.5">Type</label><select value={form.event_type} onChange={e => setForm({...form, event_type: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none bg-white"><option>Webinar</option><option>Workshop</option><option>Conference</option><option>Seminar</option></select></div>
          <div><label className="block font-semibold text-[13px] mb-1.5">Price</label><input type="text" placeholder="Free or Rs.500" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
        </div>
        <button className="btn-primary w-full !py-3" onClick={handleSubmit} disabled={loading}>{loading ? 'Creating...' : 'Create Event'}</button>
      </di
