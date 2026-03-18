import { useState, useEffect } from 'react';
import { Modal, Badge, StarRating } from './UI';
import { useAuth } from './AuthContext';
import { supabase } from '../utils/supabase';

export default function ProfileModal(props) {
  var p = props.professional;
  var onClose = props.onClose;
  var onJoin = props.onConnect;
  var auth = useAuth();
  var user = auth.user;

  var _cs = useState('none');
  var connStatus = _cs[0];
  var setConnStatus = _cs[1];
  var _ld = useState(false);
  var loading = _ld[0];
  var setLoading = _ld[1];
  var _showChat = useState(false);
  var showChat = _showChat[0];
  var setShowChat = _showChat[1];

  if (!p) return null;

  useEffect(function() {
    if (user && p.id) checkConnection();
  }, [user, p.id]);

  async function checkConnection() {
    var r1 = await supabase
      .from('connections').select('status')
      .eq('sender_id', user.id).eq('receiver_id', p.id)
      .maybeSingle();
    if (r1.data) { setConnStatus(r1.data.status); return; }
    var r2 = await supabase
      .from('connections').select('status')
      .eq('sender_id', p.id).eq('receiver_id', user.id)
      .maybeSingle();
    if (r2.data) setConnStatus(r2.data.status);
  }

  async function handleConnect() {
    if (!user) { onJoin(); return; }
    setLoading(true);
    var resp = await supabase.from('connections').insert({
      sender_id: user.id, receiver_id: p.id, status: 'pending'
    });
    if (!resp.error) setConnStatus('pending');
    setLoading(false);
  }

  function getConnectLabel() {
    if (connStatus === 'accepted') return '✓ Connected';
    if (connStatus === 'pending') return '⏳ Request Sent';
    return 'Connect';
  }

  var isConnected = connStatus === 'accepted';
  var isPending = connStatus === 'pending';

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>

      <div className={'bg-white max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up relative ' + (showChat ? 'w-[50%]' : 'w-[90%] max-w-[520px]')}
        style={{ margin: 'auto', borderRadius: showChat ? '16px 0 0 16px' : '16px', transition: 'width 0.3s' }}
        onClick={function(e) { e.stopPropagation(); }}>

        <div className="p-8">
          <button onClick={onClose}
            className="absolute top-4 right-5 bg-transparent border-none text-xl cursor-pointer text-gray-400 hover:text-gray-700">
            ✕
          </button>

          <div className="flex gap-4 mb-5">
            <div className="w-[64px] h-[64px] rounded-full bg-brand-950 flex items-center justify-center text-white text-xl font-bold shrink-0">
              {p.avatar || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-[22px]">{p.name}</h3>
                {p.verified && <span className="text-green-700 text-sm font-semibold">✓ Verified</span>}
              </div>
              <div className="text-[15px] text-gray-500 mt-0.5">{p.title}</div>
              <div className="flex gap-2 items-center mt-1.5 flex-wrap">
                {p.org && <Badge org={p.org} />}
                {p.location && <span className="text-[13px] text-gray-400">📍 {p.location}</span>}
              </div>
            </div>
          </div>

          {p.bio && <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.bio}</p>}

          <div className="flex gap-8 mb-5 pb-5 border-b border-[#E8E6E1]">
            <div><StarRating rating={p.rating} /><div className="text-xs text-gray-400 mt-1">Rating</div></div>
            <div><span className="font-bold text-lg">{p.projects}</span><div className="text-xs text-gray-400 mt-1">Projects</div></div>
            <div>
              {p.available
                ? <span className="text-green-700 font-bold">● Available</span>
                : <span className="text-gray-400 font-bold">● Busy</span>}
              <div className="text-xs text-gray-400 mt-1">Status</div>
            </div>
          </div>

          {p.skills && p.skills.length > 0 && (
            <div className="mb-5">
              <h4 className="font-bold text-sm mb-2">Expertise</h4>
              <div className="flex gap-1.5 flex-wrap">
                {p.skills.map(function(s) { return <span key={s} className="tag !text-[13px] !px-3 !py-1">{s}</span>; })}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              className={isConnected
                ? "flex-1 py-2.5 rounded-lg font-semibold text-sm bg-green-50 text-green-700 border border-green-200 cursor-default"
                : isPending
                ? "flex-1 py-2.5 rounded-lg font-semibold text-sm bg-amber-50 text-amber-700 border border-amber-200 cursor-default"
                : "btn-primary flex-1"}
              onClick={function() { if (!isConnected && !isPending) handleConnect(); }}
              disabled={loading || isConnected || isPending}>
              {loading ? 'Sending...' : getConnectLabel()}
            </button>
            <button className="btn-outline flex-1"
              onClick={function() { if (!user) onJoin(); else setShowChat(!showChat); }}>
              {showChat ? 'Close Chat' : '💬 Message'}
            </button>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="bg-white w-[40%] max-w-[380px] max-h-[90vh] shadow-2xl flex flex-col"
          style={{ margin: 'auto 0', borderRadius: '0 16px 16px 0' }}
          onClick={function(e) { e.stopPropagation(); }}>
          <ChatSidebar
            userId={user.id}
            otherUserId={p.id}
            otherName={p.name}
            otherInitials={p.avatar || 'U'}
          />
        </div>
      )}
    </div>
  );
}

function ChatSidebar(props) {
  var userId = props.userId;
  var otherUserId = props.otherUserId;
  var otherName = props.otherName;
  var otherInitials = props.otherInitials;

  var _msgs = useState([]);
  var messages = _msgs[0];
  var setMessages = _msgs[1];
  var _text = useState('');
  var text = _text[0];
  var setText = _text[1];
  var _sending = useState(false);
  var sending = _sending[0];
  var setSending = _sending[1];
  var _ld = useState(true);
  var loading = _ld[0];
  var setLoading = _ld[1];

  useEffect(function() {
    loadMessages();
    var channel = supabase
      .channel('dm-' + userId + '-' + otherUserId)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'direct_messages'
      }, function(payload) {
        var msg = payload.new;
        var isRelevant =
          (msg.sender_id === userId && msg.receiver_id === otherUserId) ||
          (msg.sender_id === otherUserId && msg.receiver_id === userId);
        if (isRelevant) {
          setMessages(function(prev) { return prev.concat([msg]); });
        }
      })
      .subscribe();

    return function() { supabase.removeChannel(channel); };
  }, [userId, otherUserId]);

  useEffect(function() {
    var el = document.getElementById('chat-bottom');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function loadMessages() {
    setLoading(true);
    var r = await supabase
      .from('direct_messages')
      .select('*')
      .or(
        'and(sender_id.eq.' + userId + ',receiver_id.eq.' + otherUserId + '),' +
        'and(sender_id.eq.' + otherUserId + ',receiver_id.eq.' + userId + ')'
      )
      .order('created_at', { ascending: true });
    setMessages(r.data || []);
    setLoading(false);
  }

  async function handleSend() {
    if (!text.trim()) return;
    setSending(true);
    var msg = text;
    setText('');
    await supabase.from('direct_messages').insert({
      sender_id: userId,
      receiver_id: otherUserId,
      content: msg
    });
    setSending(false);
  }

  function formatTime(date) {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit'
    });
  }

  return (
    <>
      <div className="px-5 py-4 border-b border-[#E8E6E1] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-[36px] h-[36px] rounded-full bg-brand-950 flex items-center justify-center text-white text-xs font-bold">
            {otherInitials}
          </div>
          <div>
            <div className="font-bold text-[15px]">{otherName}</div>
            <div className="text-[11px] text-green-600">Online</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
        style={{ minHeight: '300px', maxHeight: '55vh' }}>
        {loading && (
          <div className="text-center text-gray-400 text-sm py-4">
            Loading messages...
          </div>
        )}
        {!loading && messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">
            No messages yet. Say hello!
          </div>
        )}
        {messages.map(function(msg) {
          var isMine = msg.sender_id === userId;
          return (
            <div key={msg.id}
              className={isMine ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'}>
              <div className={isMine
                ? 'bg-brand-950 text-white px-3.5 py-2.5 rounded-[16px_4px_16px_16px] text-sm leading-relaxed'
                : 'bg-[#F4F3EF] text-gray-700 px-3.5 py-2.5 rounded-[4px_16px_16px_16px] text-sm leading-relaxed'}>
                {msg.content}
              </div>
              <div className={'text-[10px] text-gray-400 mt-1 ' + (isMine ? 'text-right' : 'text-left')}>
                {formatTime(msg.created_at)}
              </div>
            </div>
          );
        })}
        <div id="chat-bottom"></div>
      </div>

      <div className="px-4 py-3 border-t border-[#E8E6E1] flex gap-2 shrink-0">
        <input
          value={text}
          onChange={function(e) { setText(e.target.value); }}
          onKeyDown={function(e) { if (e.key === 'Enter') handleSend(); }}
          placeholder={'Message ' + otherName + '...'}
          className="flex-1 px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950"
        />
        <button
          className="btn-primary !px-4 !py-2.5"
          onClick={handleSend}
          disabled={sending || !text.trim()}>
          {sending ? '...' : 'Send'}
        </button>
      </div>
    </>
  );
}
