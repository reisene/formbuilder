'use client';

import { Button } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useFormStore } from '@/store/formStore';
import SortableGroup from './SortableGroup';

export default function FormCanvas() {
  const groups = useFormStore((s) => s.groups);
  const addGroup = useFormStore((s) => s.addGroup);
  const reorderFields = useFormStore((s) => s.reorderFields);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const group = groups.find((g) => g.fields.some((f) => f.id === active.id));
    if (!group) return;

    const from = group.fields.findIndex((f) => f.id === active.id);
    const to = group.fields.findIndex((f) => f.id === over.id);
    if (from === -1 || to === -1) return;

    reorderFields(group.id, from, to);
  };

  return (
    <div>
      {groups.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">Add a section to get started.</p>
          <Button variant="primary" onClick={() => addGroup()}>
            <BsPlusLg className="me-1" />
            Add section
          </Button>
        </div>
      ) : (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            {groups.map((group) => (
              <SortableGroup key={group.id} group={group} />
            ))}
          </DndContext>
          <Button variant="outline-primary" size="sm" onClick={() => addGroup()} className="mt-2">
            <BsPlusLg className="me-1" />
            Add section
          </Button>
        </>
      )}
    </div>
  );
}
