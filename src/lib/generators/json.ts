import type { FormGroup } from '@/types/form';

export function toJson(groups: FormGroup[]): string {
  return JSON.stringify(groups, null, 2);
}
