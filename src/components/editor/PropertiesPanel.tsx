'use client';

import { Form } from 'react-bootstrap';
import { useFormStore } from '@/store/formStore';
import type { FieldWidth, ButtonType, ButtonVariant } from '@/types/form';
import { useState, useEffect } from 'react';
import { confirmDelete } from '@/lib/confirmDelete';

export default function PropertiesPanel() {
  const groups = useFormStore((s) => s.groups);
  const selectedFieldId = useFormStore((s) => s.selectedFieldId);
  const selectedGroupId = useFormStore((s) => s.selectedGroupId);
  const updateField = useFormStore((s) => s.updateField);
  const updateGroupTitle = useFormStore((s) => s.updateGroupTitle);
  const removeField = useFormStore((s) => s.removeField);
  const removeGroup = useFormStore((s) => s.removeGroup);

  const [optionsText, setOptionsText] = useState('');
  const fieldGroup = groups.find((g) => g.fields.some((f) => f.id === selectedFieldId));
  const field = fieldGroup?.fields.find((f) => f.id === selectedFieldId);

  useEffect(() => {
    if (field && (field.type === 'select' || field.type === 'radio')) {
      setOptionsText(field.options.join('\n'));
    }
  }, [field?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      const isFormControl =
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if (isFormControl) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedFieldId && fieldGroup && field) {
          if (confirmDelete(`the "${field.label}" field`)) {
            removeField(fieldGroup.id, field.id);
          }
        } else if (selectedGroupId) {
          const group = groups.find((g) => g.id === selectedGroupId);
          if (
            group &&
            confirmDelete(`the "${group.title || 'Untitled section'}" section and all its fields`)
          ) {
            removeGroup(group.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedFieldId, selectedGroupId, fieldGroup, field, groups, removeField, removeGroup]);

  if (selectedFieldId) {
    if (!fieldGroup || !field) {
      return <p className="text-muted">Select a field on the canvas to edit its properties.</p>;
    }

    const isDuplicateName = groups
      .flatMap((g) => g.fields)
      .some((f) => f.id !== field.id && f.name === field.name && field.name.trim() !== '');

    const isValidNameFormat = /^[A-Za-z][A-Za-z0-9_-]*$/.test(field.name);
    const isInvalidName = field.name.trim() !== '' && (isDuplicateName || !isValidNameFormat);

    const nameErrorMessage = isDuplicateName
      ? 'This name is already used by another field. Duplicate names will break the exported HTML (label/id linking, form submission).'
      : 'Field name must start with a letter and contain only letters, numbers, hyphens, or underscores — no spaces or special characters.';

    return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Field name</Form.Label>
          <Form.Control
            value={field.name}
            isInvalid={isInvalidName}
            onChange={(e) => updateField(fieldGroup.id, field.id, { name: e.target.value })}
          />
          <Form.Control.Feedback type="invalid">{nameErrorMessage}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{field.type === 'button' ? 'Button text' : 'Label'}</Form.Label>
          <Form.Control
            value={field.label}
            onChange={(e) => updateField(fieldGroup.id, field.id, { label: e.target.value })}
          />
        </Form.Group>

        {field.type === 'button' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Button type</Form.Label>
              <Form.Select
                value={field.buttonType ?? 'submit'}
                onChange={(e) =>
                  updateField(fieldGroup.id, field.id, {
                    buttonType: e.target.value as ButtonType,
                  })
                }
              >
                <option value="submit">Submit</option>
                <option value="reset">Reset</option>
                <option value="button">Button</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Variant</Form.Label>
              <Form.Select
                value={field.variant ?? 'primary'}
                onChange={(e) =>
                  updateField(fieldGroup.id, field.id, {
                    variant: e.target.value as ButtonVariant,
                  })
                }
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="danger">Danger</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="link">Link</option>
                <option value="outline-primary">Outline primary</option>
                <option value="outline-secondary">Outline secondary</option>
                <option value="outline-success">Outline success</option>
                <option value="outline-danger">Outline danger</option>
                <option value="outline-warning">Outline warning</option>
                <option value="outline-info">Outline info</option>
                <option value="outline-light">Outline light</option>
                <option value="outline-dark">Outline dark</option>
              </Form.Select>
            </Form.Group>
          </>
        )}

        {(field.type === 'text' ||
          field.type === 'email' ||
          field.type === 'password' ||
          field.type === 'number' ||
          field.type === 'date' ||
          field.type === 'textarea') && (
          <Form.Group className="mb-3">
            <Form.Label>Placeholder</Form.Label>
            <Form.Control
              value={field.placeholder ?? ''}
              onChange={(e) =>
                updateField(fieldGroup.id, field.id, { placeholder: e.target.value })
              }
            />
          </Form.Group>
        )}

        {(field.type === 'select' || field.type === 'file') && (
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label={field.type === 'file' ? 'Allow multiple files' : 'Allow multiple selections'}
              checked={field.multiple ?? false}
              onChange={(e) => updateField(fieldGroup.id, field.id, { multiple: e.target.checked })}
            />
          </Form.Group>
        )}

        {field.type !== 'button' && (
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Required"
              checked={field.required}
              onChange={(e) => updateField(fieldGroup.id, field.id, { required: e.target.checked })}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Width</Form.Label>
          <Form.Select
            value={field.width}
            onChange={(e) =>
              updateField(fieldGroup.id, field.id, { width: e.target.value as FieldWidth })
            }
          >
            <option value="quarter">Quarter</option>
            <option value="half">Half</option>
            <option value="threeQuarters">Three quarters</option>
            <option value="full">Full</option>
          </Form.Select>
        </Form.Group>

        {(field.type === 'select' || field.type === 'radio') && (
          <Form.Group className="mb-3">
            <Form.Label>Options (one per line)</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={optionsText}
              onChange={(e) => {
                setOptionsText(e.target.value);
                updateField(fieldGroup.id, field.id, {
                  options: e.target.value.split('\n').filter((o) => o.trim() !== ''),
                });
              }}
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
