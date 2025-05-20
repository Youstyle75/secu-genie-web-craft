
import { FireExtinguisher } from 'lucide-react';

const GainDeTempsSection = () => {
  return (
    <section className="relative py-12 overflow-hidden bg-dark">
      <div className="container mx-auto px-4 relative z-10">
        {/* Grand texte en arrière-plan semi-transparent comme dans bolt.new */}
        <h2 className="text-[120px] md:text-[180px] font-bold text-dark-light opacity-5 absolute -top-10 md:-top-20 left-0 w-full text-center">
          secugenie
        </h2>
        <div className="text-center relative z-20">
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">
            gain de temps <span className="text-accent">remarquable</span>
          </h3>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Réduisez de 80% le temps passé à créer vos documents de sécurité grâce à notre assistant IA spécialisé
          </p>
        </div>
      </div>
    </section>
  );
};

export default GainDeTempsSection;
