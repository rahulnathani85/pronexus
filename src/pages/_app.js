import { useState } from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JoinModal from '../components/JoinModal';
import PricingModal from '../components/PricingModal';
import { AuthProvider } from '../components/AuthContext';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  return (
    <AuthProvider>
      <Head>
        <title>ProNexus — Where Finance and Law Professionals Connect</title>
        <meta name="description" content="India's premier AI-powered platform connecting Chartered Accountants, Company Secretaries, Lawyers, Valuers, Cost Accountants, and Tax Professionals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar onJoin={() => setShowJoinModal(true)} onPricing={() => setShowPricingModal(true)} />
      <main className="max-w-[1200px] mx-auto px-6">
        <Component {...pageProps} onJoin={() => setShowJoinModal(true)} onPricing={() => setShowPricingModal(true)} />
      </main>
      <Footer />
      {showJoinModal && <JoinModal onClose={() => setShowJoinModal(false)} />}
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
    </AuthProvider>
  );
}
