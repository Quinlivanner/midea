export type Priority = 'high' | 'medium' | 'low';
export type Status = 'new' | 'following' | 'quoted' | 'won' | 'lost';

export interface BusinessOpportunity {
  id: string;
  companyName: string;
  installationAddress: string;
  contactPerson: string;
  contactPhone: string;
  email?: string;
  priority: Priority;
  estimatedInstallationDate?: Date;
  description?: string;
  source?: string;
  status: Status;
  createdAt: Date;
}

export interface BusinessOpportunityFormData {
  companyName: string;
  installationAddress: string;
  contactPerson: string;
  contactPhone: string;
  email: string;
  priority: Priority;
  estimatedInstallationDate?: string;
  description: string;
  source: string;
  status: Status;
} 