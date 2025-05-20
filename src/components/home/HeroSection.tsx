
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="py-32 px-4 text-center bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Shield className="h-8 w-8 text-blue-500 mr-3" aria-hidden="true" />
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-black">Secu<span className="text-blue-500">Genie</span></span>
          </h1>
        </div>
        
        <h2 className="text-xl md:text-2xl mb-10 text-gray-600 leading-snug">
          Générez, modifiez et déployez des documents de sécurité professionnels <span className="text-blue-500">en quelques minutes</span>
        </h2>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-10 max-w-2xl mx-auto border border-gray-200">
          <div className="relative">
            <button 
              onClick={() => {
                document.querySelector('button[aria-label="Ouvrir le chat"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}
              className="w-full text-left p-4 bg-white rounded-lg text-gray-500 cursor-text transition-colors hover:bg-white/80 border border-gray-200"
            >
              Comment SecuGenie peut vous aider aujourd'hui?
            </button>
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-gray-500 mb-8">
          ou commencez avec
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link
            to="/demo"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-full font-medium transition-all text-sm"
          >
            Dossier GN6
          </Link>
          <Link
            to="/demo"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-full font-medium transition-all text-sm"
          >
            Plan de Prévention
          </Link>
          <Link
            to="/demo"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-full font-medium transition-all text-sm"
          >
            Notice de Sécurité
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
