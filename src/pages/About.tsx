
import { ArrowRight, Award, Mail, MessageSquare, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const About = () => {
  const teamMembers = [
    {
      name: "Jean-Pierre Dubois",
      role: "Fondateur & Directeur Général",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
      bio: "Ancien pompier et expert en sécurité incendie, Jean-Pierre a fondé SecuGenie avec la vision de rendre la conformité en sécurité accessible à tous les établissements.",
    },
    {
      name: "Sophie Martin",
      role: "Directrice Technique",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
      bio: "Ingénieure en informatique spécialisée en IA, Sophie dirige le développement des algorithmes qui analysent les plans et génèrent les documents de sécurité.",
    },
    {
      name: "Thomas Laurent",
      role: "Expert Réglementation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
      bio: "Avec plus de 15 ans d'expérience dans la commission de sécurité, Thomas veille à ce que toutes nos solutions soient conformes aux dernières réglementations.",
    },
  ];
  
  return (
    <Layout>
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 reveal">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos de SecuGenie</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              SecuGenie révolutionne la création de documents de sécurité grâce à l'intelligence artificielle, simplifiant la conformité réglementaire pour les établissements et événements.
            </p>
          </div>
          
          {/* Our Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div className="reveal">
              <h2 className="text-3xl font-bold mb-4">Notre Histoire</h2>
              <p className="text-gray-700 mb-4">
                Fondée en 2022, SecuGenie est née d'un constat simple : la création et la gestion des documents de sécurité est souvent complexe, chronophage et source d'erreurs pour les établissements recevant du public et les organisateurs d'événements.
              </p>
              <p className="text-gray-700 mb-4">
                Notre équipe d'experts en sécurité et en intelligence artificielle s'est donné pour mission de simplifier ce processus tout en garantissant une conformité parfaite avec les réglementations en vigueur.
              </p>
              <p className="text-gray-700">
                Aujourd'hui, SecuGenie accompagne plus de 1000 clients dans toute la France, de la petite boutique aux grands centres commerciaux, en passant par les festivals et salons professionnels.
              </p>
            </div>
            <div className="relative reveal">
              <img 
                src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80"
                alt="L'équipe SecuGenie" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="font-semibold text-primary">Fondée en 2022</p>
                <p className="text-gray-700">Paris, France</p>
              </div>
            </div>
          </div>
          
          {/* Mission & Values */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16 reveal">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Notre Mission & Nos Valeurs</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Chez SecuGenie, nous croyons que la sécurité ne devrait jamais être compromise par la complexité administrative.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Notre Mission</h3>
                <p className="text-gray-700">
                  Simplifier la création et la gestion des documents de sécurité grâce à l'intelligence artificielle, permettant aux établissements et organisateurs d'événements de se concentrer sur leur cœur de métier tout en garantissant la sécurité de tous.
                </p>
              </div>
              
              {/* Vision */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Notre Vision</h3>
                <p className="text-gray-700">
                  Devenir la référence en matière de solutions digitales de sécurité en France et en Europe, en créant un standard d'excellence pour la conformité réglementaire des ERP et événements.
                </p>
              </div>
              
              {/* Values */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Nos Valeurs</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Award className="text-primary h-5 w-5 mr-2" />
                    <span>Excellence</span>
                  </li>
                  <li className="flex items-center">
                    <Award className="text-primary h-5 w-5 mr-2" />
                    <span>Innovation</span>
                  </li>
                  <li className="flex items-center">
                    <Award className="text-primary h-5 w-5 mr-2" />
                    <span>Fiabilité</span>
                  </li>
                  <li className="flex items-center">
                    <Award className="text-primary h-5 w-5 mr-2" />
                    <span>Accessibilité</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Our Team */}
          <div className="mb-16 reveal">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Une équipe passionnée d'experts en sécurité, en réglementation et en intelligence artificielle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  style={{ transitionDelay: `${0.1 * index}s` }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Expertise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div className="order-2 md:order-1 reveal">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                alt="Expertise SecuGenie" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2 reveal">
              <h2 className="text-3xl font-bold mb-4">Notre Expertise</h2>
              <p className="text-gray-700 mb-4">
                SecuGenie combine l'expertise de professionnels de la sécurité avec les dernières avancées en intelligence artificielle pour offrir des solutions complètes et sur mesure.
              </p>
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Sécurité Incendie</h3>
                  <p className="text-gray-700">Experts en prévention des risques incendie et en conformité avec la réglementation des ERP.</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Intelligence Artificielle</h3>
                  <p className="text-gray-700">Algorithmes avancés pour l'analyse de plans et l'optimisation du positionnement des équipements de sécurité.</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Réglementation</h3>
                  <p className="text-gray-700">Veille constante sur les évolutions réglementaires pour garantir des documents toujours conformes.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partners */}
          <div className="mb-16 reveal">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Nos Partenaires</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Nous collaborons avec des leaders de l'industrie pour vous offrir des solutions de sécurité complètes.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((partner) => (
                <div key={partner} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32">
                  <div className="text-center text-gray-400">Logo Partenaire</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact CTA */}
          <div className="bg-primary rounded-lg overflow-hidden reveal">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Vous avez des questions ?</h2>
                <p className="mb-6">
                  N'hésitez pas à nous contacter pour en savoir plus sur nos solutions ou pour discuter de vos besoins spécifiques.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3" />
                    <a href="tel:+33123456789" className="hover:underline">+33 1 23 45 67 89</a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3" />
                    <a href="mailto:contact@secugenie.com" className="hover:underline">contact@secugenie.com</a>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-3" />
                    <span>Chat disponible du lundi au vendredi, 9h-18h</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8">
                <h3 className="text-xl font-bold mb-4">Prêt à démarrer ?</h3>
                <p className="text-gray-700 mb-6">
                  Découvrez comment SecuGenie peut vous aider à simplifier la gestion de votre sécurité.
                </p>
                <div className="space-y-3">
                  <Link
                    to="/demo"
                    className="block w-full bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-md text-center font-medium transition-colors"
                  >
                    Essayer la démo
                  </Link>
                  <Link
                    to="/contact"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-center font-medium transition-colors"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
