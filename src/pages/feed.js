import { useState } from 'react';
import { Avatar, Badge } from '../components/UI';
import { POSTS, EVENTS } from '../data/constants';

export default function FeedPage({ onJoin }) {
  const [postFilter, setPostFilter] = useState('all');
  const filteredPosts = postFilter === 'all' ? POSTS : POSTS.filter(p => p.type === postFilter);
  const typeColors = { article: 'text-brand-950', requirement: 'text-amber-600', event: 'text-green-700' };
  const typeLabels = { article: '📝 Article', requirement: '🔍 Requirement', event: '📅 Event' };
  const typeBorders = { article: 'border-l-brand-950', requirement: 'border-l-amber-600', event: 'border-l-green-700' };

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-[32px] font-extrabold">Community Feed</h2>
          <p className="text-gray-500 text-sm mt-1">Articles, requirements, and events from the community</p>
        </div>
        <button className="btn-primary" onClick={onJoin}>+ Create Post</button>
      </div>
      <div className="flex gap-2 mb-6">
        {[['all','All Posts'],['article','📝 Articles'],['requirement','🔍 Requirements'],['event','📅 Events']].map(([key,label]) => (
          <button key={key} onClick={() => setPostFilter(key)} className={"px-4 py-1.5 rounded-full text-[13px] font-semibold cursor-pointer transition-all " + (postFilter === key ? 'border-[1.5px] border-brand-950 bg-brand-50 text-brand-950' : 'border border-[#E8E6E1] bg-white text-gray-500')}>{label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div>
          {filteredPosts.map((post) => (
            <div key={post.id} className={"card border-l-[3px] " + typeBorders[post.type] + " p-6 mb-3.5"}>
              <div className="flex gap-3 mb-3.5">
                <Avatar initials={post.avatar} size={40} org={post.org} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{post.author}</span>
                    <Badge org={post.org} />
                    <span className="text-xs text-gray-400 ml-auto">{post.time}</span>
                  </div>
                  <span className={"text-[11px] " + typeColors[post.type] + " font-semibold uppercase tracking-wider"}>{typeLabels[post.type]}</span>
                </div>
              </div>
              <h3 className="font-bold text-[17px] mb-2 leading-snug">{post.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3.5">{post.excerpt}</p>
              <div className="flex gap-1.5 flex-wrap mb-3.5">{post.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <div className="flex gap-6 pt-3 border-t border-[#E8E6E1]">
                <span className="text-[13px] text-gray-500 cursor-pointer">❤️ {post.likes}</span>
                <span className="text-[13px] text-gray-500 cursor-pointer">💬 {post.comments}</span>
                <span className="text-[13px] text-gray-500 cursor-pointer ml-auto">↗ Share</span>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3.5">
          <div className="card p-5">
            <h4 className="font-bold text-[15px] mb-3">🔥 Trending Topics</h4>
            {['#FinanceAct2026','#TransferPricing','#FEMACompliance','#IBC','#CryptoTax','#ESGAudit'].map(t => (
              <div key={t} className="py-2 border-b border-[#E8E6E1] last:border-0 text-sm text-brand-950 cursor-pointer font-medium">{t}</div>
            ))}
          </div>
          <div className="card p-5">
            <h4 className="font-bold text-[15px] mb-3">📅 Upcoming Events</h4>
            {EVENTS.map(e => (
              <div key={e.id} className="py-2.5 border-b border-[#E8E6E1] last:border-0">
                <div className="font-semibold text-sm">{e.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{e.date} · {e.location} · {e.attendees} attending</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
