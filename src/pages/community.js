import { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../components/AuthContext';

export default function CommunityPage({ onJoin }) {
  const { user, profile } = useAuth();
  const [channels, setChannels] = useState([]);
  const [chatOpen, setChatOpen] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatMsg, setChatMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => { loadChannels(); }, []);

  useEffect(() => {
    if (!chatOpen) return;
    loadMessages(chatOpen.id);
    const channel = supabase.channel('messages-' + chatOpen.id).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'channel_id=eq.' + chatOpen.id }, async (payload) => {
      const { data: msgWithProfile } = await supabase.from('messages').select('*, profiles:author_id(full_name, avatar_initials)').eq('id', payload.new.id).single();
      if (msgWithProfile) setMessages(prev => [...prev, msgWithProfile]);
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [chatOpen]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function loadChannels() {
    const { data } = await supabase.from('channels').select('*').order('created_at');
    setChannels(data || []);
    setLoading(false);
  }

  async function loadMessages(channelId) {
    const { data } = await supabase.from('messages').select('*, profiles:author_id(full_name, avatar_initials)').eq('channel_id', channelId).order('created_at', { ascending: true }).limit(50);
    setMessages(data || []);
  }

  async function handleSend() {
    if (!chatMsg.trim() || !user || !chatOpen) return;
    const msg = chatMsg;
    setChatMsg('');
    await supabase.from('messages').insert({ channel_id: chatOpen.id, author_id: user.id, content: msg });
  }

  function formatTime(date) { return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

  return (
    <div className="py-10">
      <h2 className="font-display text-[32px] font-extrabold mb-2">Community Channels</h2>
      <p className="text-gray-500 mb-7">Join topic-based channels and chat with fellow professionals in real time.</p>
      {loading ? <div>{[1,2,3].map(i => <div key={i} className="shimmer h-[90px] mb-2.5" />)}</div> : (
        <div className={"grid gap-5 " + (chatOpen ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1')}>
          <div>
            {channels.map((ch) => (
              <div key={ch.id} className={"card p-[18px] mb-2.5 cursor-pointer " + (chatOpen && chatOpen.id === ch.id ? '!border-brand-950 !border-[1.5px]' : '')} onClick={() => setChatOpen(ch)}>
                <div className="flex justify-between items-center mb-1.5"><span className="font-bold text-[15px]">{ch.name}</span></div>
                <p className="text-[13px] text-gray-500 leading-relaxed">{ch.description || ''}</p>
                <div className="flex justify-between mt-2"><span className="text-xs text-gray-400">👥 {ch.members_count || 0} members</span></div>
              </div>
            ))}
          </div>
          {chatOpen && (
            <div className="card flex flex-col h-[480px]">
              <div className="px-[18px] py-3.5 border-b border-[#E8E6E1] font-bold text-[15px] flex justify-between items-center shrink-0">
                <div><div>{chatOpen.name}</div><div className="text-xs text-gray-400 font-normal mt-0.5">{chatOpen.description}</div></div>
                <button onClick={() => setChatOpen(null)} className="bg-transparent border-none text-lg cursor-pointer text-gray-400 hover:text-gray-700">✕</button>
              </div>
              <div className="flex-1 p-[18px] overflow-y-auto flex flex-col gap-3.5">
                {messages.length === 0 && <div className="text-center text-gray-400 text-sm py-8">No messages yet. Start the conversation!</div>}
                {messages.map((m) => (
                  <div key={m.id}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={"font-bold text-[13px] " + (m.author_id === user?.id ? 'text-brand-950' : '')}>{m.profiles?.full_name || 'Anonymous'}</span>
                      <span className="text-[11px] text-gray-400">{formatTime(m.created_at)}</span>
                    </div>
                    <p className={"text-sm leading-relaxed px-3.5 py-2.5 " + (m.author_id === user?.id ? 'bg-brand-950 text-white rounded-[12px_4px_12px_12px] ml-auto w-fit' : 'bg-[#F4F3EF] text-gray-500 rounded-[4px_12px_12px_12px]')}>{m.content}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="px-3.5 py-3.5 border-t border-[#E8E6E1] flex gap-2 shrink-0">
                {user ? (<><input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type a message..." className="flex-1 px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /><button className="btn-primary !px-[18px] !py-2.5" onClick={handleSend}>Send</button></>) : (
                  <button className="btn-primary w-full" onClick={onJoin}>Sign in to chat</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
