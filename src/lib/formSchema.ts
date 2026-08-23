import { z } from 'zod';

const fieldWidthSchema = z.enum(['quarter', 'half', 'threeQuarters', 'full']);
const buttonTypeSchema = z.enum(['submit', 'reset', 'button']);
const buttonVariantSchema = z.enum([
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
  'link',
  'outline-primary',
  'outline-secondary',
  'outline-success',
  'outline-danger',
  'outline-warning',
  'outline-info',
  'outline-light',
  'outline-dark',
]);

const baseFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string(),
  required: z.boolean(),
  width: fieldWidthSchema,
});

const formFieldSchema = z.discriminatedUnion('type', [
  baseFieldSchema.extend({
    type: z.enum(['text', 'email', 'password', 'number', 'date']),
    placeholder: z.string().optional(),
  }),
  baseFieldSchema.extend({ type: z.literal('textarea'), placeholder: z.string().optional() }),
  baseFieldSchema.extend({
    type: z.literal('select'),
    options: z.array(z.string()),
    multiple: z.boolean().optional(),
  }),
  baseFieldSchema.extend({ type: z.literal('radio'), options: z.array(z.string()) }),
  baseFieldSchema.extend({ type: z.literal('checkbox') }),
  baseFieldSchema.extend({ type: z.literal('file'), multiple: z.boolean().optional() }),
  baseFieldSchema.extend({
    type: z.literal('button'),
    buttonType: buttonTypeSchema.optional(),
    variant: buttonVariantSchema.optional(),
  }),
]);

const formGroupSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  fields: z.array(formFieldSchema),
});

export const persistedStateSchema = z.object({
  groups: z.array(formGroupSchema),
});
