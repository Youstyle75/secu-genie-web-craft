
export interface SignatureData {
  id: string;
  documentId: string;
  signerInfo: string;
  signerRole?: string;
  signerEmail?: string;
  signatureImageBase64: string;
  timestamp: Date;
  ip?: string;
  certificatePem?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}
