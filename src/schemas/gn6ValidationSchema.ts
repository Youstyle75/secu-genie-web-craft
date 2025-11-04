import { z } from 'zod';

// Regex patterns
const PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const SIRET_REGEX = /^\d{14}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// File validation (max 5MB, PDF/JPG/PNG only)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

export const fileValidation = z
  .custom<File>()
  .refine((file) => file instanceof File, 'Un fichier est requis')
  .refine((file) => file.size <= MAX_FILE_SIZE, 'Le fichier ne doit pas dépasser 5MB')
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Format accepté: PDF, JPG, PNG uniquement'
  );

// GN6 Complete Validation Schema - Conformité 2025
export const gn6ValidationSchema = z.object({
  // Informations de base
  title: z
    .string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(200, 'Le titre ne doit pas dépasser 200 caractères'),
  
  establishmentId: z
    .string()
    .min(3, 'La référence doit contenir au moins 3 caractères')
    .max(50, 'La référence ne doit pas dépasser 50 caractères'),

  // SECTION 1 - ORGANISATEUR (Obligatoire)
  organisateur: z.object({
    nomRaisonSociale: z
      .string()
      .min(2, 'Le nom/raison sociale est obligatoire')
      .max(200, 'Maximum 200 caractères'),
    
    email: z
      .string()
      .regex(EMAIL_REGEX, 'Format email invalide')
      .email('Email invalide'),
    
    adresse: z
      .string()
      .min(5, 'Adresse complète requise')
      .max(500, 'Maximum 500 caractères'),
    
    codePostal: z
      .string()
      .regex(/^\d{5}$/, 'Code postal français invalide (5 chiffres)'),
    
    ville: z
      .string()
      .min(2, 'Ville requise')
      .max(100, 'Maximum 100 caractères'),
    
    telephone: z
      .string()
      .regex(PHONE_REGEX, 'Numéro de téléphone français invalide'),
  }),

  // SECTION 2 - MANIFESTATION (Obligatoire)
  manifestation: z.object({
    nom: z
      .string()
      .min(3, 'Nom de la manifestation requis')
      .max(200, 'Maximum 200 caractères'),
    
    type: z.enum(
      ['concert', 'festival', 'salon', 'spectacle', 'conference', 'exposition', 'autre'],
      { errorMap: () => ({ message: 'Type de manifestation requis' }) }
    ),
    
    lieu: z
      .string()
      .min(5, 'Lieu de la manifestation requis')
      .max(300, 'Maximum 300 caractères'),
    
    dateDebut: z
      .string()
      .refine((date) => {
        const inputDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate >= today;
      }, 'La date de début doit être dans le futur'),
    
    dateFin: z.string(),
    
    heureDebut: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format heure invalide (HH:MM)'),
    
    heureFin: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format heure invalide (HH:MM)'),
    
    effectifMaximal: z
      .number()
      .min(1, 'Effectif minimal: 1 personne')
      .max(100000, 'Effectif maximal: 100 000 personnes'),
  }).refine(
    (data) => {
      const debut = new Date(data.dateDebut);
      const fin = new Date(data.dateFin);
      return fin >= debut;
    },
    { message: 'La date de fin doit être après la date de début', path: ['dateFin'] }
  ),

  // SECTION 3 - ACCORD PROPRIÉTAIRE (OBLIGATOIRE - Conformité 2025)
  accordProprietaire: z.object({
    accord: z
      .boolean()
      .refine((val) => val === true, {
        message: "L'accord écrit du propriétaire/exploitant est OBLIGATOIRE",
      }),
    
    nomProprietaire: z
      .string()
      .min(2, 'Nom du propriétaire requis')
      .max(200, 'Maximum 200 caractères'),
    
    dateAccord: z
      .string()
      .refine((date) => {
        const inputDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate <= today;
      }, "La date de l'accord ne peut pas être dans le futur"),
  }),

  // SECTION 4 - MOYENS DE SECOURS (Obligatoire)
  moyensSecours: z.object({
    eclairageSecurity: z.boolean().default(false),
    alarmeIncendie: z.boolean().default(false),
    planEvacuation: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Le plan d\'évacuation est OBLIGATOIRE',
      }),
    
    extincteurs: z.array(z.object({
      type: z.enum(['A', 'B', 'C', 'D', 'CO2'], {
        errorMap: () => ({ message: 'Type extincteur invalide' })
      }),
      quantite: z.number().min(1, 'Minimum 1 extincteur'),
      emplacement: z.string().min(2, 'Emplacement requis').max(200, 'Maximum 200 caractères'),
    })).min(1, 'Au moins un extincteur requis'),
  }),

  // SECTION 5 - SERVICE SÉCURITÉ (Obligatoire)
  serviceSecurite: z.object({
    nomSociete: z
      .string()
      .min(2, 'Nom de la société requis')
      .max(200, 'Maximum 200 caractères'),
    
    siret: z
      .string()
      .regex(SIRET_REGEX, 'SIRET invalide (14 chiffres exactement)'),
    
    nombreAgents: z
      .number()
      .min(1, 'Au moins 1 agent requis')
      .max(1000, 'Maximum 1000 agents'),
    
    qualificationSSI: z.boolean().default(false),
  }),

  // SECTION 6 - PLANS (OBLIGATOIRE)
  plans: z.object({
    planSituation: z
      .custom<File>()
      .refine((file) => file instanceof File, 'Plan de situation OBLIGATOIRE')
      .refine((file) => file.size <= MAX_FILE_SIZE, 'Le fichier ne doit pas dépasser 5MB')
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Format accepté: PDF, JPG, PNG uniquement'
      ),
    
    planLocaux: z
      .custom<File>()
      .refine((file) => file instanceof File, 'Plan des locaux OBLIGATOIRE')
      .refine((file) => file.size <= MAX_FILE_SIZE, 'Le fichier ne doit pas dépasser 5MB')
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Format accepté: PDF, JPG, PNG uniquement'
      ),
  }),

  // Service d'ordre si effectif > 1500
}).superRefine((data, ctx) => {
  if (data.manifestation.effectifMaximal > 1500) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'ALERTE: Service d\'ordre OBLIGATOIRE pour plus de 1500 personnes',
      path: ['manifestation', 'effectifMaximal'],
    });
  }
});

export type GN6FormData = z.infer<typeof gn6ValidationSchema>;
