import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../components/AuthContext';
import { Modal } from '../components/UI';

var COLORS = ['bg-brand-950', 'bg-emerald-800', 'bg-purple-900'];

function CreateEventModal(props) {
  var user = useAuth().user;
  var onClose = props.onClose;
  var onCreated = props.onCreated;
  var _s = useState({ title: '', description: '', date: '', location: '', event_type: 'Webinar', price: 'Free' });
  var form = _s[0];
  var setForm = _s[1];
  var _l = useState(false);
  var loading = _l[0];
  var setLoading = _l[1];
  var _e = useState('');
  var error = _e[0];
  var setError = _e[1];

  async function handleSubmit() {
    if (!form.title || !form.date) {
      setError('Title and date are required');
      return;
    }
    setLoading(true);
    var resp = await supabase.from('events').insert({
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      event_type: form.event_type,
      price: form.price,
      author_id: user.id
    });
    if (resp.error) { setError(resp.error.message); }
    else { onCreated(); onClose(); }
    setLoading(false);
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-8">
        <h3 className="font-display text-2xl font-extrabold mb-4">Host an event</h3>
        {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block font-semibold text-[13px] mb-1.5">Event title</label>
          <input type="text" placeholder="e.g. GST Compliance Workshop"
            value={form.title}
            onChange={function(e) { setForm(Object.assign({}, form, { title: e.target.value })); }}
            className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-[13px] mb-1.5">Description</label>
          <textarea placeholder="What will this event cover?"
            value={form.description}
            onChange={function(e) { setForm(Object.assign({}, form, { description: e.target.value })); }}
            rows={3}
            className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold text-[13px] mb-1.5">Date</label>
            <input type="text" placeholder="e.g. April 15, 2026"
              value={form.date}
              onChange={function(e) { setForm(Object.assign({}, form, { date: e.target.value })); }}
              className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
          </div>
          <div>
            <label className="block font-semibold text-[13px] mb-1.5">Location</label>
            <input type="text" placeholder="e.g. Virtual or Mumbai"
              value={form.location}
              onChange={function(e) { setForm(Object.assign({}, form, { location: e.target.value })); }}
              className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold text-[13px] mb-1.5">Type</label>
            <select value={form.event_type}
              onChange={function(e) { setForm(Object.assign({}, form, { event_type: e.target.value })); }}
              className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none bg-white">
              <option>Webinar</option>
              <option>Workshop</option>
              <option>Conference</option>
              <option>Seminar</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-[13px] mb-1.5">Price</label>
            <input type="text" placeholder="Free or Rs.500"
              value={form.price}
              onChange={function(e) { setForm(Object.assign({}, form, { price: e.target.value })); }}
              className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
          </div>
        </div>

        <button className="btn-primary w-full !py-3" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </div>
    </Modal>
  );
}

export default function EventsPage(props) {
  var onJoin = props.onJoin;
  var user = useAuth().user;
  var _ev = useState([]);
  var events = _ev[0];
  var setEvents = _ev[1];
  var _ld = useState(true);
  var loading = _ld[0];
  var setLoading = _ld[1];
  var _sc = useState(false);
  var showCreate = _sc[0];
  var setShowCreate = _sc[1];

  useEffect(function() { loadEvents(); }, []);

  async function loadEvents() {
    var resp = await supabase.from('events').select('*').order('created_at', { ascending: false });
    setEvents(resp.data || []);
    setLoading(false);
  }

  function handleHostClick() {
    if (user) setShowCreate(true);
    else onJoin();
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-[32px] font-extrabold">Events & Learning</h2>
          <p className="text-gray-500 text-sm mt-1">Conferences, webinars, workshops, and CPE sessions</p>
        </div>
        <button className="btn-primary" onClick={handleHostClick}>+ Host an Event</button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="shimmer h-[280px]"></div>
          <div className="shimmer h-[280px]"></div>
          <div className="shimmer h-[280px]"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📅</div>
          <p className="text-gray-500">No events yet. Host the first one!</p>
          <button className="btn-primary mt-4" onClick={handleHostClick}>Host an Event</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map(function(ev, i) {
            var colorClass = COLORS[i % 3];
            var priceClass = (ev.price === 'Free') ? 'text-green-700' : 'text-amber-600';
            return (
              <div key={ev.id} className="card overflow-hidden">
                <div className={colorClass + ' px-5 py-3.5 text-white'}>
                  <div className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">
                    {ev.event_type || 'Event'}
                  </div>
                  <h3 className="font-bold text-lg leading-snug">{ev.title}</h3>
                </div>
                <div className="p-5">
                  <div className="flex flex-col gap-1.5 mb-3.5 text-[13px]">
                    <span>📅 {ev.date}</span>
                    {ev.location && <span>📍 {ev.location}</span>}
                    <span>👥 {ev.attendees_count || 0} attending</span>
                    <span className={'font-bold ' + priceClass}>{ev.price || 'Free'}</span>
                  </div>
                  {ev.description && (
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{ev.description}</p>
                  )}
                  <button className="btn-primary w-full">Register Now</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-12 card p-10 text-center bg-gradient-to-br from-brand-950 to-brand-800 !border-0 text-white">
        <h3 className="font-display text-2xl font-extrabold mb-2">Want to host your own event?</h3>
        <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
          Reach thousands of finance and law professionals through ProNexus.
        </p>
        <button
          className="bg-white text-brand-950 border-none px-8 py-3 rounded-lg font-bold text-sm cursor-pointer hover:bg-gray-100"
          onClick={handleHostClick}
        >
          Get Started
        </button>
      </div>

      {showCreate && (
        <CreateEventModal
          onClose={function() { setShowCreate(false); }}
          onCreated={loadEvents}
        />
      )}
    </div>
  );
}
