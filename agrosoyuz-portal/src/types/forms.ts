export type FieldType = 'text' | 'number' | 'date' | 'select' | 'radio' | 'textarea';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ServiceConfig {
  categorySlug: string;
  categoryName: string;
  serviceSlug: string;
  serviceName: string;
  shortDescription: string;
  icon: string;
  fields: FieldConfig[];
}

export interface ServiceCategory {
  categorySlug: string;
  categoryName: string;
  icon: string;
  tone: 'accent' | 'sand' | 'white';
  services: ServiceConfig[];
}
