'use client';

import { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useFormStore } from '@/store/formStore';
import EditorToolbar from '@/components/editor/EditorToolbar';
import FieldPalette from '@/components/editor/FieldPalette';
import FormCanvas from '@/components/editor/FormCanvas';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import PreviewPanel from '@/components/editor/PreviewPanel';
import ExportModal from '@/components/editor/ExportModal';
import ImportModal from '@/components/editor/ImportModal';

export default function EditorPage() {
  const selectedGroupId = useFormStore((s) => s.selectedGroupId);
  const hasHydrated = useFormStore((s) => s.hasHydrated);
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);

  if (!hasHydrated) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '60vh' }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading editor…</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <EditorToolbar
        onPreview={() => {
          setShowPreview(true);
        }}
        onExport={() => {
          setShowExport(true);
        }}
        onImport={() => {
          setShowImport(true);
        }}
      />

      <Container fluid>
        <Row>
          <Col md={3} className="border-end p-3">
            <FieldPalette groupId={selectedGroupId} />
          </Col>

          <Col md={6} className="p-3">
            <FormCanvas />
          </Col>

          <Col md={3} className="border-start p-3">
            <PropertiesPanel />
          </Col>
        </Row>
      </Container>

      <ImportModal
        show={showImport}
        onHide={() => {
          setShowImport(false);
        }}
      />
      <PreviewPanel
        show={showPreview}
        onHide={() => {
          setShowPreview(false);
        }}
      />
      <ExportModal
        show={showExport}
        onHide={() => {
          setShowExport(false);
        }}
      />
    </>
  );
}
