'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'react-bootstrap';
import { BsTrash, BsGripVertical } from 'react-icons/bs';
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

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

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
      ref={setNodeRef}
      style={style}
      onClick={handleSelect}
      className={`border rounded p-2 mb-2 position-relative ${isSelected ? 'border-primary' : ''}`}
    >
      <div className="d-flex align-items-start gap-1">
        <span
          {...attributes}
          {...listeners}
          className="pt-1"
          style={{ cursor: 'grab', touchAction: 'none' }}
          aria-label="Drag to reorder"
        >
          <BsGripVertical />
        </span>
        <div className="flex-grow-1">
          <FieldPreview field={field} />
        </div>
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        className="position-absolute top-0 end-0 m-1"
        onClick={handleRemove}
        aria-label="Delete field"
      >
        <BsTrash />
      </Button>
    </div>
  );
}
