
import { ArrowRight, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 px-4 text-center bg-white">
      <div className="container-medium mx-auto">
        <div className="mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-textPrincipal">
            Gérez la <span className="text-accent">sécurité incendie</span> de vos établissements
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-textPrincipal/70 leading-relaxed">
            Générez, modifiez et déployez des documents de sécurité professionnels en quelques minutes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Link to="/demo" className="inline-flex items-center">
                Démarrer gratuitement
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-200 text-textPrincipal hover:bg-secondary hover:border-gray-300 px-8 py-6 text-lg font-medium rounded-lg transition-all"
            >
              <Link to="/solutions" className="inline-flex items-center">
                Voir nos solutions
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-gradient-to-b from-secondary to-white rounded-2xl p-6 mb-10 max-w-3xl mx-auto shadow-sm">
          <div className="relative">
            <button 
              onClick={() => {
                document.querySelector('button[aria-label="Ouvrir le chat"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}
              className="w-full text-left p-5 bg-white rounded-xl text-gray-500 cursor-text transition-colors hover:bg-white/95 border border-gray-200 shadow-sm"
            >
              Comment SecuGenie peut vous aider aujourd'hui?
            </button>
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-gray-500 mb-8 font-medium">
          ou explorer par document
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link
            to="/documents/notice-securite/creer"
            className="bg-secondary hover:bg-secondary-hover text-textPrincipal px-5 py-3 rounded-full font-medium transition-all text-sm"
          >
            Notice de Sécurité
          </Link>
          <Link
            to="/documents/plan-prevention/creer"
            className="bg-secondary hover:bg-secondary-hover text-textPrincipal px-5 py-3 rounded-full font-medium transition-all text-sm"
          >
            Plan de Prévention
          </Link>
          <Link
            to="/demo"
            className="bg-secondary hover:bg-secondary-hover text-textPrincipal px-5 py-3 rounded-full font-medium transition-all text-sm"
          >
            Dossier GN6
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 mt-12 text-textPrincipal/40">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-accent mr-2" />
            <span className="text-sm">Interface intuitive</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-accent mr-2" />
            <span className="text-sm">Documents conformes à la réglementation</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-accent mr-2" />
            <span className="text-sm">Génération IA</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-accent mr-2" />
            <span className="text-sm">Support 7j/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
