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
  var _loading = useState(false);
  var loading = _loading[0];
  var setLoading = _loading[1];
  var _showMsg = useState(false);
  var showMsg = _showMsg[0];
  var setShowMsg = _showMsg[1];
  var _msgText = useState('');
  var msgText = _msgText[0];
  var setMsgText = _msgText[1];
  var _msgSent = useState(false);
  var msgSent = _msgSent[0];
  var setMsgSent = _msgSent[1];
  var _sending = useState(false);
  var sending = _sending[0];
  var setSending = _sending[1];

  if (!p) return null;

  useEffect(function() {
    if (user && p.id) checkConnection();
  }, [user, p.id]);

  async function checkConnection() {
    var r1 = await supabase
      .from('connections')
      .select('status')
      .eq('sender_id', user.id)
      .eq('receiver_id', p.id)
      .maybeSingle();

    if (r1.data) {
      setConnStatus(r1.data.status);
      return;
    }

    var r2 = await supabase
      .from('connections')
      .select('status')
      .eq('sender_id', p.id)
      .eq('receiver_id', user.id)
      .maybeSingle();

    if (r2.data) {
      setConnStatus(r2.data.status);
    }
  }

  async function handleConnect() {
    if (!user) { onJoin(); return; }
    setLoading(true);
    var resp = await supabase.from('connections').insert({
      sender_id: user.id,
      receiver_id: p.id,
      status: 'pending'
    });
    if (!resp.error) setConnStatus('pending');
    setLoading(false);
  }

  async function handleSendMessage() {
    if (!user) { onJoin(); return; }
    if (!msgText.trim()) return;
    setSending(true);
    var resp = await supabase.from('direct_messages').insert({
      sender_id: user.id,
      receiver_id: p.id,
      content: msgText
    });
    if (!resp.error) {
      setMsgSent(true);
      setMsgText('');
      setTimeout(function() { setMsgSent(false); }, 3000);
    }
    setSending(false);
  }

  function getConnectLabel() {
    if (connStatus === 'accepted') return '✓ Connected';
    if (connStatus === 'pending') return '⏳ Request Sent';
    return 'Connect';
  }

  var isConnected = connStatus === 'accepted';
  var isPending = connStatus === 'pending';

  return (
    <Modal onClose={onClose}>
      <div className="p-8">
        <div className="flex gap-4 mb-5">
          <div className="w-[64px] h-[64px] rounded-full bg-brand-950 flex items-center justify-center text-white text-xl font-bold shrink-0">
            {p.avatar || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-[22px]">
                {p.name}
              </h3>
              {p.verified && (
                <span className="text-green-700 text-sm font-semibold">
                  ✓ Verified
                </span>
              )}
            </div>
            <div className="text-[15px] text-gray-500 mt-0.5">
              {p.title}
            </div>
            <div className="flex gap-2 items-center mt-1.5 flex-wrap">
              {p.org && <Badge org={p.org} />}
              {p.location && (
                <span className="text-[13px] text-gray-400">
                  📍 {p.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {p.bio && (
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            {p.bio}
          </p>
        )}

        <div className="flex gap-8 mb-5 pb-5 border-b border-[#E8E6E1]">
          <div>
            <StarRating rating={p.rating} />
            <div className="text-xs text-gray-400 mt-1">Rating</div>
          </div>
          <div>
            <span className="font-bold text-lg">{p.projects}</span>
            <div className="text-xs text-gray-400 mt-1">Projects</div>
          </div>
          <div>
            {p.available ? (
              <span className="text-green-700 font-bold">● Available</span>
            ) : (
              <span className="text-gray-400 font-bold">● Busy</span>
            )}
            <div className="text-xs text-gray-400 mt-1">Status</div>
          </div>
        </div>

        {p.skills && p.skills.length > 0 && (
          <div className="mb-5">
            <h4 className="font-bold text-sm mb-2">Expertise</h4>
            <div className="flex gap-1.5 flex-wrap">
              {p.skills.map(function(s) {
                return (
                  <span key={s} className="tag !text-[13px] !px-3 !py-1">
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Connect and Message buttons */}
        <div className="flex gap-3 mb-4">
          <button
            className={isConnected
              ? "flex-1 py-2.5 rounded-lg font-semibold text-sm bg-green-50 text-green-700 border border-green-200 cursor-default"
              : isPending
              ? "flex-1 py-2.5 rounded-lg font-semibold text-sm bg-amber-50 text-amber-700 border border-amber-200 cursor-default"
              : "btn-primary flex-1"}
            onClick={function() {
              if (!isConnected && !isPending) handleConnect();
            }}
            disabled={loading || isConnected || isPending}
          >
            {loading ? 'Sending...' : getConnectLabel()}
          </button>
          <button
            className="btn-outline flex-1"
            onClick={function() {
              if (!user) onJoin();
              else setShowMsg(!showMsg);
            }}
          >
            {showMsg ? 'Close' : 'Message'}
          </button>
        </div>

        {/* Message box */}
        {showMsg && (
          <div className="border border-[#E8E6E1] rounded-lg p-4">
            {msgSent && (
              <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-3">
                Message sent!
              </div>
            )}
            <textarea
              placeholder={"Write a message to " + p.name + "..."}
              value={msgText}
              onChange={function(e) { setMsgText(e.target.value); }}
              rows={3}
              className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950 resize-none mb-3"
            />
            <button
              className="btn-primary w-full"
              onClick={handleSendMessage}
              disabled={sending || !msgText.trim()}
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
