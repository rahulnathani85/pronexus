import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import { useAuth } from '../components/AuthContext';
import { Badge } from '../components/UI';

export default function MessagesPage() {
  var auth = useAuth();
  var user = auth.user;
  var loading = auth.loading;
  var router = useRouter();

  var _tab = useState('messages');
  var tab = _tab[0];
  var setTab = _tab[1];
  var _msgs = useState([]);
  var messages = _msgs[0];
  var setMessages = _msgs[1];
  var _conns = useState([]);
  var connections = _conns[0];
  var setConnections = _conns[1];
  var _ld = useState(true);
  var pageLoading = _ld[0];
  var setPageLoading = _ld[1];
  var _reply = useState({});
  var replyTo = _reply[0];
  var setReplyTo = _reply[1];
  var _replyText = useState('');
  var replyText = _replyText[0];
  var setReplyText = _replyText[1];
  var _sending = useState(false);
  var sending = _sending[0];
  var setSending = _sending[1];

  useEffect(function() {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(function() {
    if (user) {
      loadMessages();
      loadConnections();
    }
  }, [user]);

  async function loadMessages() {
    setPageLoading(true);
    var r = await supabase
      .from('direct_messages')
      .select('*, sender:sender_id(full_name, org, avatar_initials), receiver:receiver_id(full_name, org, avatar_initials)')
      .or('sender_id.eq.' + user.id + ',receiver_id.eq.' + user.id)
      .order('created_at', { ascending: false });
    setMessages(r.data || []);
    setPageLoading(false);
  }

  async function loadConnections() {
    var r = await supabase
      .from('connections')
      .select('*, sender:sender_id(full_name, org, avatar_initials, title), receiver:receiver_id(full_name, org, avatar_initials, title)')
      .or('sender_id.eq.' + user.id + ',receiver_id.eq.' + user.id)
      .order('created_at', { ascending: false });
    setConnections(r.data || []);
  }

  async function handleAccept(connId) {
    await supabase
      .from('connections')
      .update({ status: 'accepted' })
      .eq('id', connId);
    loadConnections();
  }

  async function handleReject(connId) {
    await supabase
      .from('connections')
      .update({ status: 'rejected' })
      .eq('id', connId);
    loadConnections();
  }

  async function handleReply(receiverId) {
    if (!replyText.trim()) return;
    setSending(true);
    await supabase.from('direct_messages').insert({
      sender_id: user.id,
      receiver_id: receiverId,
      content: replyText
    });
    setReplyText('');
    setReplyTo({});
    setSending(false);
    loadMessages();
  }

  function timeAgo(date) {
    var s = Math.floor((new Date() - new Date(date)) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s / 60) + 'm ago';
    if (s < 86400) return Math.floor(s / 3600) + 'h ago';
    return Math.floor(s / 86400) + 'd ago';
  }

  if (loading || !user) {
    return (
      <div className="py-20 text-center text-gray-400">Loading...</div>
    );
  }

  var pending = connections.filter(function(c) {
    return c.receiver_id === user.id && c.status === 'pending';
  });

  var accepted = connections.filter(function(c) {
    return c.status === 'accepted';
  });

  var tabCls = function(t) {
    if (tab === t) return 'border-[1.5px] border-brand-950 bg-brand-50 text-brand-950';
    return 'border border-[#E8E6E1] bg-white text-gray-500';
  };

  return (
    <div className="py-10 max-w-[700px] mx-auto">
      <h2 className="font-display text-[32px] font-extrabold mb-6">
        Messages & Connections
      </h2>

      <div className="flex gap-2 mb-6">
        <button
          onClick={function() { setTab('messages'); }}
          className={'px-4 py-1.5 rounded-full text-[13px] font-semibold cursor-pointer transition-all ' + tabCls('messages')}
        >
          💬 Messages ({messages.length})
        </button>
        <button
          onClick={function() { setTab('pending'); }}
          className={'px-4 py-1.5 rounded-full text-[13px] font-semibold cursor-pointer transition-all ' + tabCls('pending')}
        >
          ⏳ Pending ({pending.length})
        </button>
        <button
          onClick={function() { setTab('connections'); }}
          className={'px-4 py-1.5 rounded-full text-[13px] font-semibold cursor-pointer transition-all ' + tabCls('connections')}
        >
          🤝 Connections ({accepted.length})
        </button>
      </div>

      {/* Messages Tab */}
      {tab === 'messages' && (
        <div>
          {pageLoading ? (
            <div>
              <div className="shimmer h-[80px] mb-3"></div>
              <div className="shimmer h-[80px] mb-3"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-gray-500">No messages yet.</p>
              <p className="text-gray-400 text-sm mt-1">
                Visit Discover to find and message professionals.
              </p>
            </div>
          ) : (
            messages.map(function(msg) {
              var isSent = msg.sender_id === user.id;
              var other = isSent ? msg.receiver : msg.sender;
              var otherId = isSent ? msg.receiver_id : msg.sender_id;
              var otherName = other ? other.full_name : 'Unknown';
              var otherInitials = other ? (other.avatar_initials || 'U') : 'U';
              var otherOrg = other ? (other.org || 'Other') : 'Other';
              var showReply = replyTo[msg.id];

              return (
                <div key={msg.id} className="card p-5 mb-3">
                  <div className="flex gap-3">
                    <div className="w-[40px] h-[40px] rounded-full bg-brand-950 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {otherInitials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{otherName}</span>
                        {otherOrg && <Badge org={otherOrg} />}
                        <span className="text-xs text-gray-400 ml-auto">
                          {timeAgo(msg.created_at)}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 mb-1">
                        {isSent ? 'You sent:' : otherName + ' wrote:'}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {msg.content}
                      </p>

                      {!isSent && (
                        <button
                          className="text-[13px] text-brand-950 font-semibold mt-2 cursor-pointer bg-transparent border-none"
                          onClick={function() {
                            var obj = {};
                            obj[msg.id] = !showReply;
                            setReplyTo(Object.assign({}, replyTo, obj));
                          }}
                        >
                          {showReply ? 'Cancel' : 'Reply'}
                        </button>
                      )}

                      {showReply && (
                        <div className="mt-3 flex gap-2">
                          <input
                            value={replyText}
                            onChange={function(e) { setReplyText(e.target.value); }}
                            onKeyDown={function(e) {
                              if (e.key === 'Enter') handleReply(otherId);
                            }}
                            placeholder="Type your reply..."
                            className="flex-1 px-3 py-2 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950"
                          />
                          <button
                            className="btn-primary !px-4 !py-2 !text-[13px]"
                            onClick={function() { handleReply(otherId); }}
                            disabled={sending}
                          >
                            {sending ? '...' : 'Send'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Pending Requests Tab */}
      {tab === 'pending' && (
        <div>
          {pending.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-gray-500">No pending requests.</p>
            </div>
          ) : (
            pending.map(function(conn) {
              var s = conn.sender;
              return (
                <div key={conn.id} className="card p-5 mb-3">
                  <div className="flex gap-3 items-center">
                    <div className="w-[44px] h-[44px] rounded-full bg-brand-950 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {s ? (s.avatar_initials || 'U') : 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">
                          {s ? s.full_name : 'Unknown'}
                        </span>
                        {s && s.org && <Badge org={s.org} />}
                      </div>
                      <div className="text-[13px] text-gray-500">
                        {s ? (s.title || '') : ''}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1">
                        Wants to connect · {timeAgo(conn.created_at)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="btn-primary !py-1.5 !px-4 !text-[13px]"
                        onClick={function() { handleAccept(conn.id); }}
                      >
                        Accept
                      </button>
                      <button
                        className="btn-outline !py-1.5 !px-4 !text-[13px]"
                        onClick={function() { handleReject(conn.id); }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Connections Tab */}
      {tab === 'connections' && (
        <div>
          {accepted.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🤝</div>
              <p className="text-gray-500">No connections yet.</p>
              <p className="text-gray-400 text-sm mt-1">
                Send connection requests from the Discover page.
              </p>
            </div>
          ) : (
            accepted.map(function(conn) {
              var isSender = conn.sender_id === user.id;
              var other = isSender ? conn.receiver : conn.sender;
              return (
                <div key={conn.id} className="card p-5 mb-3">
                  <div className="flex gap-3 items-center">
                    <div className="w-[44px] h-[44px] rounded-full bg-brand-950 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {other ? (other.avatar_initials || 'U') : 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">
                          {other ? other.full_name : 'Unknown'}
                        </span>
                        {other && other.org && <Badge org={other.org} />}
                      </div>
                      <div className="text-[13px] text-gray-500">
                        {other ? (other.title || '') : ''}
                      </div>
                    </div>
                    <span className="text-[12px] text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full">
                      Connected
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
