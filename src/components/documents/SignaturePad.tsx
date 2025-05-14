
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Check } from 'lucide-react';

interface SignaturePadProps {
  onSignatureCapture: (signatureData: string) => void;
  width?: number;
  height?: number;
  className?: string;
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  onSignatureCapture,
  width = 500,
  height = 200,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurer le canvas pour un rendu haute qualité
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    
    // Configurer le style de dessin
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2D3748'; // textPrincipal color
    
    // Effacer le canvas et dessiner le fond
    clearCanvas();
  }, [width, height]);
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#F7FAFC'; // formBackground color
    ctx.fillRect(0, 0, width, height);
    
    // Dessiner une ligne de base pour la signature
    ctx.beginPath();
    ctx.moveTo(20, height - 30);
    ctx.lineTo(width - 20, height - 30);
    ctx.strokeStyle = '#E2E8F0'; // formBorder color
    ctx.stroke();
    
    setHasSignature(false);
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    setHasSignature(true);
    
    // Récupérer les coordonnées du point initial
    const rect = canvas.getBoundingClientRect();
    const x = getClientX(e) - rect.left;
    const y = getClientY(e) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  
  const continueDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Récupérer les coordonnées actuelles
    const rect = canvas.getBoundingClientRect();
    const x = getClientX(e) - rect.left;
    const y = getClientY(e) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const endDrawing = () => {
    setIsDrawing(false);
  };
  
  const getClientX = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): number => {
    // Gérer les événements de souris et les événements tactiles
    if ('touches' in e) {
      return e.touches[0].clientX;
    } else {
      return e.clientX;
    }
  };
  
  const getClientY = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): number => {
    // Gérer les événements de souris et les événements tactiles
    if ('touches' in e) {
      return e.touches[0].clientY;
    } else {
      return e.clientY;
    }
  };
  
  const handleClear = () => {
    clearCanvas();
  };
  
  const handleValidate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Convertir le canvas en image base64
    const signatureData = canvas.toDataURL('image/png');
    onSignatureCapture(signatureData);
  };
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="border border-formBorder rounded-md overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={continueDrawing}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={continueDrawing}
          onTouchEnd={endDrawing}
          className="touch-none"
          aria-label="Zone de signature"
        />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button 
          variant="outline" 
          onClick={handleClear}
          disabled={!hasSignature}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Effacer
        </Button>
        <Button 
          variant="default"
          onClick={handleValidate}
          disabled={!hasSignature}
        >
          <Check className="mr-2 h-4 w-4" />
          Valider la signature
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
