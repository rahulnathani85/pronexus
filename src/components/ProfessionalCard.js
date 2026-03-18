import { Avatar, Badge, StarRating } from './UI';

export default function ProfessionalCard({ professional, onClick, delay = 0 }) {
  const p = professional;
  return (
    <div className="card p-5 cursor-pointer" onClick={() => onClick(p)} style={{ animation: "fadeUp 0.4s ease " + delay + "s both" }}>
      <div className="flex gap-3 mb-3">
        <Avatar initials={p.avatar} size={50} org={p.org} />
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base">{p.name}</span>
            {p.verified && <span className="text-brand-950 text-sm">✓</span>}
          </div>
          <div className="text-[13px] text-gray-500">{p.title}</div>
          <div className="flex items-center gap-2 mt-1"><Badge org={p.org} /><span className="text-xs text-gray-400">📍 {p.location}</span></div>
        </div>
      </div>
      <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{p.bio}</p>
      <div className="flex gap-1 flex-wrap mb-3">{p.skills.map(s => <span key={s} className="tag">{s}</span>)}</div>
      <div className="flex justify-between items-center">
        <StarRating rating={p.rating} />
        <span className="text-xs text-gray-400">{p.projects} projects</span>
        {p.available ? <span className="text-[11px] text-white bg-green-700 px-2.5 py-0.5 rounded-xl font-semibold">Available</span> : <span className="text-[11px] text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-xl font-semibold">Busy</span>}
      </div>
    </div>
  );
}
