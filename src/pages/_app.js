import { useState } from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JoinModal from '../components/JoinModal';
import PricingModal from '../components/PricingModal';
import { AuthProvider } from '../components/AuthContext';
import Head from 'next/head';

export default function App(appProps) {
  var Component = appProps.Component;
  var pageProps = appProps.pageProps;
  var _j = useState(false);
  var showJoinModal = _j[0];
  var setShowJoinModal = _j[1];
  var _p = useState(false);
  var showPricingModal = _p[0];
  var setShowPricingModal = _p[1];
  var _l = useState(false);
  var showLoginModal = _l[0];
  var setShowLoginModal = _l[1];

  return (
    <AuthProvider>
      <Head>
        <title>ProNexus — Where Finance and Law Professionals Connect</title>
        <meta name="description" content="India premier AI-powered platform connecting CAs, CSs, Lawyers, Valuers, and Tax Professionals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar
        onJoin={function() { setShowJoinModal(true); }}
        onPricing={function() { setShowPricingModal(true); }}
        onLogin={function() { setShowLoginModal(true); }}
      />
      <main className="max-w-[1200px] mx-auto px-6">
        <Component
          onJoin={function() { setShowJoinModal(true); }}
          onPricing={function() { setShowPricingModal(true); }}
          onLogin={function() { setShowLoginModal(true); }}
        />
      </main>
      <Footer />
      {showJoinModal && (
        <JoinModal
          mode="signup"
          onClose={function() { setShowJoinModal(false); }}
          onSwitch={function() { setShowJoinModal(false); setShowLoginModal(true); }}
        />
      )}
      {showLoginModal && (
        <JoinModal
          mode="login"
          onClose={function() { setShowLoginModal(false); }}
          onSwitch={function() { setShowLoginModal(false); setShowJoinModal(true); }}
        />
      )}
      {showPricingModal && <PricingModal onClose={function() { setShowPricingModal(false); }} />}
    </AuthProvider>
  );
}
