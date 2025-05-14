import { useState, FormEvent } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from '@/components/ui/use-toast';

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
    }
    
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    
    if (!formData.projectType) {
      newErrors.projectType = 'Veuillez sélectionner un type de projet';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast.success("Votre message a été envoyé avec succès!");
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
      });
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <section className="py-12 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 reveal">
              <div className="bg-dark-light rounded-lg shadow-md p-6 h-full border-0">
                <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="mr-4 h-6 w-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1 text-white">Adresse</h3>
                      <p className="text-gray-300">
                        123 Avenue de la Sécurité<br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="mr-4 h-6 w-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1 text-white">Téléphone</h3>
                      <a href="tel:+33123456789" className="text-gray-300 hover:text-accent transition-colors">
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="mr-4 h-6 w-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1 text-white">Email</h3>
                      <a href="mailto:contact@secugenie.com" className="text-gray-300 hover:text-accent transition-colors">
                        contact@secugenie.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-3 text-white">Horaires d'ouverture</h3>
                  <p className="text-gray-300">
                    Lundi - Vendredi: 9h00 - 18h00<br />
                    Samedi - Dimanche: Fermé
                  </p>
                </div>
                
                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="font-medium mb-3 text-white">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-dark-medium hover:bg-accent text-gray-300 hover:text-white p-2 rounded-full transition-colors" aria-label="LinkedIn">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-dark-medium hover:bg-accent text-gray-300 hover:text-white p-2 rounded-full transition-colors" aria-label="Twitter">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3 reveal">
              <div className="bg-dark-light rounded-lg shadow-md p-6 border-0">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-0 bg-dark-medium rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-white ${
                        errors.name ? 'ring-2 ring-red-500' : ''
                      }`}
                      placeholder="Votre nom"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border-0 bg-dark-medium rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-white ${
                          errors.email ? 'ring-2 ring-red-500' : ''
                        }`}
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border-0 bg-dark-medium rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-white ${
                          errors.phone ? 'ring-2 ring-red-500' : ''
                        }`}
                        placeholder="Votre numéro de téléphone"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-1">
                      Type de projet *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-0 bg-dark-medium rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-white ${
                        errors.projectType ? 'ring-2 ring-red-500' : ''
                      }`}
                    >
                      <option value="">Sélectionnez une option</option>
                      <option value="event">Événement</option>
                      <option value="erp">Établissement Recevant du Public (ERP)</option>
                      <option value="custom">Solution Personnalisée</option>
                      <option value="other">Autre</option>
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-sm text-red-400">{errors.projectType}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-0 bg-dark-medium rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-white ${
                        errors.message ? 'ring-2 ring-red-500' : ''
                      }`}
                      placeholder="Comment pouvons-nous vous aider ?"
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-700 rounded bg-dark-medium"
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-300">
                      J'accepte que mes données soient traitées conformément à la{' '}
                      <a href="#" className="text-accent hover:underline">
                        politique de confidentialité
                      </a>
                    </label>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-accent hover:bg-accent-hover text-white py-2 px-4 rounded-md font-medium transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </div>
                  
                  {isSuccess && (
                    <div className="p-4 bg-green-900/30 border border-green-500/30 text-green-400 rounded-md animate-fade-in">
                      Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 reveal">
        <div className="max-w-5xl mx-auto">
          <div className="bg-dark-light rounded-lg shadow-md overflow-hidden border-0">
            <div className="h-96">
              <iframe
                title="SecuGenie Location"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.3354330160472316!3d48.87456857928921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e38f817b573%3A0x48d69c30470e7aeb!2sPlace%20de%20l&#39;Op%C3%A9ra%2C%2075009%20Paris!5e0!3m2!1sfr!2sfr!4v1650000000000!5m2!1sfr!2sfr"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
