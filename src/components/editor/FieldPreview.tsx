import { Form, Button } from 'react-bootstrap';
import type { FormField } from '@/types/form';

interface FieldPreviewProps {
  field: FormField;
  disabled?: boolean;
}

function RequiredMark() {
  return (
    <span className="text-danger ms-1" aria-hidden="true">
      *
    </span>
  );
}

export default function FieldPreview({ field, disabled = true }: FieldPreviewProps) {
  switch (field.type) {
    case 'textarea':
      return (
        <Form.Group>
          <Form.Label>
            {field.label}
            {field.required && <RequiredMark />}
            {field.required && <span className="visually-hidden">(required)</span>}
          </Form.Label>
          <Form.Control as="textarea" placeholder={field.placeholder} disabled={disabled} />
        </Form.Group>
      );

    case 'select':
      return (
        <Form.Group>
          <Form.Label>
            {field.label}
            {field.required && <RequiredMark />}
            {field.required && <span className="visually-hidden">(required)</span>}
          </Form.Label>
          <Form.Select disabled={disabled} multiple={field.multiple}>
            {field.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </Form.Select>
        </Form.Group>
      );

    case 'checkbox':
      return (
        <Form.Check
          type="checkbox"
          label={
            <>
              {field.label}
              {field.required && <RequiredMark />}
              {field.required && <span className="visually-hidden">(required)</span>}
            </>
          }
          disabled={disabled}
        />
      );

    case 'radio':
      return (
        <Form.Group>
          <Form.Label>
            {field.label}
            {field.required && <RequiredMark />}
            {field.required && <span className="visually-hidden">(required)</span>}
          </Form.Label>
          {field.options.map((opt) => (
            <Form.Check key={opt} type="radio" label={opt} name={field.id} disabled={disabled} />
          ))}
        </Form.Group>
      );

    case 'file':
      return (
        <Form.Group>
          <Form.Label>
            {field.label}
            {field.required && <RequiredMark />}
            {field.required && <span className="visually-hidden">(required)</span>}
          </Form.Label>
          <Form.Control type="file" multiple={field.multiple} disabled={disabled} />
        </Form.Group>
      );

    case 'button':
      return (
        <Button
          type={field.buttonType ?? 'submit'}
          variant={field.variant ?? 'primary'}
          disabled={disabled}
        >
          {field.label}
        </Button>
      );

    default:
      // narrows to TextLikeField: 'text' | 'email' | 'password' | 'number' | 'date'
      return (
        <Form.Group>
          <Form.Label>
            {field.label}
            {field.required && <RequiredMark />}
            {field.required && <span className="visually-hidden">(required)</span>}
          </Form.Label>
          <Form.Control type={field.type} placeholder={field.placeholder} disabled={disabled} />
        </Form.Group>
      );
  }
}
