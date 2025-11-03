import { ArrowRight, Shield, Sparkles, FileCheck, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const HeroSection = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearchClick = () => {
    // Ouvrir le chatbot
    document.querySelector('button[aria-label="Ouvrir le chat"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
  };

  return (
    <section className="section-hero hero-gradient hero-pattern relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container-large mx-auto relative z-10">
        <div className="text-center max-w-5xl mx-auto reveal">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Génération automatique avec IA</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Gérez la <span className="text-primary">sécurité incendie</span> de vos établissements
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Générez, modifiez et déployez des documents de sécurité professionnels conformes à la réglementation en quelques minutes
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div 
              className={`relative group transition-all duration-300 ${
                searchFocused ? 'scale-[1.02]' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="flex items-center">
                  <Search className="absolute left-6 w-6 h-6 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Comment SecuGenie peut vous aider aujourd'hui ?"
                    className="w-full pl-16 pr-20 py-6 text-lg bg-transparent border-none outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
                    onFocus={() => {
                      setSearchFocused(true);
                      handleSearchClick();
                    }}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <button
                    onClick={handleSearchClick}
                    className="absolute right-3 bg-primary hover:bg-primary-hover text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                  >
                    <span className="hidden sm:inline">Rechercher</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick tags */}
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Link
                to="/documents/notice-securite/creer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-border rounded-full text-sm font-medium text-foreground transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <FileCheck className="w-4 h-4 text-secondary" />
                Notices de Sécurité
              </Link>
              <Link
                to="/documents/plan-prevention/creer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-border rounded-full text-sm font-medium text-foreground transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <Shield className="w-4 h-4 text-primary" />
                Plans de Prévention
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-border rounded-full text-sm font-medium text-foreground transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <Users className="w-4 h-4 text-secondary" />
                Dossiers GN6
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 reveal-stagger">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-auto"
            >
              <Link to="/demo" className="inline-flex items-center gap-2">
                Démarrer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-border bg-white hover:bg-muted text-foreground px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:border-primary/50 h-auto"
            >
              <Link to="/solutions">
                Voir nos solutions
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            ✓ Aucune carte bancaire requise • ✓ Essai gratuit • ✓ Conformité garantie
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto reveal-stagger">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 icon-hover">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Interface intuitive</h3>
            <p className="text-sm text-muted-foreground">Simple et rapide</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4 icon-hover">
              <FileCheck className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Documents conformes</h3>
            <p className="text-sm text-muted-foreground">100% réglementaire</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 icon-hover">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Génération IA</h3>
            <p className="text-sm text-muted-foreground">Assisté par IA</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4 icon-hover">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Support 7j/7</h3>
            <p className="text-sm text-muted-foreground">Toujours disponible</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
