import React, { useState } from 'react';
import { Palette, RotateCcw, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const presetThemes = {
  relume: {
    name: 'Relume Classic',
    primary: '221 83% 53%',
    accent: '356 77% 56%',
    secondary: '152 76% 46%',
    background: '0 0% 100%',
    surface: '214 32% 98%',
    text: '222 18% 16%'
  },
  ocean: {
    name: 'Ocean Blue',
    primary: '199 89% 48%',
    accent: '338 85% 55%',
    secondary: '158 64% 52%',
    background: '0 0% 100%',
    surface: '210 40% 98%',
    text: '210 24% 16%'
  },
  forest: {
    name: 'Forest Green',
    primary: '142 71% 45%',
    accent: '25 95% 53%',
    secondary: '262 83% 58%',
    background: '0 0% 100%',
    surface: '120 20% 97%',
    text: '120 10% 15%'
  },
  sunset: {
    name: 'Sunset Orange',
    primary: '24 95% 53%',
    accent: '346 87% 55%',
    secondary: '45 93% 47%',
    background: '0 0% 100%',
    surface: '30 20% 98%',
    text: '20 14% 16%'
  }
};

export const ThemeConfigurator: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const applyPreset = (presetKey: keyof typeof presetThemes) => {
    const preset = presetThemes[presetKey];
    updateTheme({
      primary: preset.primary,
      accent: preset.accent,
      secondary: preset.secondary,
      background: preset.background,
      surface: preset.surface,
      text: preset.text
    });
    toast.success(`Thème "${preset.name}" appliqué`);
  };

  const handleReset = () => {
    resetTheme();
    toast.success('Thème réinitialisé');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Ouvrir le configurateur de thème"
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Personnaliser</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            Configurateur de Charte Graphique
          </DialogTitle>
          <DialogDescription className="text-base">
            Personnalisez l'apparence de votre application SecuGenie
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Thèmes prédéfinis */}
          <Card className="p-4 bg-surface/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Thèmes Prédéfinis
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(presetThemes).map(([key, preset]) => (
                <Button
                  key={key}
                  variant="outline"
                  onClick={() => applyPreset(key as keyof typeof presetThemes)}
                  className="justify-start h-auto p-3 hover:border-primary transition-all"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex gap-1">
                      <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
                           style={{ backgroundColor: `hsl(${preset.primary})` }} />
                      <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
                           style={{ backgroundColor: `hsl(${preset.accent})` }} />
                      <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
                           style={{ backgroundColor: `hsl(${preset.secondary})` }} />
                    </div>
                    <span className="text-sm font-medium">{preset.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* Options de personnalisation */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Options d'Interface</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="border-radius">Arrondi des Coins</Label>
                <Select
                  value={theme.borderRadius}
                  onValueChange={(value: any) => updateTheme({ borderRadius: value })}
                >
                  <SelectTrigger id="border-radius" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucun</SelectItem>
                    <SelectItem value="sm">Petit (4px)</SelectItem>
                    <SelectItem value="md">Moyen (8px)</SelectItem>
                    <SelectItem value="lg">Grand (12px)</SelectItem>
                    <SelectItem value="xl">Très Grand (16px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Police de Caractères</Label>
                <Select
                  value={theme.fontFamily}
                  onValueChange={(value: any) => updateTheme({ fontFamily: value })}
                >
                  <SelectTrigger id="font-family" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter (Recommandé)</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spacing">Espacement</Label>
                <Select
                  value={theme.spacing}
                  onValueChange={(value: any) => updateTheme({ spacing: value })}
                >
                  <SelectTrigger id="spacing" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="relaxed">Détendu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Prévisualisation */}
          <Card className="p-6 bg-gradient-to-br from-surface to-background">
            <h3 className="font-semibold mb-4">Aperçu</h3>
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Bouton Principal
              </Button>
              <Button variant="outline" className="w-full">
                Bouton Secondaire
              </Button>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">
                  Exemple de carte avec du texte pour visualiser le rendu général
                </p>
              </Card>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1 gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Réinitialiser
            </Button>
            <Button
              onClick={() => {
                toast.success('Configuration sauvegardée');
                setOpen(false);
              }}
              className="flex-1 gap-2"
            >
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
