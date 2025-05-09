
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // Prix avec remise annuelle de 20%
  const getPriceWithDiscount = (monthlyPrice: number) => {
    if (billingCycle === "annual") {
      const annualPrice = (monthlyPrice * 12 * 0.8) / 12; // 20% de réduction
      return annualPrice.toFixed(0);
    }
    return monthlyPrice;
  };

  return (
    <Layout>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Des Plans Intelligents pour une Sécurité Maîtrisée
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez la puissance de l'IA SecuGenie pour simplifier vos obligations réglementaires et gagner un temps précieux.
            </p>
            
            {/* Sélecteur Mensuel/Annuel */}
            <div className="flex items-center justify-center gap-4 my-8">
              <button 
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md ${
                  billingCycle === "monthly" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Mensuel
              </button>
              <button 
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-2 rounded-md ${
                  billingCycle === "annual" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Annuel <span className="text-sm font-medium text-accent">(-20%)</span>
              </button>
            </div>
          </div>
          
          {/* Grid des forfaits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="flex flex-col border-2 border-gray-200 hover:border-primary hover:shadow-md transition-all">
              <CardHeader className="text-center">
                <CardTitle>
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <div className="mt-4 text-3xl font-bold">
                    {getPriceWithDiscount(29)}€ <span className="text-sm font-normal text-gray-500">/mois</span>
                  </div>
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Idéal pour découvrir SecuGenie et gérer des besoins ponctuels avec une assistance ciblée.
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>1 Dossier Actif à la fois (ex: 1 événement, 1 plan de prévention)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Accès à 1 type de document au choix par mois (ex: Notice ERP ou Plan de Prévention simplifié)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Assistance IA Essentielle : Suggestions de structure de document, Aide à la rédaction basique</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Éditeur de plans (fonctionnalités de base)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Stockage pour 5 dossiers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Support par email</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>1 utilisateur</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Démarrer avec Starter</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="flex flex-col border-2 border-primary shadow-lg hover:shadow-xl transition-all relative">
              <div className="absolute -top-4 right-0 left-0 flex justify-center">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Le plus choisi</span>
              </div>
              <CardHeader className="text-center">
                <CardTitle>
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <div className="mt-4 text-3xl font-bold">
                    {getPriceWithDiscount(99)}€ <span className="text-sm font-normal text-gray-500">/mois</span>
                  </div>
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Pour les professionnels, organisateurs d'événements et responsables ERP qui exigent efficacité et conformité totale.
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="font-medium mb-2">Tout ce qui est dans Starter, plus :</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Jusqu'à 5 Dossiers Actifs simultanément</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Accès à tous les types de documents (GN6, PdP, Notices, Protocoles...)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Agent IA Accompagnateur Premium : Suggestions avancées, Vérification de complétude, Aide à la conformité Légifrance, Optimisation intelligente</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Éditeur de plans complet (toutes icônes, outils avancés)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Stockage pour 50 dossiers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Export des documents sans marque SecuGenie</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Jusqu'à 3 utilisateurs par compte</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Support prioritaire (email, chat)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="accent">Passer Pro</Button>
              </CardFooter>
            </Card>

            {/* Performance Plan */}
            <Card className="flex flex-col border-2 border-gray-200 hover:border-primary hover:shadow-md transition-all">
              <CardHeader className="text-center">
                <CardTitle>
                  <h3 className="text-2xl font-bold">Performance</h3>
                  <div className="mt-4 text-3xl font-bold">
                    {getPriceWithDiscount(249)}€ <span className="text-sm font-normal text-gray-500">/mois</span>
                  </div>
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  La solution ultime pour les équipes, agences, et grands comptes gérant de multiples projets de sécurité complexes.
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="font-medium mb-2">Tout ce qui est dans Pro, plus :</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Jusqu'à 20 Dossiers Actifs simultanément</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Agent IA Expert (analyses prédictives de risques basiques, rapports de conformité)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Fonctionnalités de collaboration avancées : Espaces partagés, Attribution de tâches, Validation multi-utilisateurs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Jusqu'à 10 utilisateurs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Stockage étendu (200 dossiers)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Support dédié et personnalisé (téléphone, onboarding)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Accès anticipé aux nouvelles fonctionnalités</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choisir Performance</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Section FAQ ou Informations supplémentaires */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Questions fréquentes</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold">Qu'est-ce qu'un "Dossier Actif" ?</h4>
                <p className="text-gray-600">Un dossier actif représente un projet ou un événement sur lequel vous travaillez activement. Il peut contenir plusieurs documents (GN6, Plan de Prévention, Notice de Sécurité) liés à ce même projet.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Comment fonctionne la facturation annuelle ?</h4>
                <p className="text-gray-600">En choisissant l'option annuelle, vous bénéficiez d'une remise de 20% sur le prix mensuel. Le montant total est facturé en une seule fois pour l'année complète.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Puis-je changer de forfait ?</h4>
                <p className="text-gray-600">Oui, vous pouvez passer à un forfait supérieur à tout moment. Si vous êtes sur un plan annuel, la différence sera calculée au prorata.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
