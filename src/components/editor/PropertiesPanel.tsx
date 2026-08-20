'use client';

import { Form } from 'react-bootstrap';
import { useFormStore } from '@/store/formStore';
import type { FieldWidth } from '@/types/form';

export default function PropertiesPanel() {
  const groups = useFormStore((s) => s.groups);
  const selectedFieldId = useFormStore((s) => s.selectedFieldId);
  const selectedGroupId = useFormStore((s) => s.selectedGroupId);
  const updateField = useFormStore((s) => s.updateField);
  const updateGroupTitle = useFormStore((s) => s.updateGroupTitle);

  if (selectedFieldId) {
    const group = groups.find((g) => g.fields.some((f) => f.id === selectedFieldId));
    const field = group?.fields.find((f) => f.id === selectedFieldId);

    if (!group || !field) {
      return <p className="text-muted">Select a field on the canvas to edit its properties.</p>;
    }

    const needsOptions = field.type === 'select' || field.type === 'radio';

    return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Field name</Form.Label>
          <Form.Control
            value={field.name}
            onChange={(e) => updateField(group.id, field.id, { name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Label</Form.Label>
          <Form.Control
            value={field.label}
            onChange={(e) => updateField(group.id, field.id, { label: e.target.value })}
          />
        </Form.Group>

        {field.type !== 'checkbox' && (
          <Form.Group className="mb-3">
            <Form.Label>Placeholder</Form.Label>
            <Form.Control
              value={field.placeholder ?? ''}
              onChange={(e) => updateField(group.id, field.id, { placeholder: e.target.value })}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Required"
            checked={field.required}
            onChange={(e) => updateField(group.id, field.id, { required: e.target.checked })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Width</Form.Label>
          <Form.Select
            value={field.width}
            onChange={(e) =>
              updateField(group.id, field.id, { width: e.target.value as FieldWidth })
            }
          >
            <option value="quarter">Quarter</option>
            <option value="half">Half</option>
            <option value="threeQuarters">Three quarters</option>
            <option value="full">Full</option>
          </Form.Select>
        </Form.Group>

        {needsOptions && (
          <Form.Group className="mb-3">
            <Form.Label>Options (one per line)</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={field.options?.join('\n') ?? ''}
              onChange={(e) =>
                updateField(group.id, field.id, {
                  options: e.target.value.split('\n').filter((o) => o.trim() !== ''),
                })
              }
            />
          </Form.Group>
        )}
      </Form>
    );
  }

  if (selectedGroupId) {
    const group = groups.find((g) => g.id === selectedGroupId);
    if (!group) {
      return <p className="text-muted">Select a section to edit its properties.</p>;
    }

    return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Section title</Form.Label>
          <Form.Control
            value={group.title ?? ''}
            onChange={(e) => updateGroupTitle(group.id, e.target.value)}
          />
        </Form.Group>
      </Form>
    );
  }

  return <p className="text-muted">Select a field or section to edit its properties.</p>;
}
