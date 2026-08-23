'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BsGripVertical } from 'react-icons/bs';
import type { FormGroup } from '@/types/form';
import SortableGroup from './SortableGroup';

export default function SortableSection({ group }: { group: FormGroup }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `section-${group.id}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="d-flex align-items-start gap-2 mb-3">
      <span
        {...attributes}
        {...listeners}
        className="pt-3"
        style={{ cursor: 'grab', touchAction: 'none' }}
        aria-label="Drag to reorder section"
      >
        <BsGripVertical size={20} />
      </span>
      <div className="flex-grow-1">
        <SortableGroup group={group} />
      </div>
    </div>
  );
}
