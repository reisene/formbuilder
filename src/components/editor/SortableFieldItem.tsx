'use client';

import { Button } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { useFormStore } from '@/store/formStore';
import type { FormField } from '@/types/form';
import FieldPreview from './FieldPreview';

interface SortableFieldItemProps {
  groupId: string;
  field: FormField;
}

export default function SortableFieldItem({ groupId, field }: SortableFieldItemProps) {
  const selectedFieldId = useFormStore((s) => s.selectedFieldId);
  const selectField = useFormStore((s) => s.selectField);
  const removeField = useFormStore((s) => s.removeField);

  const isSelected = field.id === selectedFieldId;

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectField(field.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeField(groupId, field.id);
  };

  return (
    <div
      onClick={handleSelect}
      className={`border rounded p-2 mb-2 position-relative ${isSelected ? 'border-primary' : ''}`}
    >
      <Button
        variant="outline-danger"
        size="sm"
        className="position-absolute top-0 end-0 m-1"
        onClick={handleRemove}
        aria-label="Delete field"
      >
        <BsTrash />
      </Button>
      <FieldPreview field={field} />
    </div>
  );
}
