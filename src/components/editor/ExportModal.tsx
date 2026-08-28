'use client';

import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { Modal, Nav, Button, Alert } from 'react-bootstrap';
import { useFormStore } from '@/store/formStore';

import {
  handleDownloadJson,
  handleCopyText,
  type ExportFormat,
  type ExportModalProps,
} from '@/lib/export';
import { generateFormCode } from '@/lib/generators';

export default function ExportModal({ show, onHide }: ExportModalProps) {
  const groups = useFormStore((s) => s.groups);
  const [format, setFormat] = useState<ExportFormat>('json');
  const [copied, setCopied] = useState(false);
  const [copyErr, setCopyErr] = useState<string | null>(null);
  const [downloadErr, setDownloadErr] = useState<string | null>(null);

  const code = generateFormCode(format, groups);

  const handleCopy = () => {
    setCopyErr(null);

    handleCopyText(code, {
      formatTag: format,
      onSuccess: () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      onError: () => {
        setCopyErr(
          'Failed to copy, Please try again later or select the code and press Ctrl+C/Cmd+C',
        );
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Export</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav
          variant="tabs"
          activeKey={format}
          onSelect={(k) => {
            setFormat(k as ExportFormat);
          }}
        >
          <Nav.Item>
            <Nav.Link eventKey="json">JSON</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="html">HTML</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="react">React</Nav.Link>
          </Nav.Item>
        </Nav>

        {(copyErr || downloadErr) && (
          <Alert
            variant="danger"
            className="mt-3 mb-0"
            onClose={() => {
              setCopyErr(null);
              setDownloadErr(null);
            }}
            dismissible
          >
            {copyErr || downloadErr}
          </Alert>
        )}

        {(format === 'html' || format === 'react') && (
          <Alert variant="info" className="mt-3 mb-0">
            This code uses plain Bootstrap 5 class names (<code>row</code>, <code>col-md-*</code>,{' '}
            <code>form-control</code>) and requires Bootstrap CSS loaded on the page. Since these
            are just class name strings, you can swap them for Tailwind or your own CSS with a
            simple find-and-replace.
          </Alert>
        )}

        <pre className="mt-3 p-3 bg-body-secondary rounded" style={{ whiteSpace: 'pre-wrap' }}>
          {code}
        </pre>
      </Modal.Body>
      <Modal.Footer>
        {format === 'json' && (
          <Button
            variant={downloadErr ? 'outline-danger' : 'outline-primary'}
            onClick={() => {
              setDownloadErr(null);
              handleDownloadJson(code, {
                onError: (err) => {
                  setDownloadErr('Failed to download the file. Please try again.');
                  Sentry.captureException(err, {
                    tags: { mechanism: 'download-json-action' },
                  });
                },
              });
            }}
            className="me-auto"
          >
            Download .json file
          </Button>
        )}
        <Button
          variant={copyErr ? 'outline-danger' : copied ? 'outline-success' : 'primary'}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
