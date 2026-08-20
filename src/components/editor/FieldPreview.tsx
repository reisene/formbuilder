import { Form } from 'react-bootstrap';
import type { FormField } from '@/types/form';

interface FieldPreviewProps {
  field: FormField;
  disabled?: boolean;
}

export default function FieldPreview({ field, disabled = true }: FieldPreviewProps) {
  switch (field.type) {
    case 'textarea':
      return (
        <Form.Group>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control as="textarea" placeholder={field.placeholder} disabled={disabled} />
        </Form.Group>
      );

    case 'select':
      return (
        <Form.Group>
          <Form.Label>{field.label}</Form.Label>
          <Form.Select disabled={disabled}>
            {field.options?.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </Form.Select>
        </Form.Group>
      );

    case 'checkbox':
      return <Form.Check type="checkbox" label={field.label} disabled={disabled} />;

    case 'radio':
      return (
        <Form.Group>
          <Form.Label>{field.label}</Form.Label>
          {field.options?.map((opt) => (
            <Form.Check key={opt} type="radio" label={opt} name={field.id} disabled={disabled} />
          ))}
        </Form.Group>
      );

    default:
      return (
        <Form.Group>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control type={field.type} placeholder={field.placeholder} disabled={disabled} />
        </Form.Group>
      );
  }
}
