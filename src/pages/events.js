import { EVENTS_FULL } from '../data/constants';

export default function EventsPage({ onJoin }) {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-[32px] font-extrabold">Events & Learning</h2>
          <p className="text-gray-500 text-sm mt-1">Conferences, webinars, workshops, and CPE sessions</p>
        </div>
        <button className="btn-primary" onClick={onJoin}>+ Host an Event</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {EVENTS_FULL.map((ev, i) => (
          <div key={i} className="card overflow-hidden">
            <div className={ev.color + " px-5 py-3.5 text-white"}>
              <div className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">{ev.type}</div>
              <h3 className="font-bold text-lg leading-snug">{ev.title}</h3>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-1.5 mb-3.5 text-[13px]">
                <span>📅 {ev.date}</span>
                <span>📍 {ev.loc}</span>
                <span>👥 {ev.attendees} attending</span>
                <span className={"font-bold " + (ev.price === 'Free' || ev.price === 'Free for members' ? 'text-green-700' : 'text-amber-600')}>{ev.price}</span>
              </div>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{ev.desc}</p>
              <button className="btn-primary w-full">Register Now</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 card p-10 text-center bg-gradient-to-br from-brand-950 to-brand-800 !border-0 text-white">
        <h3 className="font-display text-2xl font-extrabold mb-2">Want to host your own event?</h3>
        <p className="text-white/70 text-sm max-w-md mx-auto mb-6">Reach thousands of finance and law professionals. Host webinars, workshops, or conferences through ProNexus.</p>
        <button className="bg-white text-brand-950 border-none px-8 py-3 rounded-lg font-bold text-sm cursor-pointer hover:bg-gray-100" onClick={onJoin}>Get Started — It&apos;s Free</button>
      </div>
    </div>
  );
}
