import { Modal } from './UI';

export default function JoinModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="p-8">
        <h3 className="font-display text-2xl font-extrabold mb-1">Join ProNexus</h3>
        <p className="text-gray-500 text-sm mb-6">Start connecting with 12,400+ finance and law professionals — free.</p>
        <div className="mb-4">
          <label className="block font-semibold text-[13px] mb-1.5">Full Name</label>
          <input type="text" placeholder="Your full name" className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-[13px] mb-1.5">Email</label>
          <input type="email" placeholder="you@firm.com" className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-[13px] mb-1.5">Professional Body</label>
          <select className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none bg-white focus:border-brand-950">
            <option>Select your discipline</option>
            <option>CA (Chartered Accountant)</option>
            <option>CS (Company Secretary)</option>
            <option>Advocate / Lawyer</option>
            <option>CMA / ICMAI (Cost Accountant)</option>
            <option>Registered Valuer</option>
            <option>Insolvency Professional</option>
            <option>Tax Consultant</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-[13px] mb-1.5">Primary Expertise</label>
          <input type="text" placeholder="e.g. Transfer Pricing, M&A" className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
        </div>
        <button className="btn-primary w-full !py-3 !text-[15px] mt-2">Create Free Account</button>
        <p className="text-center text-xs text-gray-400 mt-4">Free forever for basic features. Premium plans available.</p>
      </div>
    </Modal>
  );
}
