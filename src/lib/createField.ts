import type { FieldType, FormField } from '@/types/form';

export function createField(type: FieldType, name: string, label: string): FormField {
  const base = {
    id: crypto.randomUUID(),
    name,
    label,
    required: false,
    width: 'full' as const,
  };

  switch (type) {
    case 'select':
      return { ...base, type: 'select', options: ['Option 1', 'Option 2'] };
    case 'radio':
      return { ...base, type: 'radio', options: ['Option 1', 'Option 2'] };
    case 'checkbox':
      return { ...base, type: 'checkbox' };
    case 'file':
      return { ...base, type: 'file' };
    case 'button':
      return { ...base, type: 'button', buttonType: 'submit', variant: 'primary' };
    case 'textarea':
      return { ...base, type: 'textarea' };
    default:
      return { ...base, type };
  }
}
