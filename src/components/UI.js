import { ORG_COLORS } from '../data/constants';

export function Badge({ org }) {
  const c = ORG_COLORS[org] || { bg: "#444", text: "#fff" };
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase"
      style={{ background: c.bg, color: c.text }}
    >
      {org}
    </span>
  );
}

export function Avatar({ initials, size = 44, org }) {
  const c = ORG_COLORS[org] || { bg: "#444", text: "#fff" };
  return (
    <div
      className="rounded-full flex items-center justify-center font-extrabold shrink-0"
      style={{
        width: size, height: size, minWidth: size,
        background: "linear-gradient(135deg, " + c.bg + ", " + c.bg + "dd)",
        color: c.text, fontSize: size * 0.34, letterSpacing: '1px',
        border: "2px solid " + c.bg + "44",
      }}
    >
      {initials}
    </div>
  );
}

export function StarRating({ rating }) {
  return (
    <span className="text-[13px] font-bold" style={{ color: '#D4A017' }}>
      {"★".repeat(Math.floor(rating))}{" "}
      <span className="text-gray-400 font-medium">{rating}</span>
    </span>
  );
}

export function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-[520px] w-[90%] max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up relative"
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose} className="absolute top-4 right-5 bg-transparent border-none text-xl cursor-pointer text-gray-400 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  );
}
