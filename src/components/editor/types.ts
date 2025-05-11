
import { fabric } from 'fabric';

export type EditorElement = {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation: number;
};

export type DrawingToolProps = {
  drawingMode: boolean;
  setDrawingMode: (mode: boolean) => void;
  brushColor: string;
  setBrushColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
};

export type CanvasActionsType = {
  addRectangle: () => void;
  addCircle: () => void;
  addLine: () => void;
  addText: () => void;
  handleSave: () => void;
  handleClear: () => void;
  handleRemove: () => void;
  handleRotate: () => void;
  toggleDrawingMode: () => void;
  canvas: fabric.Canvas | null;
};
