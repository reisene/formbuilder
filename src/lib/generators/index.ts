import { toHtml } from './html';
import { toReact } from './react';
import { toJson } from './json';

import type { FormGroup } from '@/types/form';

export function generateFormCode(format: 'json' | 'html' | 'react', groups: FormGroup[]): string {
  switch (format) {
    case 'json':
      return toJson(groups);

    case 'html':
      return toHtml(groups);

    case 'react':
      return toReact(groups);

    default:
      return '';
  }
}
