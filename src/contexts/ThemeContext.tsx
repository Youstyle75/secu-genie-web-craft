import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeConfig {
  primary: string;
  accent: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fontFamily: 'inter' | 'system' | 'mono';
  spacing: 'compact' | 'normal' | 'relaxed';
}

const defaultTheme: ThemeConfig = {
  primary: '221 83% 53%', // #2563eb
  accent: '356 77% 56%', // #e43e3e
  secondary: '152 76% 46%', // #13ce66
  background: '0 0% 100%', // #ffffff
  surface: '214 32% 98%', // #f8fafc
  text: '222 18% 16%', // #23272f
  borderRadius: 'lg',
  fontFamily: 'inter',
  spacing: 'normal'
};

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('secugenie-theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply CSS variables
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--surface', theme.surface);
    root.style.setProperty('--text', theme.text);
    
    // Apply border radius
    const radiusMap = { none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' };
    root.style.setProperty('--radius', radiusMap[theme.borderRadius]);
    
    // Apply font family
    if (theme.fontFamily === 'inter') {
      root.style.fontFamily = 'Inter, sans-serif';
    } else if (theme.fontFamily === 'system') {
      root.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    } else {
      root.style.fontFamily = 'monospace';
    }
    
    // Save to localStorage
    localStorage.setItem('secugenie-theme', JSON.stringify(theme));
  }, [theme]);

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    localStorage.removeItem('secugenie-theme');
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
