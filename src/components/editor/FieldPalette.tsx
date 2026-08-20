'use client';

import { Button, Stack } from 'react-bootstrap';
import { useFormStore } from '@/store/formStore';
import type { FieldType } from '@/types/form';

const FIELD_TYPES: { type: FieldType; label: string }[] = [
  { type: 'text', label: 'Text' },
  { type: 'email', label: 'Email' },
  { type: 'number', label: 'Number' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'select', label: 'Select' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'radio', label: 'Radio' },
  { type: 'date', label: 'Date' },
  { type: 'file', label: 'File' },
];

interface FieldPaletteProps {
  groupId: string | null;
}

export default function FieldPalette({ groupId }: FieldPaletteProps) {
  const addField = useFormStore((s) => s.addField);

  return (
    <Stack gap={2}>
      {FIELD_TYPES.map(({ type, label }) => (
        <Button
          key={type}
          variant="outline-primary"
          disabled={!groupId}
          onClick={() => groupId && addField(groupId, type)}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
}
