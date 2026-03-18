import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PROFESSIONALS } from '../data/constants';
import { aiMatch } from '../utils/aiMatch';
import ProfessionalCard from '../components/ProfessionalCard';
import ProfileModal from '../components/ProfileModal';

const FILTERS = ['All', 'CA', 'CS', 'Law', 'ICMAI', 'Valuer', 'IP'];

export default function DiscoverPage({ onJoin }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProf, setSelectedProf] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    if (router.query.q) {
      const q = router.query.q;
      setSearchQuery(q);
      setActiveFilter(FILTERS.includes(q) ? q : 'All');
      setResults(aiMatch(q));
    }
  }, [router.query.q]);

  const handleSearch = () => {
    if (!searchQuery.trim()) { setResults(null); return; }
    setIsSearching(true);
    setTimeout(() => { setResults(aiMatch(searchQuery)); setIsSearching(false); }, 600);
  };

  const handleFilter = (f) => {
    setActiveFilter(f);
    if (f === 'All') { setSearchQuery(''); setResults(null); }
    else { setSearchQuery(f); setResults(aiMatch(f)); }
  };

  return (
    <div className="py-10">
      <h2 className="font-display text-[32px] font-extrabold mb-2">Discover Professionals</h2>
      <p className="text-gray-500 mb-6">Use AI-powered search to find the perfect match for your project needs.</p>
      <div className="relative max-w-[600px] mb-8">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-40">🔍</span>
        <input className="w-full py-3.5 pl-12 pr-28 rounded-xl border-[1.5px] border-[#E8E6E1] text-[15px] bg-white outline-none focus:border-brand-950" placeholder="Search by skill, discipline, or expertise..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
        <button className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 !py-2 !px-5 !text-[13px]" onClick={handleSearch}>{isSearching ? '...' : 'Search'}</button>
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button key={f} onClick={() => handleFilter(f)} className={"px-4 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-all border " + (activeFilter === f ? 'border-brand-950 bg-brand-50 text-brand-950' : 'border-[#E8E6E1] bg-white text-gray-500')}>{f === 'All' ? 'All Disciplines' : f}</button>
        ))}
      </div>
      {results && <p className="text-sm text-gray-400 mb-4">{results.length} professional{results.length !== 1 ? 's' : ''} found</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(results || PROFESSIONALS).map((p, i) => (<ProfessionalCard key={p.id} professional={p} onClick={setSelectedProf} delay={i * 0.05} />))}
      </div>
      {results && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-500">No professionals found for &quot;{searchQuery}&quot;</p>
        </div>
      )}
      {selectedProf && <ProfileModal professional={selectedProf} onClose={() => setSelectedProf(null)} onConnect={onJoin} />}
    </div>
  );
}
