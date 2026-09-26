import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import DiscountBanner from './components/DiscountBanner.jsx';
import Hero from './components/Hero.jsx';
import Courses from './components/Courses.jsx';
import FeatureCards from './components/FeatureCards.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import DiscountChallengeModal from './components/DiscountChallengeModal.jsx';
import MembershipPlans from './components/Membership.jsx';
import CodeShowcase from './components/CodeShowCase.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import PremiumQuestions from './components/PremiumQuestions.jsx';
import MentorCard, {mentor} from './components/Mentors.jsx'
import Reviews from './components/ReviewSection.jsx';
import { DiscountAPI } from './api/discountApi.js';
import StrikeRevealBackground from './components/StrikeRevealBackground.jsx';
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
      
     
     <StrikeRevealBackground>
      <DiscountBanner onOpen={() => setModalOpen(true)} status={bannerStatus} />
      <Hero />
      <CodeShowcase />
      </StrikeRevealBackground>

      <MembershipPlans/>
      <Courses />
      <FeatureCards />
      <PremiumQuestions/>
       <section className="flex flex-wrap justify-center gap-8 px-6 py-16">
        {mentor.map((m) => (
          <MentorCard key={m.id} mentor={m} />
        ))}
      </section>
        <Reviews/>
      <FAQ />
      <Footer />

      <DiscountChallengeModal open={modalOpen} onClose={handleModalClose} />
    </div>
  );
}