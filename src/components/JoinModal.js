import { useState } from 'react';
import { Modal } from './UI';
import { useAuth } from './AuthContext';

export default function JoinModal(props) {
  var onClose = props.onClose;
  var onSwitch = props.onSwitch;
  var isLogin = props.mode === 'login';
  var auth = useAuth();

  var _l = useState(false);
  var loading = _l[0];
  var setLoading = _l[1];
  var _e = useState('');
  var error = _e[0];
  var setError = _e[1];
  var _s = useState('');
  var success = _s[0];
  var setSuccess = _s[1];
  var _f = useState({
    fullName: '', email: '', password: '',
    org: '', expertise: '', registrationNumber: ''
  });
  var form = _f[0];
  var setForm = _f[1];

  function handleChange(field, value) {
    setForm(Object.assign({}, form, { [field]: value }));
  }

  async function handleSubmit() {
    setError('');
    setSuccess('');
    setLoading(true);

    if (!form.email || !form.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    if (isLogin) {
      var loginResp = await auth.signIn({
        email: form.email,
        password: form.password
      });
      if (loginResp.error) { setError(loginResp.error.message); }
      else { setSuccess('Logged in!'); setTimeout(onClose, 500); }
    } else {
      if (!form.fullName) {
        setError('Full name is required');
        setLoading(false);
        return;
      }
      var signupResp = await auth.signUp({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        org: form.org,
        expertise: form.expertise
      });
      if (signupResp.error) { setError(signupResp.error.message); }
      else { setSuccess('Account created!'); setTimeout(onClose, 1000); }
    }
    setLoading(false);
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-8">
        <h3 className="font-display text-2xl font-extrabold mb-1">
          {isLogin ? 'Welcome back' : 'Join ProNexus'}
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          {isLogin ? 'Sign in to your account' : 'Create your free professional account'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-lg mb-4">{success}</div>
        )}

        {!isLogin && (
          <div className="mb-4">
            <label className="block font-semibold text-[13px] mb-1.5">Full Name *</label>
            <input type="text" placeholder="Your full name"
              value={form.fullName}
              onChange={function(e) { handleChange('fullName', e.target.value); }}
              className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
          </div>
        )}

        <div className="mb-4">
          <label className="block font-semibold text-[13px] mb-1.5">Email *</label>
          <input type="email" placeholder="you@firm.com"
            value={form.email}
            onChange={function(e) { handleChange('email', e.target.value); }}
            className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-[13px] mb-1.5">Password *</label>
          <input type="password" placeholder="Min 6 characters"
            value={form.password}
            onChange={function(e) { handleChange('password', e.target.value); }}
            onKeyDown={function(e) { if (e.key === 'Enter') handleSubmit(); }}
            className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
        </div>

        {!isLogin && (
          <>
            <div className="mb-4">
              <label className="block font-semibold text-[13px] mb-1.5">Professional Body</label>
              <select value={form.org}
                onChange={function(e) { handleChange('org', e.target.value); }}
                className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none bg-white focus:border-brand-950">
                <option value="">Select your discipline</option>
                <option value="CA">CA (Chartered Accountant)</option>
                <option value="CS">CS (Company Secretary)</option>
                <option value="Law">Advocate / Lawyer</option>
                <option value="ICMAI">CMA / ICMAI (Cost Accountant)</option>
                <option value="Valuer">Registered Valuer</option>
                <option value="IP">Insolvency Professional</option>
                <option value="Tax">Tax Consultant</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-[13px] mb-1.5">Registration / Membership No.</label>
              <input type="text" placeholder="e.g. ICAI MRN 012345"
                value={form.registrationNumber}
                onChange={function(e) { handleChange('registrationNumber', e.target.value); }}
                className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm
