import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';

var NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/discover', label: 'Discover' },
  { href: '/feed', label: 'Feed' },
  { href: '/community', label: 'Community' },
  { href: '/events', label: 'Events' },
];

export default function Navbar(props) {
  var router = useRouter();
  var auth = useAuth();
  var user = auth.user;
  var profile = auth.profile;
  var signOut = auth.signOut;

  function handleLogout() {
    signOut();
    router.push('/');
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8E6E1] px-6"
      style={{ background: 'rgba(250,250,247,0.92)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16">

        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 rounded-lg bg-brand-950 flex items-center justify-center">
            <span className="text-white font-black text-lg font-display">P</span>
          </div>
          <span className="font-display font-extrabold text-[22px] text-brand-950 tracking-tight">
            ProNexus
          </span>
        </Link>

        <div className="flex gap-1 items-center overflow-x-auto">
          {NAV_ITEMS.map(function(item) {
            var isActive = router.pathname === item.href;
            var cls = isActive
              ? 'bg-brand-950 text-white'
              : 'text-gray-500 hover:bg-[#F4F3EF] hover:text-gray-900';
            return (
              <Link key={item.href} href={item.href}
                className={'px-4 py-2 rounded-lg text-sm font-medium no-underline whitespace-nowrap ' + cls}>
                {item.label}
              </Link>
            );
          })}
          {user && (
            <Link href="/messages"
              className={'px-4 py-2 rounded-lg text-sm font-medium no-underline whitespace-nowrap ' + (router.pathname === '/messages' ? 'bg-brand-950 text-white' : 'text-gray-500 hover:bg-[#F4F3EF] hover:text-gray-900')}>
              Messages
            </Link>
          )}
        </div>

        <div className="flex gap-2 items-center">
          {user ? (
            <>
              <Link href="/profile" className="no-underline flex items-center gap-2">
                <div className="w-[34px] h-[34px] rounded-full bg-brand-950 flex items-center justify-center text-white text-xs font-bold">
                  {profile ? profile.avatar_initials || 'U' : 'U'}
                </div>
              </Link>
              <button
                className="bg-transparent text-red-600 border border-red-200 py-1.5 px-4 text-[13px] rounded-lg font-semibold cursor-pointer hover:bg-red-50"
                onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-transparent text-brand-950 border-none py-1.5 px-4 text-[13px] font-semibold cursor-pointer hover:bg-[#F4F3EF] rounded-lg"
                onClick={function() { props.onLogin(); }}>
                Log in
              </button>
              <button className="btn-outline !py-1.5 !px-4 !text-[13px]"
                onClick={props.onPricing}>
                Pricing
              </button>
              <button className="btn-primary !py-1.5 !px-5 !text-[13px]"
                onClick={props.onJoin}>
                Join Free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
