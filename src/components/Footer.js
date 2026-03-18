import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E6E1] mt-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex justify-between flex-wrap gap-8">
          <div className="max-w-[280px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-brand-950 flex items-center justify-center">
                <span className="text-white font-black text-sm font-display">P</span>
              </div>
              <span className="font-display font-extrabold text-lg text-brand-950">ProNexus</span>
            </div>
            <p className="text-[13px] text-gray-400 leading-relaxed">India&apos;s premier platform connecting CAs, CSs, Lawyers, Valuers, and finance professionals through AI-powered matching.</p>
          </div>
          <div>
            <div className="font-bold text-sm mb-3">Platform</div>
            {["Home", "Discover", "Community", "Events"].map(l => (<Link key={l} href={l === "Home" ? "/" : "/" + l.toLowerCase()} className="block text-[13px] text-gray-400 py-1 no-underline hover:text-gray-700">{l}</Link>))}
          </div>
          <div>
            <div className="font-bold text-sm mb-3">Disciplines</div>
            {["CA", "CS", "Lawyers", "ICMAI", "Valuers", "IP"].map(l => (<div key={l} className="text-[13px] text-gray-400 py-1 cursor-pointer hover:text-gray-700">{l}</div>))}
          </div>
          <div>
            <div className="font-bold text-sm mb-3">Company</div>
            {["About", "Blog", "Careers", "Contact", "Privacy Policy"].map(l => (<div key={l} className="text-[13px] text-gray-400 py-1 cursor-pointer hover:text-gray-700">{l}</div>))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#E8E6E1] text-center text-xs text-gray-400">© 2026 ProNexus. All rights reserved.</div>
      </div>
    </footer>
  );
}
