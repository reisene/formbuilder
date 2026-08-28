import { WIDTH_TO_COLS } from '../fieldWidth';
import type { FormField, FormGroup } from '@/types/form';
import { escapeHtml } from './html';

function escapeJsx(value: string): string {
  return escapeHtml(value).replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
}

function requiredMarkJsx(required: boolean): string {
  return required
    ? ' <span className="text-danger" aria-hidden="true">*</span><span className="visually-hidden"> (required)</span>'
    : '';
}

function fieldToReact(f: FormField): string {
  const cols = WIDTH_TO_COLS[f.width];
  const name = escapeJsx(f.name);
  const label = escapeJsx(f.label);
  const mark = requiredMarkJsx(f.required);
  let control: string;

  switch (f.type) {
    case 'button':
      control = `<button type="${f.buttonType ?? 'submit'}" className="btn btn-${f.variant ?? 'primary'}">${label}</button>`;
      break;

    case 'textarea': {
      const placeholder = escapeJsx(f.placeholder ?? '');
      control = `<label htmlFor="${name}">${label}${mark}</label>\n          <textarea id="${name}" name="${name}" className="form-control" placeholder="${placeholder}" ${f.required ? 'required' : ''} />`;
      break;
    }

    case 'select': {
      const options = f.options
        .map((o) => `            <option>${escapeJsx(o)}</option>`)
        .join('\n');
      control = `<label htmlFor="${name}">${label}${mark}</label>\n          <select id="${name}" name="${name}" className="form-select" ${f.multiple ? 'multiple' : ''} ${f.required ? 'required' : ''}>\n${options}\n          </select>`;
      break;
    }

    case 'radio': {
      const options = f.options
        .map((o, i) => {
          const opt = escapeJsx(o);
          return `            <div className="form-check">\n              <input id="${name}-${i}" name="${name}" type="radio" value="${opt}" className="form-check-input" ${f.required ? 'required' : ''} />\n              <label htmlFor="${name}-${i}" className="form-check-label">${opt}</label>\n            </div>`;
        })
        .join('\n');
      control = `<label className="form-label">${label}${mark}</label>\n          ${options}`;
      break;
    }

    case 'checkbox':
      control = `<div className="form-check">\n            <input id="${name}" name="${name}" type="checkbox" className="form-check-input" ${f.required ? 'required' : ''} />\n            <label htmlFor="${name}" className="form-check-label">${label}${mark}</label>\n          </div>`;
      break;

    case 'file':
      control = `<label htmlFor="${name}">${label}${mark}</label>\n          <input id="${name}" name="${name}" type="file" className="form-control" ${f.multiple ? 'multiple' : ''} ${f.required ? 'required' : ''} />`;
      break;

    default: {
      const placeholder = escapeJsx(f.placeholder ?? '');
      control = `<label htmlFor="${name}">${label}${mark}</label>\n          <input id="${name}" name="${name}" type="${f.type}" className="form-control" placeholder="${placeholder}" ${f.required ? 'required' : ''} />`;
      break;
    }
  }

  return `        <div className="col-md-${cols}">\n          ${control}\n        </div>`;
}

export function toReact(groups: FormGroup[]): string {
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
