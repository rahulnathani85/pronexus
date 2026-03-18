import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Avatar, Badge, Modal } from '../components/UI';
import { useAuth } from '../components/AuthContext';

const typeColors = { article: 'text-brand-950', requirement: 'text-amber-600', event: 'text-green-700' };
const typeLabels = { article: '📝 Article', requirement: '🔍 Requirement', event: '📅 Event' };
const typeBorders = { article: 'border-l-brand-950', requirement: 'border-l-amber-600', event: 'border-l-green-700' };

function CreatePostModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ type: 'article', title: '', content: '', tags: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    if (!form.title || !form.content) { setError('Title and content are required'); return; }
    setLoading(true);
    const tagsArray = form.tags.split(',').map(s => s.trim()).filter(Boolean);
    const { error: err } = await supabase.from('posts').insert({ author_id: user.id, type: form.type, title: form.title, content: form.content, tags: tagsArray });
    if (err) setError(err.message);
    else { onCreated(); onClose(); }
    setLoading(false);
  };
  return (
    <Modal onClose={onClose}>
      <div className="p-8">
        <h3 className="font-display text-2xl font-extrabold mb-4">Create a post</h3>
        {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-4">{error}</div>}
        <div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Post type</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none bg-white"><option value="article">📝 Article</option><option value="requirement">🔍 Requirement</option><option value="event">📅 Event</option></select></div>
        <div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Title</label><input type="text" placeholder="What's this about?" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
        <div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Content</label><textarea placeholder="Share your thoughts..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={5} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950 resize-none" /></div>
        <div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Tags (comma separated)</label><input type="text" placeholder="e.g. Tax, GST, Hiring" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
        <button className="btn-primary w-full !py-3" onClick={handleSubmit} disabled={loading}>{loading ? 'Posting...' : 'Publish Post'}</button>
      </div>
    </Modal>
  );
}

export default function FeedPage({ onJoin }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postFilter, setPostFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    const { data } = await supabase.from('posts').select('*, profiles:author_id(full_name, org, avatar_initials)').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  const filteredPosts = postFilter === 'all' ? posts : posts.filter(p => p.type === postFilter);

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    return Math.floor(seconds / 86400) + 'd ago';
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div><h2 className="font-display text-[32px] font-extrabold">Community Feed</h2><p className="text-gray-500 text-sm mt-1">Articles, requirements, and events from the community</p></div>
        <button className="btn-primary" onClick={() => user ? setShowCreate(true) : onJoin()}>+ Create Post</button>
      </div>
      <div className="flex gap-2 mb-6">
        {[['all','All Posts'],['article','📝 Articles'],['requirement','🔍 Requirements'],['event','📅 Events']].map(([key,label]) => (
          <button key={key} onClick={() => setPostFilter(key)} className={"px-4 py-1.5 rounded-full text-[13px] font-semibold cursor-pointer transition-all " + (postFilter === key ? 'border-[1.5px] border-brand-950 bg-brand-50 text-brand-950' : 'border border-[#E8E6E1] bg-white text-gray-500')}>{label}</button>
        ))}
      </div>
      {loading ? <div>{[1,2,3].map(i => <div key={i} className="shimmer h-[180px] mb-3.5" />)}</div> : filteredPosts.length === 0 ? (
        <div className="text-center py-16"><div className="text-4xl mb-3">📝</div><p className="text-gray-500">No posts yet. Be the first to share something!</p><button className="btn-primary mt-4" onClick={() => user ? setShowCreate(true) : onJoin()}>Create a Post</button></div>
      ) : (
        <div>{filteredPosts.map((post) => (
          <div key={post.id} className={"card border-l-[3px] " + (typeBorders[post.type] || '') + " p-6 mb-3.5"}>
            <div className="flex gap-3 mb-3.5">
              <Avatar initials={post.profiles?.avatar_initials || 'U'} size={40} org={post.profiles?.org || 'CA'} />
              <div className="flex-1">
                <div className="flex items-center gap-2"><span className="font-bold text-sm">{post.profiles?.full_name || 'Anonymous'}</span>{post.profiles?.org && <Badge org={post.profiles.org} />}<span className="text-xs text-gray-400 ml-auto">{timeAgo(post.created_at)}</span></div>
                <span className={"text-[11px] " + (typeColors[post.type] || '') + " font-semibold uppercase tracking-wider"}>{typeLabels[post.type] || post.type}</span>
              </div>
            </div>
            <h3 className="font-bold text-[17px] mb-2 leading-snug">{post.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-3.5">{post.content}</p>
            {post.tags && post.tags.length > 0 && <div className="flex gap-1.5 flex-wrap mb-3.5">{post.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>}
            <div className="flex gap-6 pt-3 border-t border-[#E8E6E1]"><span className="text-[13px] text-gray-500">❤️ {post.likes_count || 0}</span><span className="text-[13px] text-gray-500">💬 {post.comments_count || 0}</span><span className="text-[13px] text-gray-500 ml-auto">↗ Share</span></div>
          </div>
        ))}</div>
      )}
      {showCreate && <CreatePostModal onClose={() => setShowCreate(false)} onCreated={loadPosts} />}
    </div>
  );
}
