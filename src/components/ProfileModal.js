import { Modal, Badge, StarRating } from './UI';

export default function ProfileModal(props) {
  var p = props.professional;
  var onClose = props.onClose;
  var onConnect = props.onConnect;
  if (!p) return null;

  return (
    <Modal onClose={onClose}>
      <div className="p-8">
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

        {p.bio && (
          <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.bio}</p>
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
                return <span key={s} className="tag !text-[13px] !px-3 !py-1">{s}</span>;
              })}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button className="btn-primary flex-1" onClick={onConnect}>Connect</button>
          <button className="btn-outline flex-1">Message</button>
        </div>
      </div>
    </Modal>
  );
}
