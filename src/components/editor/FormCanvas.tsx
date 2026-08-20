// components/editor/FormCanvas.tsx
'use client';

import { Button } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import { useFormStore } from '@/store/formStore';
import SortableGroup from './SortableGroup';

export default function FormCanvas() {
  const groups = useFormStore((s) => s.groups);
  const addGroup = useFormStore((s) => s.addGroup);

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
          {groups.map((group) => (
            <SortableGroup key={group.id} group={group} />
          ))}
          <Button variant="outline-primary" size="sm" onClick={() => addGroup()} className="mt-2">
            <BsPlusLg className="me-1" />
            Add section
          </Button>
        </>
      )}
    </div>
  );
}
