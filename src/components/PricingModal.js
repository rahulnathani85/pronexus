import { Modal } from './UI';

export default function PricingModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="p-8" style={{ maxWidth: 640 }}>
        <h3 className="font-display text-2xl font-extrabold mb-1 text-center">Plans & Pricing</h3>
        <p className="text-gray-500 text-sm mb-7 text-center">Start free, upgrade when you need more.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-6">
            <div className="font-bold text-lg mb-1">Free</div>
            <div className="mb-4"><span className="font-display text-3xl font-black">Rs.0</span><span className="text-sm opacity-70">forever</span></div>
            {["Profile & basic search", "Join 3 community channels", "View articles & events", "5 AI matches/month", "Basic messaging"].map(f => (<div key={f} className="text-[13px] py-1 flex items-center gap-2"><span className="text-green-700">✓</span>{f}</div>))}
            <button className="btn-outline w-full mt-5">Get Started</button>
          </div>
          <div className="card p-6 border-2 !border-brand-950 bg-brand-950 text-white">
            <div className="font-bold text-lg mb-1">Pro</div>
            <div className="mb-4"><span className="font-display text-3xl font-black">Rs.999</span><span className="text-sm opacity-70">/month</span></div>
            {["Unlimited AI matching", "Priority in search results", "Unlimited channels", "Post requirements", "Analytics dashboard", "Verified badge", "Priority support"].map(f => (<div key={f} className="text-[13px] py-1 flex items-center gap-2"><span style={{color:'#7CF5A5'}}>✓</span>{f}</div>))}
            <button className="w-full mt-5 py-2.5 rounded-lg font-semibold text-sm bg-white text-brand-950 border-none cursor-pointer hover:bg-gray-100">Upgrade to Pro</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
