import { WIDTH_TO_COLS } from '../fieldWidth';
import type { FormField, FormGroup } from '@/types/form';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

export function toHtml(groups: FormGroup[]): string {
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
