
import { useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import SolutionCards from '@/components/home/SolutionCards';
import GainDeTempsSection from '@/components/home/GainDeTempsSection';
import FeatureBlock from '@/components/home/FeatureBlock';
import AIAssistantSection from '@/components/home/AIAssistantSection';
import ModulesSection from '@/components/home/ModulesSection';
import CTASection from '@/components/home/CTASection';
import ChatbotHint from '@/components/home/ChatbotHint';

const Home = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Add dark theme class to body
    document.body.classList.add('dark-theme');
    
    // Initialize the observer to add reveal animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
      // Remove dark theme class when component unmounts
      document.body.classList.remove('dark-theme');
    };
  }, []);

  return (
    <Layout showBreadcrumb={false}>
      <HeroSection />
      <SolutionCards />
      <GainDeTempsSection />
      <FeatureBlock />
      <AIAssistantSection />
      <ModulesSection />
      <CTASection />
      <ChatbotHint />
    </Layout>
  );
};

export default Home;
