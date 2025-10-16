
import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import Chatbot from '../chatbot/Chatbot';
import { ThemeConfigurator } from '@/components/theme/ThemeConfigurator';

interface LayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
  useDarkTheme?: boolean;
}

const Layout = ({ children, showBreadcrumb = true, useDarkTheme = false }: LayoutProps) => {
  // Scroll revelation effect
  useEffect(() => {
    // Only add dark theme class if it's explicitly requested (for specialized editor components)
    if (useDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
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
    
    return () => {
      window.removeEventListener('scroll', revealElements);
      // Remove dark theme class when component unmounts if it was added
      document.body.classList.remove('dark-theme');
    }
  }, [useDarkTheme]);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow pt-24 md:pt-28">
        <div className="container-large mx-auto">
          {showBreadcrumb && <Breadcrumb />}
          {children}
        </div>
      </main>
      <Footer />
      <Chatbot />
      <ThemeConfigurator />
    </div>
  );
};

export default Layout;
