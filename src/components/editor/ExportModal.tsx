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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeJsx(value: string): string {
  return escapeHtml(value).replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
}

function fieldToHtml(f: FormField): string {
  const cols = WIDTH_TO_COLS[f.width];
  const name = escapeHtml(f.name);
  const label = escapeHtml(f.label);
  let control: string;

  switch (f.type) {
    case 'button':
      control = `<button type="${f.buttonType ?? 'submit'}" class="btn btn-${f.variant ?? 'primary'}">${label}</button>`;
      break;

    case 'textarea': {
      const placeholder = escapeHtml(f.placeholder ?? '');
      control = `<label for="${name}">${label}</label>\n      <textarea id="${name}" name="${name}" class="form-control" placeholder="${placeholder}" ${f.required ? 'required' : ''}></textarea>`;
      break;
    }

    case 'select': {
      const options = f.options.map((o) => `        <option>${escapeHtml(o)}</option>`).join('\n');
      control = `<label for="${name}">${label}</label>\n      <select id="${name}" name="${name}" class="form-select" ${f.multiple ? 'multiple' : ''} ${f.required ? 'required' : ''}>\n${options}\n      </select>`;
      break;
    }

    case 'radio': {
      const options = f.options
        .map((o, i) => {
          const opt = escapeHtml(o);
          return `        <div class="form-check">\n          <input id="${name}-${i}" name="${name}" type="radio" value="${opt}" class="form-check-input" ${f.required ? 'required' : ''} />\n          <label for="${name}-${i}" class="form-check-label">${opt}</label>\n        </div>`;
        })
        .join('\n');
      control = `<label class="form-label">${label}</label>\n      ${options}`;
      break;
    }

    case 'checkbox':
      control = `<div class="form-check">\n        <input id="${name}" name="${name}" type="checkbox" class="form-check-input" ${f.required ? 'required' : ''} />\n        <label for="${name}" class="form-check-label">${label}</label>\n      </div>`;
      break;

    case 'file':
      control = `<label for="${name}">${label}</label>\n      <input id="${name}" name="${name}" type="file" class="form-control" ${f.multiple ? 'multiple' : ''} ${f.required ? 'required' : ''} />`;
      break;

    default: {
      // narrows to TextLikeField
      const placeholder = escapeHtml(f.placeholder ?? '');
      control = `<label for="${name}">${label}</label>\n      <input id="${name}" name="${name}" type="${f.type}" class="form-control" placeholder="${placeholder}" ${f.required ? 'required' : ''} />`;
      break;
    }
  }

  return `    <div class="col-md-${cols}">\n      ${control}\n    </div>`;
}

function toHtml(groups: FormGroup[]): string {
  const sections = groups
    .map((g) => {
      const legend = g.title ? `    <legend>${escapeHtml(g.title)}</legend>\n` : '';
      const fields = g.fields.map(fieldToHtml).join('\n');
      return `  <fieldset>\n${legend}    <div class="row g-2">\n${fields}\n    </div>\n  </fieldset>`;
    })
    .join('\n\n');

  const bootstrapNote =
    "<!-- Uses plain Bootstrap 5 class names — requires Bootstrap CSS: https://getbootstrap.com/docs/5.3/getting-started/introduction/ -->\n<!-- Swap class names for Tailwind or your own CSS with a simple find-and-replace if you don't want Bootstrap. -->\n";

  return `${bootstrapNote}<form>\n${sections}\n</form>`;
}

function fieldToReact(f: FormField): string {
  const cols = WIDTH_TO_COLS[f.width];
  const name = escapeJsx(f.name);
  const label = escapeJsx(f.label);
  let control: string;

  switch (f.type) {
    case 'button':
      control = `<button type="${f.buttonType ?? 'submit'}" className="btn btn-${f.variant ?? 'primary'}">${label}</button>`;
      break;

    case 'textarea': {
      const placeholder = escapeJsx(f.placeholder ?? '');
      control = `<label htmlFor="${name}">${label}</label>\n          <textarea id="${name}" name="${name}" className="form-control" placeholder="${placeholder}" ${f.required ? 'required' : ''} />`;
      break;
    }

    case 'select': {
      const options = f.options
        .map((o) => `            <option>${escapeJsx(o)}</option>`)
        .join('\n');
      control = `<label htmlFor="${name}">${label}</label>\n          <select id="${name}" name="${name}" className="form-select" ${f.multiple ? 'multiple' : ''} ${f.required ? 'required' : ''}>\n${options}\n          </select>`;
      break;
    }

    case 'radio': {
      const options = f.options
        .map((o, i) => {
          const opt = escapeJsx(o);
          return `            <div className="form-check">\n              <input id="${name}-${i}" name="${name}" type="radio" value="${opt}" className="form-check-input" ${f.required ? 'required' : ''} />\n              <label htmlFor="${name}-${i}" className="form-check-label">${opt}</label>\n            </div>`;
        })
        .join('\n');
      control = `<label className="form-label">${label}</label>\n          ${options}`;
      break;
    }

    case 'checkbox':
      control = `<div className="form-check">\n            <input id="${name}" name="${name}" type="checkbox" className="form-check-input" ${f.required ? 'required' : ''} />\n            <label htmlFor="${name}" className="form-check-label">${label}</label>\n          </div>`;
      break;

    case 'file':
      control = `<label htmlFor="${name}">${label}</label>\n          <input id="${name}" name="${name}" type="file" className="form-control" ${f.multiple ? 'multiple' : ''} ${f.required ? 'required' : ''} />`;
      break;

    default: {
      const placeholder = escapeJsx(f.placeholder ?? '');
      control = `<label htmlFor="${name}">${label}</label>\n          <input id="${name}" name="${name}" type="${f.type}" className="form-control" placeholder="${placeholder}" ${f.required ? 'required' : ''} />`;
      break;
    }
  }

  return `        <div className="col-md-${cols}">\n          ${control}\n        </div>`;
}

function toReact(groups: FormGroup[]): string {
  const sections = groups
    .map((g) => {
      const legend = g.title ? `        <legend>${escapeJsx(g.title)}</legend>\n` : '';
      const fields = g.fields.map(fieldToReact).join('\n');
      return `      <fieldset>\n${legend}        <div className="row g-2">\n${fields}\n        </div>\n      </fieldset>`;
    })
    .join('\n');

  const bootstrapNote =
    '// Uses plain Bootstrap 5 class names — requires Bootstrap CSS: import "bootstrap/dist/css/bootstrap.min.css";\n// Swap class names for Tailwind or your own CSS with a simple find-and-replace if you don\'t want Bootstrap.\n';

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
        <Button variant="outline-secondary" onClick={handleCopy}>
          Copy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
