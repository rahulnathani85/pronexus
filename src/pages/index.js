import { useState } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Badge, StarRating } from '../components/UI';
import ProfileModal from '../components/ProfileModal';
import { DISCIPLINES } from '../data/constants';
import { aiMatch } from '../utils/aiMatch';

export default function HomePage({ onJoin }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResults, setAiResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProf, setSelectedProf] = useState(null);
  const router = useRouter();

  const handleAISearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setAiResults(null);
    setTimeout(() => { setAiResults(aiMatch(searchQuery)); setIsSearching(false); }, 1200);
  };

  return (
    <div className="animate-fade-up">
      <section className="text-center py-16 pb-12">
        <div className="inline-block bg-brand-50 text-brand-950 px-4 py-1.5 rounded-full text-[13px] font-semibold mb-5">🇮🇳 India&apos;s Premier Professional Network</div>
        <h1 className="font-display font-black text-[clamp(32px,5vw,56px)] leading-[1.1] max-w-[700px] mx-auto mb-5 tracking-tight">
          Where Finance & Law<br /><span className="text-brand-950">Professionals</span> Connect
        </h1>
        <p className="text-gray-500 text-lg max-w-[560px] mx-auto mb-9 leading-relaxed">
          CAs, Company Secretaries, Lawyers, Valuers, Cost Accountants, and Tax Professionals — all on one AI-powered platform.
        </p>
        <div className="max-w-[600px] mx-auto mb-12 relative">
          <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-xl opacity-40">🔍</span>
          <input className="w-full py-3.5 pl-12 pr-32 rounded-xl border-[1.5px] border-[#E8E6E1] text-[15px] bg-white outline-none focus:border-brand-950" placeholder="Try: 'transfer pricing expert' or 'FEMA lawyer'" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAISearch()} />
          <button className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 !py-2 !px-5 !text-[13px]" onClick={handleAISearch}>{isSearching ? 'Matching...' : 'AI Match'}</button>
        </div>
        {isSearching && (
          <div className="max-w-[600px] mx-auto mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-5 h-5 rounded-full border-2 border-brand-950 border-t-transparent animate-spin" />
              <span className="font-semibold text-brand-950 text-sm">AI is finding the best matches...</span>
            </div>
            {[1,2,3].map(i => <div key={i} className="shimmer h-[72px] mb-2.5" />)}
          </div>
        )}
        {aiResults && !isSearching && (
          <div className="max-w-[640px] mx-auto mb-10 text-left">
            <div className="flex items-center gap-2 mb-4">
              <span>✨</span>
              <span className="font-bold text-[15px] text-brand-950">AI matched {aiResults.length} professional{aiResults.length !== 1 ? 's' : ''}</span>
              <span className="text-xs text-gray-400">for &quot;{searchQuery}&quot;</span>
            </div>
            {aiResults.length === 0 && <p className="text-gray-500 text-sm">No exact matches found. Try broader terms.</p>}
            {aiResults.map((p, i) => (
              <div key={p.id} className="card p-4 mb-2.5 cursor-pointer flex gap-3.5 items-center" onClick={() => setSelectedProf(p)}>
                <Avatar initials={p.avatar} org={p.org} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[15px]">{p.name}</span>
                    <Badge org={p.org} />
                    {p.available && <span className="text-[10px] text-green-700 font-bold">● Available</span>}
                  </div>
                  <div className="text-[13px] text-gray-500 mt-0.5">{p.title} · {p.location}</div>
                  <div className="mt-1.5 flex gap-1 flex-wrap">{p.skills.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}</div>
                </div>
                <div className="text-right shrink-0"><StarRating rating={p.rating} /><div className="text-xs text-gray-400 mt-1">{p.projects} projects</div></div>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-[700px] mx-auto">
          {[['12,400+','Professionals'],['6','Disciplines'],['2,800+','Collaborations'],['95%','Match Rate']].map(([num,label],i) => (
            <div key={i} className="py-5">
              <div className="font-display font-extrabold text-4xl text-brand-950 leading-none">{num}</div>
              <div className="text-gray-400 text-[13px] font-medium mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12">
        <h2 className="font-display text-[28px] font-extrabold mb-2">Professional Disciplines</h2>
        <p className="text-gray-500 text-[15px] mb-7">Our network spans the full spectrum of finance, law, and accounting professionals.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {DISCIPLINES.map((d, i) => (
            <div key={i} className="card p-5 cursor-pointer text-center" onClick={() => router.push('/discover?q=' + d.org)}>
              <div className="text-3xl mb-2">{d.icon}</div>
              <div className="font-bold text-sm mb-1">{d.name}</div>
              <Badge org={d.org} />
              <div className="text-[13px] text-gray-400 mt-2">{d.count} members</div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12 pb-16">
        <h2 className="font-display text-[28px] font-extrabold mb-8 text-center">How ProNexus Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{step:'01',title:'Join & Build Your Profile',desc:'Sign up free. Add your qualifications, skills, and areas of expertise.',icon:'👤'},{step:'02',title:'AI Matches You',desc:'Our AI engine connects you with the right professionals based on skills and requirements.',icon:'🤖'},{step:'03',title:'Collaborate & Grow',desc:'Chat, share knowledge, post requirements, attend events, and build your network.',icon:'🤝'}].map((s,i) => (
            <div key={i} className="card p-8 text-center relative overflow-hidden">
              <div className="absolute top-3 right-4 font-display text-5xl font-black text-brand-50 leading-none">{s.step}</div>
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-[17px] mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {selectedProf && <ProfileModal professional={selectedProf} onClose={() => setSelectedProf(null)} onConnect={onJoin} />}
    </div>
  );
}
