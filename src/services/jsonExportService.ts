import { toast } from 'sonner';

export interface DocumentMetadata {
  type: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  author?: string;
  version?: string;
  status?: string;
}

export interface ExportData {
  metadata: DocumentMetadata;
  content: any;
}

/**
 * Export document data as JSON with metadata
 */
export const exportToJSON = (data: ExportData): void => {
  try {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const fileName = generateFileName(data.metadata, 'json');
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Document exporté en JSON avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'export JSON:', error);
    toast.error('Erreur lors de l\'export JSON');
  }
};

/**
 * Generate a clear filename with metadata
 */
export const generateFileName = (
  metadata: DocumentMetadata, 
  extension: 'pdf' | 'json' | 'png' | 'svg'
): string => {
  const date = new Date(metadata.createdAt).toISOString().split('T')[0];
  const sanitizedTitle = metadata.title
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
    .substring(0, 50);
  
  const author = metadata.author 
    ? `-${metadata.author.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`
    : '';
  
  return `secugenie-${metadata.type}-${sanitizedTitle}${author}-${date}.${extension}`;
};

/**
 * Prepare document data for API automation
 */
export const prepareForAPI = (data: ExportData): string => {
  const apiData = {
    ...data,
    metadata: {
      ...data.metadata,
      exportedAt: new Date().toISOString(),
      apiVersion: '1.0',
      format: 'json'
    }
  };
  
  return JSON.stringify(apiData);
};
