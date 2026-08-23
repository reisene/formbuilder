'use client';

import { Button, Row, Col } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useFormStore } from '@/store/formStore';
import type { FormGroup } from '@/types/form';
import { WIDTH_TO_COLS } from '@/lib/fieldWidth';
import SortableFieldItem from './SortableFieldItem';

export default function SortableGroup({ group }: { group: FormGroup }) {
  const selectedGroupId = useFormStore((s) => s.selectedGroupId);
  const selectGroup = useFormStore((s) => s.selectGroup);
  const removeGroup = useFormStore((s) => s.removeGroup);

  const isSelected = group.id === selectedGroupId;
  const isEmpty = group.fields.length === 0;

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: group.id,
    disabled: !isEmpty,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeGroup(group.id);
  };

  return (
    <div className={`border rounded p-3 mb-3 ${isSelected ? 'border-primary' : ''}`}>
      <div
        onClick={() => selectGroup(group.id)}
        className="d-flex justify-content-between align-items-center mb-2"
        style={{ cursor: 'pointer' }}
      >
        <strong>{group.title || 'Untitled section'}</strong>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleRemove}
          aria-label="Delete section"
        >
          <BsTrash />
        </Button>
      </div>

      {isEmpty ? (
        <div
          ref={setDroppableRef}
          className={`text-muted text-center py-3 rounded ${isOver ? 'bg-body-secondary border border-primary' : ''}`}
        >
          No fields yet — add one from the panel on the left, or drag one here.
        </div>
      ) : (
        <SortableContext items={group.fields.map((f) => f.id)} strategy={rectSortingStrategy}>
          <Row className="g-2">
            {group.fields.map((field) => (
              <Col key={field.id} md={WIDTH_TO_COLS[field.width]}>
                <SortableFieldItem groupId={group.id} field={field} />
              </Col>
            ))}
          </Row>
        </SortableContext>
      )}
    </div>
  );
}
