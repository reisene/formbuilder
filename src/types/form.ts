export type FieldType =
  'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file';

export type FieldWidth = 'quarter' | 'half' | 'threeQuarters' | 'full';

export interface FormField {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  width: FieldWidth;
}

export interface FormGroup {
  id: string;
  title?: string;
  fields: FormField[];
}
