import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import DiscountBanner from './components/DiscountBanner.jsx';
import Hero from './components/Hero.jsx';
import Courses from './components/Courses.jsx';
import FeatureCards from './components/FeatureCards.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import DiscountChallengeModal from './components/DiscountChallengeModal.jsx';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <DiscountBanner onOpen={() => setModalOpen(true)} />
      <Hero />
      <Courses />
      <FeatureCards />
      <FAQ />
      <Footer />

      <DiscountChallengeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
