'use client';

import { Button } from 'react-bootstrap';

interface EditorToolbarProps {
  onPreview: () => void;
  onExport: () => void;
  onImport: () => void;
}

export default function EditorToolbar({ onPreview, onExport, onImport }: EditorToolbarProps) {
  return (
    <div className="d-flex justify-content-end gap-2 p-2 border-bottom">
      <Button variant="outline-secondary" onClick={onImport}>
        Import
      </Button>
      <Button variant="outline-secondary" onClick={onPreview}>
        Preview
      </Button>
      <Button variant="primary" onClick={onExport}>
        Export
      </Button>
    </div>
  );
}
