import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import ProfessionalCard from '../components/ProfessionalCard';
import ProfileModal from '../components/ProfileModal';

const FILTERS = ['All', 'CA', 'CS', 'Law', 'ICMAI', 'Valuer', 'IP', 'Tax'];

export default function DiscoverPage({ onJoin }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProf, setSelectedProf] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(function() { loadProfessionals(); }, []);

  useEffect(function() {
    if (router.query.q) {
      setSearchQuery(router.query.q);
      searchProfessionals(router.query.q);
    }
  }, [router.query.q]);

  async function loadProfessionals() {
    var resp = await supabase.from('profiles').select('*').order('rating', { ascending: false });
    setProfessionals(resp.data || []);
    setLoading(false);
  }

  async function searchProfessionals(query) {
    if (!query.trim()) { setResults(null); return; }
    setIsSearching(true);
    var q = query.toLowerCase();
    var resp = await supabase.from('profiles').select('*');
    var allProfiles = resp.data || [];
    var filtered = allProfiles.filter(function(p) {
      return (p.skills || []).some(function(s) { return s.toLowerCase().includes(q); }) ||
        (p.title || '').toLowerCase().includes(q) ||
        (p.org || '').toLowerCase().includes(q) ||
        (p.bio || '').toLowerCase().includes(q) ||
        (p.full_name || '').toLowerCase().includes(q) ||
        (p.location || '').toLowerCase().includes(q);
    });
    setResults(filtered);
    setIsSearching(false);
  }

  function handleFilter(f) {
    setActiveFilter(f);
    if (f === 'All') { setSearchQuery(''); setResults(null); }
    else { setSearchQuery(f); searchProfessionals(f); }
  }

  function mapProfile(p) {
    return {
      id: p.id,
      name: p.full_name || 'Professional',
      title: p.title || 'Professional',
      org: p.org || 'Other',
      location: p.location || '',
      skills: p.skills || [],
      bio: p.bio || '',
      avatar: p.avatar_initials || 'U',
      rating: p.rating || 0,
      projects: p.projects_count || 0,
      available: p.available,
      verified: p.verified
    };
  }

  var displayList = (results || professionals).map(mapProfile);

  return (
    <div className="py-10">
      <h2 className="font-display text-[32px] font-extrabold mb-2">Discover Professionals</h2>
      <p className="text-gray-500 mb-6">Use AI-powered search to find the perfect match.</p>

      <div className="relative max-w-[600px] mb-8">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-40">🔍</span>
        <input
          className="w-full py-3.5 pl-12 pr-28 rounded-xl border-[1.5px] border-[#E8E6E1] text-[15px] bg-white outline-none focus:border-brand-950"
          placeholder="Search by skill, discipline, or expertise..."
          value={searchQuery}
          onChange={function(e) { setSearchQuery(e.target.value); }}
          onKeyDown={function(e) { if (e.key === 'Enter') searchProfessionals(searchQuery); }}
        />
        <button
          className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 !py-2 !px-5 !text-[13px]"
          onClick={function() { searchProfessionals(searchQuery); }}
        >
          {isSearching ? '...' : 'Search'}
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(function(f) {
          var cls = activeFilter === f
            ? 'border-brand-950 bg-brand-50 text-brand-950'
            : 'border-[#E8E6E1] bg-white text-gray-500';
          return (
            <button
              key={f}
              onClick={function() { handleFilter(f); }}
              className={'px-4 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-all border ' + cls}
            >
              {f === 'All' ? 'All Disciplines' : f}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="shimmer h-[240px]"></div>
          <div className="shimmer h-[240px]"></div>
          <div className="shimmer h-[240px]"></div>
        </div>
      ) : displayList.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">👥</div>
          <p className="text-gray-500">No professionals yet. Be the first to join!</p>
          <button className="btn-primary mt-4" onClick={onJoin}>Create Your Profile</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayList.map(function(p, i) {
            return <ProfessionalCard key={p.id} professional={p} onClick={setSelectedProf} delay={i * 0.05} />;
          })}
        </div>
      )}

      {selectedProf && (
        <ProfileModal
          professional={selectedProf}
          onClose={function() { setSelectedProf(null); }}
          onConnect={onJoin}
        />
      )}
    </div>
  );
}
