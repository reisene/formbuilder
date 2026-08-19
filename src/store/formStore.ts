import { create } from 'zustand';

type FieldType =
  'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormStore {
  fields: FormField[];
  selectedFieldId: string | null;
  addField: (type: FieldType) => void;
  removeField: (id: string) => void;
  reorderFields: (from: number, to: number) => void;
  updateField: (id: string, patch: Partial<FormField>) => void;
  selectField: (id: string | null) => void;
}
