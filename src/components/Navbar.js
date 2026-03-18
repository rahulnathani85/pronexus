import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/discover', label: 'Discover' },
  { href: '/feed', label: 'Feed' },
  { href: '/community', label: 'Community' },
  { href: '/events', label: 'Events' },
];

export default function Navbar({ onJoin, onPricing }) {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8E6E1] px-6" style={{ background: 'rgba(250,250,247,0.92)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 rounded-lg bg-brand-950 flex items-center justify-center">
            <span className="text-white font-black text-lg font-display">P</span>
          </div>
          <span className="font-display font-extrabold text-[22px] text-brand-950 tracking-tight">ProNexus</span>
        </Link>
        <div className="flex gap-1 items-center overflow-x-auto">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link key={href} href={href} className={"px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline whitespace-nowrap " + (router.pathname === href ? 'bg-brand-950 text-white' : 'text-gray-500 hover:bg-[#F4F3EF] hover:text-gray-900')}>{label}</Link>
          ))}
        </div>
        <div className="flex gap-2.5 items-center">
          <button className="btn-outline !py-1.5 !px-4 !text-[13px]" onClick={onPricing}>Pricing</button>
          <button className="btn-primary !py-1.5 !px-5 !text-[13px]" onClick={onJoin}>Join Free</button>
        </div>
      </div>
    </nav>
  );
}
