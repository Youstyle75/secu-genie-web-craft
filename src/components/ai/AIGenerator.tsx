import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIGeneratorProps {
  documentType: 'GN6' | 'PlanPrevention' | 'NoticeSecuriteERP';
  onGenerate: (content: any) => void;
}

const AIGenerator = ({ documentType, onGenerate }: AIGeneratorProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState({
    erpType: '',
    capacity: '',
    location: '',
    nature: '',
    activity: '',
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      let requestType = '';
      let requestContext = {};

      switch (documentType) {
        case 'GN6':
          requestType = 'generate_gn6';
          requestContext = {
            erpType: context.erpType,
            capacity: context.capacity,
            location: context.location,
            nature: context.nature,
          };
          break;
        case 'PlanPrevention':
        case 'NoticeSecuriteERP':
          requestType = 'generate_risks';
          requestContext = {
            type: documentType,
            activity: context.activity,
            capacity: context.capacity,
          };
          break;
      }

      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          type: requestType,
          context: requestContext,
        },
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la génération');
      }

      onGenerate(data.data);
      toast.success('Contenu généré avec succès');
      setOpen(false);
    } catch (error: any) {
      console.error('Error generating content:', error);
      toast.error(error.message || 'Erreur lors de la génération');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4" />
          Générer avec l'IA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Génération assistée par IA</DialogTitle>
          <DialogDescription>
            Fournissez quelques informations pour générer automatiquement le contenu
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {documentType === 'GN6' && (
            <>
              <div>
                <Label htmlFor="erpType">Type d'ERP</Label>
                <Input
                  id="erpType"
                  placeholder="Ex: Type L (Salle polyvalente)"
                  value={context.erpType}
                  onChange={(e) => setContext({ ...context, erpType: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacité d'accueil</Label>
                <Input
                  id="capacity"
                  placeholder="Ex: 500 personnes"
                  value={context.capacity}
                  onChange={(e) => setContext({ ...context, capacity: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="location">Lieu</Label>
                <Input
                  id="location"
                  placeholder="Ex: Paris 15ème"
                  value={context.location}
                  onChange={(e) => setContext({ ...context, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="nature">Nature de la manifestation</Label>
                <Textarea
                  id="nature"
                  placeholder="Ex: Concert de musique classique"
                  value={context.nature}
                  onChange={(e) => setContext({ ...context, nature: e.target.value })}
                  rows={3}
                />
              </div>
            </>
          )}

          {(documentType === 'PlanPrevention' || documentType === 'NoticeSecuriteERP') && (
            <>
              <div>
                <Label htmlFor="activity">Type d'activité</Label>
                <Input
                  id="activity"
                  placeholder="Ex: Travaux de rénovation"
                  value={context.activity}
                  onChange={(e) => setContext({ ...context, activity: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacité / Effectif</Label>
                <Input
                  id="capacity"
                  placeholder="Ex: 200 personnes"
                  value={context.capacity}
                  onChange={(e) => setContext({ ...context, capacity: e.target.value })}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Génération...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Générer
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIGenerator;
