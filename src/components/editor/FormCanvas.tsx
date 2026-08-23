'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useFormStore } from '@/store/formStore';
import SortableSection from './SortableSection';
import FieldPreview from './FieldPreview';

export default function FormCanvas() {
  const groups = useFormStore((s) => s.groups);
  const addGroup = useFormStore((s) => s.addGroup);
  const reorderFields = useFormStore((s) => s.reorderFields);
  const reorderGroups = useFormStore((s) => s.reorderGroups);
  const moveFieldToGroup = useFormStore((s) => s.moveFieldToGroup);

  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const findGroupByFieldId = (fieldId: string) =>
    groups.find((g) => g.fields.some((f) => f.id === fieldId));

  const findGroupById = (groupId: string) => groups.find((g) => g.id === groupId);

  const isSectionId = (id: string) => id.startsWith('section-');

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id as string;
    if (!isSectionId(id)) {
      setActiveFieldId(id);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId || isSectionId(activeId)) return;

    const fromGroup = findGroupByFieldId(activeId);
    if (!fromGroup) return;

    const overIsEmptyGroup = findGroupById(overId);
    const toGroup = overIsEmptyGroup ?? findGroupByFieldId(overId);
    if (!toGroup || fromGroup.id === toGroup.id) return;

    const toIndex = overIsEmptyGroup
      ? toGroup.fields.length
      : toGroup.fields.findIndex((f) => f.id === overId);

    moveFieldToGroup(
      activeId,
      fromGroup.id,
      toGroup.id,
      toIndex === -1 ? toGroup.fields.length : toIndex,
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveFieldId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (isSectionId(activeId)) {
      const from = groups.findIndex((g) => `section-${g.id}` === activeId);
      const to = groups.findIndex((g) => `section-${g.id}` === overId);
      if (from === -1 || to === -1) return;
      reorderGroups(from, to);
      return;
    }

    const group = findGroupByFieldId(activeId);
    if (!group) return;

    const overGroup = findGroupByFieldId(overId);
    if (!overGroup || overGroup.id !== group.id) return;

    const from = group.fields.findIndex((f) => f.id === activeId);
    const to = group.fields.findIndex((f) => f.id === overId);
    if (from === -1 || to === -1) return;

    reorderFields(group.id, from, to);
  };

  const activeField = activeFieldId
    ? groups.flatMap((g) => g.fields).find((f) => f.id === activeFieldId)
    : null;

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
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={groups.map((g) => `section-${g.id}`)}
              strategy={verticalListSortingStrategy}
            >
              {groups.map((group) => (
                <SortableSection key={group.id} group={group} />
              ))}
            </SortableContext>
            <DragOverlay>{activeField ? <FieldPreview field={activeField} /> : null}</DragOverlay>
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
