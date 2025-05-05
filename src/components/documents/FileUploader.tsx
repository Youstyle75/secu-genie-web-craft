
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, FileText, X } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
  onFileUploaded: (file: File) => void;
  isUploaded: boolean;
  acceptedTypes?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileUploaded, 
  isUploaded = false,
  acceptedTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png"
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileUploaded(selectedFile);
    }
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onFileUploaded(droppedFile);
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info("Fichier supprimé");
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  if (isUploaded || file) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-green-800">
                {file ? file.name : "Document téléchargé"}
              </h4>
              <p className="text-xs text-green-600">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Fichier valide"}
              </p>
            </div>
          </div>
          <button 
            onClick={handleRemoveFile}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept={acceptedTypes}
      />
      
      <div 
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="bg-gray-100 p-3 rounded-full">
            {isDragging ? (
              <FileText className="h-6 w-6 text-primary" />
            ) : (
              <Upload className="h-6 w-6 text-gray-500" />
            )}
          </div>
          <div>
            <p className="font-medium text-sm">
              Déposez votre fichier ici ou <span className="text-primary">parcourir</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, Word, JPG ou PNG (max. 10MB)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
