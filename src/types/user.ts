
export interface User {
  id: string;
  email: string;
  nom: string;
  prenom?: string;
  role: 'admin' | 'utilisateur';
  createdAt: Date;
  updatedAt: Date;
  organization?: string;
  phoneNumber?: string;
  lastLogin?: Date;
  preferences?: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
  };
}
