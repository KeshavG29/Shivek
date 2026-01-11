export interface User {
  uid: string;
  email: string | null;
  name: string | null;
  role: 'buyer' | 'supplier';
  createdAt: Date;
  savedSuppliers?: string[];
}

export interface Supplier {
  id: string;
  companyName: string;
  description: string;
  overview: string;
  subcategories: string[];
  capabilities: {
    [subcategory: string]: string[];
  };
  certifications: string[];
  industries: string[];
  location: string;
  verified: boolean;
  type: 'Manufacturer' | 'Distributor' | 'Service Provider' | 'Design House' | 'MRO' | 'EMS Provider' | 'System Integrator';
  website?: string;
  contactEmail?: string;
  yearFounded?: number;
  infrastructure: string[];
  quality: string[];
}

export interface Taxonomy {
  [majorCategory: string]: {
    [subcategory: string]: string[];
  };
}

export interface FilterOptions {
  certifications: string[];
  industries: string[];
  locations: string[];
  supplierTypes: string[];
  verificationStatus: string[];
}
