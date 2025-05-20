
import { Clock } from 'lucide-react';
import { RelumeCard } from '../ui/relume-card';

const GainDeTempsSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-white border-y border-[#EAEAEA]">
      <div className="container mx-auto px-4 relative z-10">
        {/* Texte en arrière-plan léger */}
        <h2 className="text-[120px] md:text-[180px] font-bold text-[#F9F9F9] absolute -top-10 md:-top-20 left-0 w-full text-center pointer-events-none">
          secugenie
        </h2>
        
        <div className="text-center relative z-20 mb-16">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-accent mr-3" aria-hidden="true" />
            <h3 className="text-3xl md:text-4xl font-bold text-primary">
              Gain de temps <span className="text-accent">remarquable</span>
            </h3>
          </div>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto leading-relaxed">
            Réduisez de 80% le temps passé à créer vos documents de sécurité
          </p>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RelumeCard className="text-center" hover={true}>
            <div className="text-4xl font-bold text-accent mb-2">80%</div>
            <h4 className="text-lg font-medium text-primary mb-2">Gain de temps</h4>
            <p className="text-primary/70">Réduction drastique du temps de création des documents</p>
          </RelumeCard>
          
          <RelumeCard className="text-center" hover={true}>
            <div className="text-4xl font-bold text-accent mb-2">100%</div>
            <h4 className="text-lg font-medium text-primary mb-2">Conforme</h4>
            <p className="text-primary/70">Conformité avec la réglementation en vigueur</p>
          </RelumeCard>
          
          <RelumeCard className="text-center" hover={true}>
            <div className="text-4xl font-bold text-accent mb-2">24/7</div>
            <h4 className="text-lg font-medium text-primary mb-2">Disponible</h4>
            <p className="text-primary/70">Assistance IA disponible à tout moment</p>
          </RelumeCard>
        </div>
      </div>
    </section>
  );
};

export default GainDeTempsSection;
