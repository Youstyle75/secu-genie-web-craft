
import { Bot, MessageSquare } from 'lucide-react';

const AIAssistantSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h3 className="text-3xl font-bold mb-6">Assistant IA Réglementaire</h3>
            <p className="text-lg text-gray-600 mb-6">
              Notre chatbot intelligent spécialisé en réglementation de sécurité vous aide à naviguer les complexités législatives en temps réel.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-accent/20 text-accent flex items-center justify-center mr-3">
                  ✓
                </div>
                <span>Réponses instantanées à vos questions réglementaires</span>
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-accent/20 text-accent flex items-center justify-center mr-3">
                  ✓
                </div>
                <span>Références légales et articles de loi à jour</span>
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-accent/20 text-accent flex items-center justify-center mr-3">
                  ✓
                </div>
                <span>Disponible 24/7 pour vous accompagner</span>
              </li>
            </ul>
            <button 
              onClick={() => {
                document.querySelector('button[aria-label="Ouvrir le chat"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}
              className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center"
            >
              Poser une question <MessageSquare className="ml-2 h-5 w-5" />
            </button>
          </div>
          
          <div className="bg-gray-100 rounded-xl p-6 relative reveal">
            <div className="bg-white rounded-lg p-5 shadow-md mb-3 ml-auto max-w-xs">
              <p className="font-medium text-gray-800">Quelles sont les règles de sécurité pour un ERP?</p>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-5 shadow-sm max-w-md">
              <div className="flex items-start gap-3">
                <Bot className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">
                    Un ERP (Établissement Recevant du Public) est soumis à des règles strictes définies principalement par le Code de la Construction et de l'Habitation et l'arrêté du 25 juin 1980. Des dispositions spécifiques s'appliquent selon le type et la catégorie de l'établissement.
                  </p>
                  <div className="mt-3 text-xs bg-gray-100 p-2 rounded">
                    <p className="font-medium text-primary">Référence légale:</p>
                    <p>Code de la construction et de l'habitation, Article L123-1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantSection;
