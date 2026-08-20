'use client';

import { Modal, Row, Col } from 'react-bootstrap';
import { useFormStore } from '@/store/formStore';
import { WIDTH_TO_COLS } from '@/lib/fieldWidth';
import FieldPreview from './FieldPreview';

interface PreviewPanelProps {
  show: boolean;
  onHide: () => void;
}

export default function PreviewPanel({ show, onHide }: PreviewPanelProps) {
  const groups = useFormStore((s) => s.groups);

  return (
    <Modal show={show} onHide={onHide} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {groups.length === 0 ? (
          <p className="text-muted">The form is empty.</p>
        ) : (
          groups.map((group) => (
            <fieldset key={group.id} className="mb-4">
              {group.title && <legend>{group.title}</legend>}
              <Row className="g-2">
                {group.fields.map((field) => (
                  <Col key={field.id} md={WIDTH_TO_COLS[field.width]}>
                    <FieldPreview field={field} disabled={false} />
                  </Col>
                ))}
              </Row>
            </fieldset>
          ))
        )}
      </Modal.Body>
    </Modal>
  );
}
