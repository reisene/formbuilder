'use client';

import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useFormStore } from '@/store/formStore';
import { parseImportedGroups } from '@/lib/formSchema';

interface ImportModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ImportModal({ show, onHide }: ImportModalProps) {
  const groups = useFormStore((s) => s.groups);
  const loadGroups = useFormStore((s) => s.loadGroups);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setText(typeof reader.result === 'string' ? reader.result : '');
      setError(null);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    setError(null);
    const result = parseImportedGroups(text);

    if (!result.success || !result.groups) {
      setError(result.error ?? 'Something went wrong while importing.');
      return;
    }

    const hasExistingWork = groups.length > 0;
    if (
      hasExistingWork &&
      !window.confirm('Importing will replace your current form. This cannot be undone. Continue?')
    ) {
      return;
    }

    loadGroups(result.groups);
    setText('');
    onHide();
  };

  const handleClose = () => {
    setText('');
    setError(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Import</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Upload a .json file</Form.Label>
          <Form.Control type="file" accept="application/json" onChange={handleFileChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Or paste JSON</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
            placeholder="Paste exported form JSON here…"
          />
        </Form.Group>

        {error && (
          <Alert variant="danger" className="mb-0">
            {error}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleImport} disabled={text.trim() === ''}>
          Import
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
