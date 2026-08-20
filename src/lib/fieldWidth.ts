import type { FieldWidth } from '@/types/form';

export const WIDTH_TO_COLS: Record<FieldWidth, number> = {
  quarter: 3,
  half: 6,
  threeQuarters: 9,
  full: 12,
};
