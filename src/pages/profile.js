import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/AuthContext';
import { Badge } from '../components/UI';

export default function ProfilePage() {
  var auth = useAuth();
  var user = auth.user;
  var profile = auth.profile;
  var updateProfile = auth.updateProfile;
  var loading = auth.loading;
  var router = useRouter();

  var _ed = useState(false);
  var editing = _ed[0];
  var setEditing = _ed[1];
  var _sv = useState(false);
  var saving = _sv[0];
  var setSaving = _sv[1];
  var _sc = useState('');
  var success = _sc[0];
  var setSuccess = _sc[1];
  var _f = useState({
    full_name: '', title: '', org: '', location: '', bio: '',
    skills: '', registration_number: '', organization: '',
    role: '', experience_years: 0, education: '',
    languages: '', linkedin_url: '', phone: '',
    specializations: '', certifications: '', photo_url: ''
  });
  var form = _f[0];
  var setForm = _f[1];

  useEffect(function() {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(function() {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        title: profile.title || '',
        org: profile.org || '',
        location: profile.location || '',
        bio: profile.bio || '',
        skills: (profile.skills || []).join(', '),
        registration_number: profile.registration_number || '',
        organization: profile.organization || '',
        role: profile.role || '',
        experience_years: profile.experience_years || 0,
        education: profile.education || '',
        languages: (profile.languages || []).join(', '),
        linkedin_url: profile.linkedin_url || '',
        phone: profile.phone || '',
        specializations: (profile.specializations || []).join(', '),
        certifications: (profile.certifications || []).join(', '),
        photo_url: profile.photo_url || ''
      });
    }
  }, [profile]);

  async function handleSave() {
    setSaving(true);
    setSuccess('');
    var initials = form.full_name.split(' ').map(function(n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
    await updateProfile({
      full_name: form.full_name,
      title: form.title,
      org: form.org,
      location: form.location,
      bio: form.bio,
      skills: form.skills.split(',').map(function(s) { return s.trim(); }).filter(Boolean),
      registration_number: form.registration_number,
      organization: form.organization,
      role: form.role,
      experience_years: parseInt(form.experience_years) || 0,
      education: form.education,
      languages: form.languages.split(',').map(function(s) { return s.trim(); }).filter(Boolean),
      linkedin_url: form.linkedin_url,
      phone: form.phone,
      specializations: form.specializations.split(',').map(function(s) { return s.trim(); }).filter(Boolean),
      certifications: form.certifications.split(',').map(function(s) { return s.trim(); }).filter(Boolean),
      photo_url: form.photo_url,
      avatar_initials: initials
    });
    setSaving(false);
    setEditing(false);
    setSuccess('Profile updated successfully!');
    setTimeout(function() { setSuccess(''); }, 3000);
  }

  function updateField(field, value) {
    setForm(Object.assign({}, form, { [field]: value }));
  }

  if (loading || !profile) {
    return <div className="py-20 text-center text-gray-400">Loading...</div>;
  }

  function renderField(label, value) {
    if (!value || value === '0') return null;
    return (
      <div className="py-3 border-b border-[#E8E6E1] last:border-0">
        <div className="text-[12px] text-gray-400 font-medium uppercase tracking-wider mb-1">{label}</div>
        <div className="text-[14px] text-gray-700">{value}</div>
      </div>
    );
  }

  function renderArrayField(label, arr) {
    if (!arr || arr.length === 0) return null;
    return (
      <div className="py-3 border-b border-[#E8E6E1] last:border-0">
        <div className="text-[12px] text-gray-400 font-medium uppercase tracking-wider mb-2">{label}</div>
        <div className="flex gap-1.5 flex-wrap">
          {arr.map(function(item) {
            return <span key={item} className="tag !text-[13px] !px-3 !py-1">{item}</span>;
          })}
        </div>
      </div>
    );
  }

  function renderInput(label, field, placeholder, type) {
    return (
      <div className="mb-4">
        <label className="block font-semibold text-[13px] mb-1.5">{label}</label>
        <input
          type={type || 'text'}
          placeholder={placeholder}
          value={form[field]}
          onChange={function(e) { updateField(field, e.target.value); }}
          className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950"
        />
      </div>
    );
  }

  return (
    <div className="py-10 max-w-[700px] mx-auto">
      <h2 className="font-display text-[32px] font-extrabold mb-6">Your Profile</h2>

      {success && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-lg mb-4">{success}</div>
      )}

      {editing ? (
        <div>
          {/* Edit Mode */}
          <div className="card p-8 mb-4">
            <h3 className="font-bold text-lg mb-4">Basic Information</h3>

            <div className="mb-4">
              <label className="block font-semibold text-[13px] mb-1.5">Profile Photo URL</label>
              <input type="text" placeholder="https://example.com/your-photo.jpg"
                value={form.photo_url}
                onChange={function(e) { updateField('photo_url', e.target.value); }}
                className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" />
              <p className="text-[11px] text-gray-400 mt-1">Paste a link to your photo (LinkedIn, Google Drive, etc.)</p>
            </div>

            {renderInput('Full Name *', 'full_name', 'Your full name')}

            <div className="grid grid-cols-2 gap-4">
              {renderInput('Professional Title', 'title', 'e.g. Chartered Accountant')}
              <div className="mb-4">
                <label className="block font-semibold text-[13px] mb-1.5">Professional Body</label>
                <select value={form.org}
                  onChange={function(e) { updateField('org', e.target.value); }}
                  className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none bg-white focus:border-brand-950">
                  <option value="">Select</option>
                  <option value="CA">CA</option>
                  <option value="CS">CS</option>
                  <option value="Law">Law</option>
                  <option value="ICMAI">ICMAI</option>
                  <option value="Valuer">Valuer</option>
                  <option value="IP">IP</option>
                  <option value="Tax">Tax</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {renderInput('Registration / Membership Number', 'registration_number', 'e.g. ICAI MRN 012345, BCI Enrolment No.')}
            {renderInput('Location', 'location', 'e.g. Mumbai, Maharashtra')}
            {renderInput('Phone', 'phone', '+91 98765 43210')}
            {renderInput('LinkedIn Profile', 'linkedin_url', 'https://linkedin.com/in/yourprofile')}
          </div>

          <div className="card p-8 mb-4">
            <h3 className="font-bold text-lg mb-4">Professional Details</h3>

            {renderInput('Current Organization / Firm', 'organization', 'e.g. Deloitte India, Own Practice')}
            {renderInput('Current Role / Designation', 'role', 'e.g. Senior Partner, Manager')}
            {renderInput('Years of Experience', 'experience_years', 'e.g. 12', 'number')}
            {renderInput('Education', 'education', 'e.g. B.Com, CA, LLB from Mumbai University')}

            <div className="mb-4">
              <label className="block font-semibold text-[13px] mb-1.5">About / Bio</label>
              <textarea placeholder="Describe your professional journey, expertise, and what you bring to the table..."
                value={form.bio}
                onChange={function(e) { updateField('bio', e.target.value); }}
                rows={4}
                className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950 resize-none" />
            </div>
          </div>

          <div className="card p-8 mb-4">
            <h3 className="font-bold text-lg mb-4">Skills & Expertise</h3>
            <p className="text-[12px] text-gray-400 mb-3">Separate multiple items with commas</p>

            {renderInput('Core Skills', 'skills', 'e.g. Tax Advisory, GST, Transfer Pricing, Audit')}
            {renderInput('Specializations', 'specializations', 'e.g. International Tax, Cross-border M&A, FEMA')}
            {renderInput('Certifications', 'certifications', 'e.g. DISA, CISA, CFA, FEMA Certified')}
            {renderInput('Languages', 'languages', 'e.g. English, Hindi, Marathi, Gujarati')}
          </div>

          <div className="flex gap-3">
            <button className="btn-primary flex-1 !py-3" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
            <button className="btn-outline flex-1 !py-3" onClick={function() { setEditing(false); }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* View Mode */}
          <div className="card p-8 mb-4">
            <div className="flex gap-5 mb-6">
              {form.photo_url ? (
                <img src={form.photo_url} alt={profile.full_name}
                  className="w-[80px] h-[80px] rounded-full object-cover border-2 border-[#E8E6E1]" />
              ) : (
                <div className="w-[80px] h-[80px] rounded-full bg-brand-950 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                  {profile.avatar_initials || 'U'}
                </div>
              )}
              <div>
                <h3 className="font-display font-extrabold text-2xl">{profile.full_name || 'Set your name'}</h3>
                <div className="text-gray-500 mt-0.5">{profile.title || 'Add your professional title'}</div>
                <div className="flex gap-2 items-center mt-2 flex-wrap">
                  {profile.org && <Badge org={profile.org} />}
                  {profile.location && <span className="text-[13px] text-gray-400">📍 {profile.location}</span>}
                  {profile.verified && <span className="text-[13px] text-green-700 font-semibold">✓ Verified</span>}
                </div>
                {profile.registration_number && (
                  <div className="text-[13px] text-gray-500 mt-2">
                    Reg. No: <span className="font-semibold">{profile.registration_number}</span>
                  </div>
                )}
              </div>
            </div>

            {profile.bio && (
              <div className="mb-4 pb-4 border-b border-[#E8E6E1]">
                <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {renderField('Current Organization', profile.organization)}
            {renderField('Role / Designation', profile.role)}
            {renderField('Experience', profile.experience_years ? profile.experience_years + ' years' : null)}
            {renderField('Education', profile.education)}
            {renderField('Phone', profile.phone)}
            {renderField('LinkedIn', profile.linkedin_url)}
            {renderArrayField('Skills', profile.skills)}
            {renderArrayField('Specializations', profile.specializations)}
            {renderArrayField('Certifications', profile.certifications)}
            {renderArrayField('Languages', profile.languages)}

            <div className="flex gap-3 pt-4 mt-2">
              <button className="btn-primary flex-1" onClick={function() { setEditing(true); }}>
                Edit Profile
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h4 className="font-bold text-sm mb-2">Account Details</h4>
            <p className="text-[13px] text-gray-400">{user ? user.email : ''}</p>
            <p className="text-[13px] text-gray-400 mt-1">
              Member since {new Date(profile.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
