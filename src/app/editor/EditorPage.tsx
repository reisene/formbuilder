'use client';

import { useState } from 'react';
import { Container, Row, Col, Spinner, Offcanvas, Button } from 'react-bootstrap';
import { useFormStore } from '@/store/formStore';
import EditorToolbar from '@/components/editor/EditorToolbar';
import FieldPalette from '@/components/editor/FieldPalette';
import FormCanvas from '@/components/editor/FormCanvas';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import PreviewPanel from '@/components/editor/PreviewPanel';
import ExportModal from '@/components/editor/ExportModal';
import ImportModal from '@/components/editor/ImportModal';

type Overlay = 'preview' | 'export' | 'import' | 'palette' | 'properties' | null;

export default function EditorPage() {
  const selectedGroupId = useFormStore((s) => s.selectedGroupId);
  const hasHydrated = useFormStore((s) => s.hasHydrated);
  const [activeOverlay, setActiveOverlay] = useState<Overlay>(null);
  const closeOverlay = () => setActiveOverlay(null);

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
          setActiveOverlay('preview');
        }}
        onExport={() => {
          setActiveOverlay('export');
        }}
        onImport={() => {
          setActiveOverlay('import');
        }}
      />

      <div className="d-flex d-md-none justify-content-between p-2 border-bottom">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            setActiveOverlay('palette');
          }}
        >
          Fields
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            setActiveOverlay('properties');
          }}
        >
          Properties
        </Button>
      </div>

      <Container fluid>
        <Row>
          <Col md={3} className="d-none d-md-block border-end p-3">
            <FieldPalette groupId={selectedGroupId} />
          </Col>

          <Col md={6} className="p-3">
            <FormCanvas />
          </Col>

          <Col md={3} className="d-none d-md-block border-start p-3">
            <PropertiesPanel />
          </Col>
        </Row>
      </Container>

      <Offcanvas show={activeOverlay === 'palette'} onHide={closeOverlay} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Fields</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FieldPalette groupId={selectedGroupId} />
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={activeOverlay === 'properties'} onHide={closeOverlay} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Properties</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <PropertiesPanel />
        </Offcanvas.Body>
      </Offcanvas>

      <PreviewPanel show={activeOverlay === 'preview'} onHide={closeOverlay} />
      <ExportModal show={activeOverlay === 'export'} onHide={closeOverlay} />
      <ImportModal show={activeOverlay === 'import'} onHide={closeOverlay} />
    </>
  );
}
