import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import DiscountBanner from './components/DiscountBanner.jsx';
import Hero from './components/Hero.jsx';
import Courses from './components/Courses.jsx';
import FeatureCards from './components/FeatureCards.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import DiscountChallengeModal from './components/DiscountChallengeModal.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import { DiscountAPI } from './api/discountApi.js';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bannerStatus, setBannerStatus] = useState(null); // null = still loading

  const refreshStatus = useCallback(() => {
    DiscountAPI.getStatus().then(setBannerStatus);
  }, []);

  
  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  function handleModalClose() {
    setModalOpen(false);
    refreshStatus();
  }

  return (
    <div className="min-h-screen">
      <CursorGlow />
      <Navbar />
      <DiscountBanner onOpen={() => setModalOpen(true)} status={bannerStatus} />
      <Hero />
      <Courses />
      <FeatureCards />
      <FAQ />
      <Footer />

      <DiscountChallengeModal open={modalOpen} onClose={handleModalClose} />
    </div>
  );
}