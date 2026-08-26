import type { IconType } from 'react-icons';
import { BsBoxArrowUpRight, BsBraces, BsCursorFill, BsEye, BsSliders } from 'react-icons/bs';

export const feat: { title: string; text: string; Icon: IconType }[] = [
  {
    title: 'Drag & Drop',
    text: 'Build forms without code. Just select what you need and drop it where you want.',
    Icon: BsCursorFill,
  },
  {
    title: 'Export everywhere',
    text: 'Export your form to HTML, React component or JSON schema - build once, use anywhere.',
    Icon: BsBoxArrowUpRight,
  },
  {
    title: 'Form as schema',
    text: 'Your form is data. Store, version and share the JSON schema, then recreate it anywhere.',
    Icon: BsBraces,
  },
  {
    title: 'Live preview',
    text: 'See exactly how your form looks as you build it, before you export a single line of code.',
    Icon: BsEye,
  },
  {
    title: 'Custom fields',
    text: 'Create your own reusable field types and use them across every form you build.',
    Icon: BsSliders,
  },
];

export const strings = ['Build forms', 'Visually', 'Without code'];

import {
  BsPencilSquare,
  BsDownload,
  BsArrowRight,
  BsArrowDown,
  BsCheck2Square,
} from 'react-icons/bs';

interface Step {
  id: number;
  title: string;
  description: string;
  Icon: IconType;
}

export const steps: Step[] = [
  {
    id: 1,
    title: 'Drag & Drop',
    description: 'Add fields to your form with intuitive drag and drop.',
    Icon: BsPencilSquare,
  },
  {
    id: 2,
    title: 'Validation',
    description: 'Configure validation rules, labels, and requirements.',
    Icon: BsCheck2Square,
  },
  {
    id: 3,
    title: 'Export',
    description: 'Export ready-to-use form to HTML, React, or JSON schema.',
    Icon: BsDownload,
  },
];

export const previewImg = [
  {
    id: 1,
    src: '/preview1.png',
    alt: 'Editor page',
    height: 450,
  },
  {
    id: 2,
    src: '/preview2.png',
    alt: 'Preview Modal',
    height: 450,
  },
  {
    id: 3,
    src: '/preview3.png',
    alt: 'Export Modal',
    height: 950,
  },
];

export type PreviewImage = (typeof previewImg)[number];
