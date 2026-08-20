'use client';

import { useState } from 'react';
import { Modal, Nav, Button, Alert } from 'react-bootstrap';
import { useFormStore } from '@/store/formStore';
import { WIDTH_TO_COLS } from '@/lib/fieldWidth';
import type { FormField, FormGroup } from '@/types/form';

type ExportFormat = 'json' | 'html' | 'react';

function toJson(groups: FormGroup[]): string {
  return JSON.stringify(groups, null, 2);
}

function fieldToHtml(f: FormField): string {
  const cols = WIDTH_TO_COLS[f.width];
  let control: string;

  if (f.type === 'textarea') {
    control = `<label for="${f.name}">${f.label}</label>\n      <textarea id="${f.name}" name="${f.name}" class="form-control" placeholder="${f.placeholder ?? ''}" ${f.required ? 'required' : ''}></textarea>`;
  } else if (f.type === 'select') {
    const options = f.options?.map((o) => `        <option>${o}</option>`).join('\n') ?? '';
    control = `<label for="${f.name}">${f.label}</label>\n      <select id="${f.name}" name="${f.name}" class="form-select" ${f.required ? 'required' : ''}>\n${options}\n      </select>`;
  } else {
    control = `<label for="${f.name}">${f.label}</label>\n      <input id="${f.name}" name="${f.name}" type="${f.type}" class="form-control" placeholder="${f.placeholder ?? ''}" ${f.required ? 'required' : ''} />`;
  }

  return `    <div class="col-md-${cols}">\n      ${control}\n    </div>`;
}

function toHtml(groups: FormGroup[]): string {
  const sections = groups
    .map((g) => {
      const legend = g.title ? `    <legend>${g.title}</legend>\n` : '';
      const fields = g.fields.map(fieldToHtml).join('\n');
      return `  <fieldset>\n${legend}    <div class="row g-2">\n${fields}\n    </div>\n  </fieldset>`;
    })
    .join('\n\n');

  const bootstrapNote =
    '<!-- Requires Bootstrap 5 CSS: https://getbootstrap.com/docs/5.3/getting-started/introduction/ -->\n';

  return `${bootstrapNote}<form>\n${sections}\n</form>`;
}

function fieldToReact(f: FormField): string {
  const cols = WIDTH_TO_COLS[f.width];
  let control: string;

  if (f.type === 'textarea') {
    control = `<label htmlFor="${f.name}">${f.label}</label>\n          <textarea id="${f.name}" name="${f.name}" className="form-control" placeholder="${f.placeholder ?? ''}" ${f.required ? 'required' : ''} />`;
  } else {
    control = `<label htmlFor="${f.name}">${f.label}</label>\n          <input id="${f.name}" name="${f.name}" type="${f.type}" className="form-control" placeholder="${f.placeholder ?? ''}" ${f.required ? 'required' : ''} />`;
  }

  return `        <div className="col-md-${cols}">\n          ${control}\n        </div>`;
}

function toReact(groups: FormGroup[]): string {
  const sections = groups
    .map((g) => {
      const legend = g.title ? `        <legend>${g.title}</legend>\n` : '';
      const fields = g.fields.map(fieldToReact).join('\n');
      return `      <fieldset>\n${legend}        <div className="row g-2">\n${fields}\n        </div>\n      </fieldset>`;
    })
    .join('\n');

  const bootstrapNote =
    '// Requires Bootstrap 5 CSS imported globally: import "bootstrap/dist/css/bootstrap.min.css";\n';

  return `${bootstrapNote}function GeneratedForm() {\n  return (\n    <form>\n${sections}\n    </form>\n  );\n}`;
}

interface ExportModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ExportModal({ show, onHide }: ExportModalProps) {
  const groups = useFormStore((s) => s.groups);
  const [format, setFormat] = useState<ExportFormat>('json');

  const code =
    format === 'json' ? toJson(groups) : format === 'html' ? toHtml(groups) : toReact(groups);

  const handleCopy = () => navigator.clipboard.writeText(code);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Export</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav variant="tabs" activeKey={format} onSelect={(k) => setFormat(k as ExportFormat)}>
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

        {(format === 'html' || format === 'react') && (
          <Alert variant="info" className="mt-3 mb-0">
            This code uses Bootstrap 5 classes (<code>row</code>, <code>col-md-*</code>,{' '}
            <code>form-control</code>) and requires Bootstrap CSS to be loaded on the page where you
            use it.
          </Alert>
        )}

        <pre className="mt-3 p-3 bg-body-secondary rounded" style={{ whiteSpace: 'pre-wrap' }}>
          {code}
        </pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleCopy}>
          Copy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
