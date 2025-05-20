
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
    // Observer pour les animations au scroll
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

    // Observer tous les éléments avec la classe reveal
    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <Layout showBreadcrumb={false}>
      <HeroSection />
      <GainDeTempsSection />
      <SolutionCards />
      <AIAssistantSection />
      <ModulesSection />
      <CTASection />
      <ChatbotHint />
    </Layout>
  );
};

export default Home;
