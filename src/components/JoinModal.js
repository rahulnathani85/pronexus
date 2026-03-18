import { useState } from 'react';
import { Modal } from './UI';
import { useAuth } from './AuthContext';

export default function JoinModal({ onClose }) {
  const { signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ fullName: '', email: '', password: '', org: '', expertise: '' });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setError(''); setSuccess(''); setLoading(true);
    if (!form.email || !form.password) { setError('Email and password are required'); setLoading(false); return; }
    if (isLogin) {
      const { error } = await signIn({ email: form.email, password: form.password });
      if (error) setError(error.message);
      else { setSuccess('Logged in!'); setTimeout(onClose, 500); }
    } else {
      if (!form.fullName) { setError('Full name is required'); setLoading(false); return; }
      const { error } = await signUp({ email: form.email, password: form.password, fullName: form.fullName, org: form.org, expertise: form.expertise });
      if (error) setError(error.message);
      else { setSuccess('Account created!'); setTimeout(onClose, 1000); }
    }
    setLoading(false);
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-8">
        <h3 className="font-display text-2xl font-extrabold mb-1">{isLogin ? 'Welcome back' : 'Join ProNexus'}</h3>
        <p className="text-gray-500 text-sm mb-6">{isLogin ? 'Sign in to your account' : 'Start connecting with finance & law professionals — free.'}</p>
        {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-lg mb-4">{success}</div>}
        {!isLogin && <div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Full Name</label><input type="text" placeholder="Your full name" value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>}
        <div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Email</label><input type="email" placeholder="you@firm.com" value={form.email} onChange={e => handleChange('email', e.target.value)} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
        <div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Password</label><input type="password" placeholder="Min 6 characters" value={form.password} onChange={e => handleChange('password', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
        {!isLogin && (<><div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Professional Body</label><select value={form.org} onChange={e => handleChange('org', e.target.value)} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none bg-white focus:border-brand-950"><option value="">Select your discipline</option><option value="CA">CA (Chartered Accountant)</option><option value="CS">CS (Company Secretary)</option><option value="Law">Advocate / Lawyer</option><option value="ICMAI">CMA / ICMAI</option><option value="Valuer">Registered Valuer</option><option value="IP">Insolvency Professional</option><option value="Tax">Tax Consultant</option><option value="Other">Other</option></select></div><div className="mb-4"><label className="block font-semibold text-[13px] mb-1.5">Primary Expertise</label><input type="text" placeholder="e.g. Transfer Pricing, M&A" value={form.expertise} onChange={e => handleChange('expertise', e.target.value)} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div></>)}
        <button className="btn-primary w-full !py-3 !text-[15px] mt-2" onClick={handleSubmit} disabled={loading}>{loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Free Account'}</button>
        <p className="text-center text-sm text-gray-500 mt-4 cursor-pointer" onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}>{isLogin ? "Don't have an account? " : 'Already have an account? '}<span className="text-brand-950 font-semibold">{isLogin ? 'Sign up free' : 'Sign in'}</span></p>
      </div>
    </Modal>
  );
}
