import { useState } from 'react';
import { CHATS, CHAT_MESSAGES } from '../data/constants';

export default function CommunityPage() {
  const [chatOpen, setChatOpen] = useState(null);
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState(CHAT_MESSAGES);

  const handleSend = () => {
    if (!chatMsg.trim()) return;
    setMessages(prev => [...prev, { from: 'You', msg: chatMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setChatMsg('');
  };

  return (
    <div className="py-10">
      <h2 className="font-display text-[32px] font-extrabold mb-2">Community Channels</h2>
      <p className="text-gray-500 mb-7">Join topic-based channels and chat with fellow professionals in real time.</p>
      <div className={"grid gap-5 " + (chatOpen ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1')}>
        <div>
          {CHATS.map((ch) => (
            <div key={ch.id} className={"card p-[18px] mb-2.5 cursor-pointer " + (chatOpen && chatOpen.id === ch.id ? '!border-brand-950 !border-[1.5px]' : '')} onClick={() => { setChatOpen(ch); setMessages(CHAT_MESSAGES); }}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-[15px]">{ch.name}</span>
                <span className="text-xs text-gray-400">{ch.time}</span>
              </div>
              <p className="text-[13px] text-gray-500 leading-relaxed">{ch.lastMsg}</p>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-400">👥 {ch.members.toLocaleString()} members</span>
                {ch.unread > 0 && <span className="bg-brand-950 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{ch.unread} new</span>}
              </div>
            </div>
          ))}
        </div>
        {chatOpen && (
          <div className="card flex flex-col h-[480px]">
            <div className="px-[18px] py-3.5 border-b border-[#E8E6E1] font-bold text-[15px] flex justify-between items-center shrink-0">
              <div>
                <div>{chatOpen.name}</div>
                <div className="text-xs text-gray-400 font-normal mt-0.5">👥 {chatOpen.members.toLocaleString()} members</div>
              </div>
              <button onClick={() => setChatOpen(null)} className="bg-transparent border-none text-lg cursor-pointer text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <div className="flex-1 p-[18px] overflow-y-auto flex flex-col gap-3.5">
              {messages.map((m, i) => (
                <div key={i}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={"font-bold text-[13px] " + (m.from === 'You' ? 'text-brand-950' : '')}>{m.from}</span>
                    <span className="text-[11px] text-gray-400">{m.time}</span>
                  </div>
                  <p className={"text-sm leading-relaxed px-3.5 py-2.5 " + (m.from === 'You' ? 'bg-brand-950 text-white rounded-[12px_4px_12px_12px] ml-auto w-fit' : 'bg-[#F4F3EF] text-gray-500 rounded-[4px_12px_12px_12px]')}>{m.msg}</p>
                </div>
              ))}
            </div>
            <div className="px-3.5 py-3.5 border-t border-[#E8E6E1] flex gap-2 shrink-0">
              <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type a message..." className="flex-1 px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
              <button className="btn-primary !px-[18px] !py-2.5" onClick={handleSend}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
