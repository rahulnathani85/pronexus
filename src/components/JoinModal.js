import { useState } from 'react';
import { Modal } from './UI';
import { useAuth } from './AuthContext';

var inputClass = "w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950";
var labelClass = "block font-semibold text-[13px] mb-1.5";

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
    fullName: '',
    email: '',
    password: '',
    org: '',
    expertise: '',
    registrationNumber: ''
  });
  var form = _f[0];
  var setForm = _f[1];

  function upd(field, val) {
    var obj = {};
    obj[field] = val;
    setForm(Object.assign({}, form, obj));
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
      var r = await auth.signIn({
        email: form.email,
        password: form.password
      });
      if (r.error) setError(r.error.message);
      else {
        setSuccess('Logged in!');
        setTimeout(onClose, 500);
      }
    } else {
      if (!form.fullName) {
        setError('Full name is required');
        setLoading(false);
        return;
      }
      var r2 = await auth.signUp({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        org: form.org,
        expertise: form.expertise
      });
      if (r2.error) setError(r2.error.message);
      else {
        setSuccess('Account created!');
        setTimeout(onClose, 1000);
      }
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
          <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-lg mb-4">
            {success}
          </div>
        )}

        {!isLogin && (
          <div className="mb-4">
            <label className={labelClass}>Full Name *</label>
            <input type="text" placeholder="Your full name"
              value={form.fullName}
              onChange={function(e) { upd('fullName', e.target.value); }}
              className={inputClass} />
          </div>
        )}

        <div className="mb-4">
          <label className={labelClass}>Email *</label>
          <input type="email" placeholder="you@firm.com"
            value={form.email}
            onChange={function(e) { upd('email', e.target.value); }}
            className={inputClass} />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Password *</label>
          <input type="password" placeholder="Min 6 characters"
            value={form.password}
            onChange={function(e) { upd('password', e.target.value); }}
            onKeyDown={function(e) {
              if (e.key === 'Enter') handleSubmit();
            }}
            className={inputClass} />
        </div>

        {!isLogin && (
          <div className="mb-4">
            <label className={labelClass}>Professional Body</label>
            <select value={form.org}
              onChange={function(e) { upd('org', e.target.value); }}
              className={inputClass + " bg-white"}>
              <option value="">Select your discipline</option>
              <option value="CA">CA (Chartered Accountant)</option>
              <option value="CS">CS (Company Secretary)</option>
              <option value="Law">Advocate / Lawyer</option>
              <option value="ICMAI">CMA / ICMAI</option>
              <option value="Valuer">Registered Valuer</option>
              <option value="IP">Insolvency Professional</option>
              <option value="Tax">Tax Consultant</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {!isLogin && (
          <div className="mb-4">
            <label className={labelClass}>Registration / Membership No.</label>
            <input type="text"
              placeholder="e.g. ICAI MRN 012345"
              value={form.registrationNumber}
              onChange={function(e) { upd('registrationNumber', e.target.value); }}
              className={inputClass} />
          </div>
        )}

        {!isLogin && (
          <div className="mb-4">
            <label className={labelClass}>Primary Expertise</label>
            <input type="text"
              placeholder="e.g. Transfer Pricing, M&A"
              value={form.expertise}
              onChange={function(e) { upd('expertise', e.target.value); }}
              className={inputClass} />
          </div>
        )}

        <button
          className="btn-primary w-full !py-3 !text-[15px] mt-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Free Account'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4 cursor-pointer"
          onClick={onSwitch}>
          {isLogin ? "No account? " : 'Have an account? '}
          <span className="text-brand-950 font-semibold">
            {isLogin ? 'Sign up free' : 'Sign in'}
          </span>
        </p>
      </div>
    </Modal>
  );
}
