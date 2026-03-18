import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/AuthContext';
import { Avatar, Badge } from '../components/UI';

export default function ProfilePage() {
  const { user, profile, updateProfile, loading } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ full_name: '', title: '', org: '', location: '', bio: '', skills: '' });

  useEffect(() => { if (!loading && !user) router.push('/'); }, [user, loading, router]);

  useEffect(() => {
    if (profile) setForm({ full_name: profile.full_name || '', title: profile.title || '', org: profile.org || '', location: profile.location || '', bio: profile.bio || '', skills: (profile.skills || []).join(', ') });
  }, [profile]);

  const handleSave = async () => {
    setSaving(true); setSuccess('');
    const skillsArray = form.skills.split(',').map(s => s.trim()).filter(Boolean);
    const initials = form.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    await updateProfile({ full_name: form.full_name, title: form.title, org: form.org, location: form.location, bio: form.bio, skills: skillsArray, avatar_initials: initials });
    setSaving(false); setEditing(false); setSuccess('Profile updated!');
    setTimeout(() => setSuccess(''), 3000);
  };

  if (loading || !profile) return <div className="py-20 text-center text-gray-400">Loading...</div>;

  return (
    <div className="py-10 max-w-[600px] mx-auto">
      <h2 className="font-display text-[32px] font-extrabold mb-6">Your Profile</h2>
      {success && <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-lg mb-4">{success}</div>}
      <div className="card p-8">
        <div className="flex gap-4 mb-6">
          <Avatar initials={profile.avatar_initials || 'U'} size={64} org={profile.org || 'CA'} />
          <div>
            <h3 className="font-display font-extrabold text-xl">{profile.full_name || 'Set your name'}</h3>
            <div className="text-gray-500 text-sm">{profile.title || 'Add your title'}</div>
            <div className="flex gap-2 items-center mt-1">
              {profile.org && <Badge org={profile.org} />}
              {profile.location && <span className="text-xs text-gray-400">📍 {profile.location}</span>}
            </div>
          </div>
        </div>
        {editing ? (
          <div className="space-y-4">
            <div><label className="block font-semibold text-[13px] mb-1.5">Full Name</label><input type="text" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
            <div><label className="block font-semibold text-[13px] mb-1.5">Title / Role</label><input type="text" placeholder="e.g. Chartered Accountant" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
            <div><label className="block font-semibold text-[13px] mb-1.5">Professional Body</label><select value={form.org} onChange={e => setForm({...form, org: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none bg-white focus:border-brand-950"><option value="">Select</option><option value="CA">CA</option><option value="CS">CS</option><option value="Law">Law</option><option value="ICMAI">ICMAI</option><option value="Valuer">Valuer</option><option value="IP">IP</option><option value="Tax">Tax</option><option value="Other">Other</option></select></div>
            <div><label className="block font-semibold text-[13px] mb-1.5">Location</label><input type="text" placeholder="e.g. Mumbai" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
            <div><label className="block font-semibold text-[13px] mb-1.5">Bio</label><textarea placeholder="Tell others about your experience..." value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950 resize-none" /></div>
            <div><label className="block font-semibold text-[13px] mb-1.5">Skills (comma separated)</label><input type="text" placeholder="e.g. Tax Advisory, GST, Transfer Pricing" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} className="w-full px-3.5 py-2.5 border border-[#E8E6E1] rounded-lg text-sm outline-none focus:border-brand-950" /></div>
            <div className="flex gap-3 pt-2"><button className="btn-primary flex-1" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button><button className="btn-outline flex-1" onClick={() => setEditing(false)}>Cancel</button></div>
          </div>
        ) : (
          <div>
            {profile.bio && <p className="text-sm text-gray-500 leading-relaxed mb-4">{profile.bio}</p>}
            {profile.skills && profile.skills.length > 0 && <div className="mb-4"><h4 className="font-bold text-sm mb-2">Skills</h4><div className="flex gap-1.5 flex-wrap">{profile.skills.map(s => <span key={s} className="tag !text-[13px] !px-3 !py-1">{s}</span>)}</div></div>}
            <div className="flex gap-3 pt-2"><button className="btn-primary flex-1" onClick={() => setEditing(true)}>Edit Profile</button></div>
          </div>
        )}
      </div>
      <div className="card p-6 mt-4">
        <h4 className="font-bold text-sm mb-2">Account</h4>
        <p className="text-[13px] text-gray-400">{user?.email}</p>
        <p className="text-[13px] text-gray-400 mt-1">Member since {new Date(profile.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
