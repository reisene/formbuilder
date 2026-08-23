export type FieldWidth = 'quarter' | 'half' | 'threeQuarters' | 'full';

export type ButtonType = 'submit' | 'reset' | 'button';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-light'
  | 'outline-dark';

interface BaseField {
  id: string;
  name: string;
  label: string;
  required: boolean;
  width: FieldWidth;
}

export interface TextLikeField extends BaseField {
  type: 'text' | 'email' | 'password' | 'number' | 'date';
  placeholder?: string;
}

export interface TextareaField extends BaseField {
  type: 'textarea';
  placeholder?: string;
}

export interface SelectField extends BaseField {
  type: 'select';
  options: string[];
  multiple?: boolean;
}

export interface RadioField extends BaseField {
  type: 'radio';
  options: string[];
}

export interface CheckboxField extends BaseField {
  type: 'checkbox';
}

export interface FileField extends BaseField {
  type: 'file';
  multiple?: boolean;
}

export interface ButtonField extends BaseField {
  type: 'button';
  buttonType?: ButtonType;
  variant?: ButtonVariant;
}

export type FormField =
  | TextLikeField
  | TextareaField
  | SelectField
  | RadioField
  | CheckboxField
  | FileField
  | ButtonField;

export type FieldType = FormField['type'];

export interface FormGroup {
  id: string;
  title?: string;
  fields: FormField[];
}
