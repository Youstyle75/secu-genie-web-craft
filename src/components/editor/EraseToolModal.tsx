
import React from 'react';
import { Eraser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EraseToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEraseSelected: () => void;
  onEraseAll: () => void;
}

const EraseToolModal: React.FC<EraseToolModalProps> = ({
  isOpen,
  onClose,
  onEraseSelected,
  onEraseAll,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Outil de suppression</DialogTitle>
          <DialogDescription>
            Choisissez l'option de suppression souhaitée
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <Button
            onClick={onEraseSelected}
            variant="outline"
            className="flex items-center justify-start gap-2 h-auto py-6 px-4 hover:bg-gray-100"
          >
            <div className="p-2 bg-accent/10 rounded-full">
              <Eraser className="h-5 w-5 text-accent" />
            </div>
            <div className="text-left">
              <div className="font-medium">Supprimer la sélection</div>
              <div className="text-sm text-gray-500">
                Supprime uniquement l'élément actuellement sélectionné
              </div>
            </div>
          </Button>

          <Button
            onClick={onEraseAll}
            variant="outline"
            className="flex items-center justify-start gap-2 h-auto py-6 px-4 hover:bg-gray-100"
          >
            <div className="p-2 bg-red-500/10 rounded-full">
              <Eraser className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-left">
              <div className="font-medium">Tout effacer</div>
              <div className="text-sm text-gray-500">
                Supprime tous les éléments du plan (cette action ne peut pas être annulée)
              </div>
            </div>
          </Button>
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EraseToolModal;
