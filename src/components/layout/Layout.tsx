
import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import Chatbot from '../chatbot/Chatbot';

interface LayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

const Layout = ({ children, showBreadcrumb = true }: LayoutProps) => {
  // Scroll revelation effect
  useEffect(() => {
    const revealElements = () => {
      const elements = document.querySelectorAll('.reveal');
      
      elements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', revealElements);
    
    // Initial check
    revealElements();
    
    return () => window.removeEventListener('scroll', revealElements);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 md:px-6">
          {showBreadcrumb && <Breadcrumb />}
          {children}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Layout;
