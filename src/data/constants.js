  export const PROFESSIONALS = [
  { id: 1, name: "Priya Mehta", title: "Chartered Accountant", org: "CA", location: "Mumbai", skills: ["Tax Advisory", "Audit", "GST Compliance", "Transfer Pricing"], bio: "15+ years in tax advisory and statutory audit for multinational corporations.", avatar: "PM", rating: 4.9, projects: 84, available: true, verified: true },
  { id: 2, name: "Arjun Desai", title: "Company Secretary", org: "CS", location: "Delhi", skills: ["Corporate Governance", "FEMA", "Board Compliance", "Due Diligence"], bio: "Specialist in corporate restructuring and cross-border compliance.", avatar: "AD", rating: 4.8, projects: 62, available: true, verified: true },
  { id: 3, name: "Kavita Sharma", title: "Advocate", org: "Law", location: "Bangalore", skills: ["Tax Litigation", "RERA", "Corporate Law", "M&A"], bio: "High Court advocate with expertise in direct tax disputes and M&A transactions.", avatar: "KS", rating: 4.7, projects: 91, available: false, verified: true },
  { id: 4, name: "Rajesh Iyer", title: "Cost Accountant", org: "ICMAI", location: "Chennai", skills: ["Cost Audit", "Management Accounting", "Budgeting", "Variance Analysis"], bio: "Cost optimization specialist for manufacturing and infrastructure sectors.", avatar: "RI", rating: 4.6, projects: 53, available: true, verified: true },
  { id: 5, name: "Sneha Gupta", title: "Registered Valuer", org: "Valuer", location: "Pune", skills: ["Business Valuation", "Intangible Assets", "Fair Value", "ESOP Valuation"], bio: "IBBI registered valuer for securities and financial assets.", avatar: "SG", rating: 4.9, projects: 47, available: true, verified: true },
  { id: 6, name: "Mohit Jain", title: "Tax Consultant", org: "CA", location: "Hyderabad", skills: ["International Tax", "Transfer Pricing", "DTAA", "BEPS"], bio: "Cross-border tax structuring for tech companies and startups.", avatar: "MJ", rating: 4.8, projects: 71, available: true, verified: true },
  { id: 7, name: "Ananya Pillai", title: "Insolvency Professional", org: "IP", location: "Mumbai", skills: ["IBC", "CIRP", "Liquidation", "Resolution Plans"], bio: "IBBI registered IP handling complex insolvency cases.", avatar: "AP", rating: 4.5, projects: 38, available: false, verified: true },
  { id: 8, name: "Vikram Singh", title: "Forensic Auditor", org: "CA", location: "Delhi", skills: ["Fraud Investigation", "Digital Forensics", "Benford's Law", "Whistleblower"], bio: "Fraud investigation and forensic audit for banking and NBFC sector.", avatar: "VS", rating: 4.7, projects: 29, available: true, verified: true },
];

export const POSTS = [
  { id: 1, author: "Priya Mehta", org: "CA", avatar: "PM", type: "article", title: "New TDS Provisions Under Finance Act 2026", excerpt: "Key changes in TDS rates and compliance requirements that every professional should be aware of for the upcoming assessment year...", likes: 142, comments: 38, time: "2h ago", tags: ["Tax", "TDS", "Finance Act"] },
  { id: 2, author: "Arjun Desai", org: "CS", avatar: "AD", type: "requirement", title: "Looking for CA with Transfer Pricing Expertise", excerpt: "Need a Chartered Accountant specializing in transfer pricing for a cross-border restructuring project. Duration: 3 months.", likes: 67, comments: 24, time: "4h ago", tags: ["Transfer Pricing", "Cross-border", "Hiring"] },
  { id: 3, author: "Kavita Sharma", org: "Law", avatar: "KS", type: "event", title: "Webinar: FEMA Compliance for Outbound Investments", excerpt: "Join us for a 90-minute deep dive into FEMA regulations governing outbound investments by Indian corporates.", likes: 203, comments: 56, time: "6h ago", tags: ["FEMA", "Webinar", "Investments"] },
  { id: 4, author: "Sneha Gupta", org: "Valuer", avatar: "SG", type: "article", title: "Valuation Challenges in the AI/ML Startup Ecosystem", excerpt: "How traditional DCF models need adaptation when valuing AI-first companies with non-linear growth trajectories.", likes: 189, comments: 44, time: "1d ago", tags: ["Valuation", "Startups", "AI"] },
  { id: 5, author: "Mohit Jain", org: "CA", avatar: "MJ", type: "requirement", title: "CS Required for NBFC License Application", excerpt: "Seeking a Company Secretary to assist with RBI license application for a new NBFC.", likes: 45, comments: 18, time: "1d ago", tags: ["NBFC", "RBI", "Licensing"] },
];

export const CHATS = [
  { id: 1, name: "Tax Professionals Hub", members: 2840, lastMsg: "Does anyone have clarity on the new equalization levy applicability?", time: "2m ago", unread: 5 },
  { id: 2, name: "Cross-Border Transactions", members: 1256, lastMsg: "DTAA benefits for Singapore SPVs — recent AAR ruling", time: "15m ago", unread: 2 },
  { id: 3, name: "Valuation & M&A Circle", members: 987, lastMsg: "Fair value under Ind AS 113 vs IBC waterfall", time: "1h ago", unread: 0 },
  { id: 4, name: "GST Practitioners", members: 4120, lastMsg: "ITC reversal under Rule 42 — calculation template shared", time: "3h ago", unread: 12 },
];

export const EVENTS = [
  { id: 1, title: "Annual Tax Conclave 2026", date: "Apr 12-13", location: "Mumbai", type: "Conference", attendees: 450 },
  { id: 2, title: "FEMA Master Class", date: "Mar 28", location: "Virtual", type: "Workshop", attendees: 280 },
  { id: 3, title: "Valuation Standards Update", date: "Apr 5", location: "Delhi", type: "Seminar", attendees: 150 },
];

export const EVENTS_FULL = [
  { title: "Annual Tax Conclave 2026", date: "April 12-13, 2026", loc: "Grand Hyatt, Mumbai", type: "Conference", desc: "India's largest gathering of tax professionals. 40+ sessions, 80+ speakers.", attendees: 450, price: "Free for members", color: "bg-brand-950" },
  { title: "FEMA Master Class", date: "March 28, 2026", loc: "Virtual (Zoom)", type: "Workshop", desc: "Deep dive into FEMA regulations for outbound investments and LRS compliance.", attendees: 280, price: "Free", color: "bg-emerald-800" },
  { title: "Valuation Standards Update 2026", date: "April 5, 2026", loc: "IHC, Delhi", type: "Seminar", desc: "Latest ICAI valuation standards and IBBI updates.", attendees: 150, price: "Rs.500", color: "bg-purple-900" },
  { title: "AI in Audit & Compliance", date: "April 20, 2026", loc: "Virtual", type: "Webinar", desc: "How AI tools are transforming audit methodologies and compliance monitoring.", attendees: 380, price: "Free", color: "bg-brand-950" },
  { title: "Cross-Border Tax Structuring", date: "May 3, 2026", loc: "Taj Lands End, Mumbai", type: "Workshop", desc: "Practical workshop on international tax structuring and treaty shopping.", attendees: 120, price: "Rs.1,500", color: "bg-emerald-800" },
  { title: "IBC & Insolvency Masterclass", date: "May 15, 2026", loc: "Virtual", type: "Workshop", desc: "CIRP process, CoC decision-making, and recent NCLAT judgments.", attendees: 200, price: "Free for members", color: "bg-purple-900" },
];

export const DISCIPLINES = [
  { name: "Chartered Accountants", org: "CA", count: "4,200+", icon: "📊" },
  { name: "Company Secretaries", org: "CS", count: "2,100+", icon: "📋" },
  { name: "Advocates & Lawyers", org: "Law", count: "1,800+", icon: "⚖️" },
  { name: "Cost Accountants", org: "ICMAI", count: "1,400+", icon: "💰" },
  { name: "Registered Valuers", org: "Valuer", count: "890+", icon: "🏛️" },
  { name: "Insolvency Professionals", org: "IP", count: "560+", icon: "📑" },
  { name: "Tax Consultants", org: "Tax", count: "1,450+", icon: "🧾" },
];

export const ORG_COLORS = {
  CA: { bg: "#0D3B66", text: "#fff" },
  CS: { bg: "#1B4332", text: "#fff" },
  Law: { bg: "#6B2737", text: "#fff" },
  ICMAI: { bg: "#5A3E1B", text: "#fff" },
  Valuer: { bg: "#3C1874", text: "#fff" },
  IP: { bg: "#1A3A5C", text: "#fff" },
  Tax: { bg: "#8B2500", text: "#fff" },
};

export const CHAT_MESSAGES = [
  { from: "Mohit Jain", msg: "Has anyone dealt with the new equalization levy on digital services?", time: "10:32 AM" },
  { from: "Priya Mehta", msg: "Yes — we had a client affected last quarter. The key issue is determining PE threshold.", time: "10:34 AM" },
  { from: "Kavita Sharma", msg: "From a litigation perspective, the ambiguity in Section 165A is problematic.", time: "10:38 AM" },
  { from: "Arjun Desai", msg: "I can share a compliance checklist we prepared. Let me post it in the resources section.", time: "10:40 AM" },
];
