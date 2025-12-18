import z from 'zod';
import { Locale } from '~/enum/locale';
import { ProjectMemberStatus } from '~/enum/project-member';

export const searchParamsProjectSchema = z.object({
  status: z
    .enum(ProjectMemberStatus)
    .default(ProjectMemberStatus.ACCEPTED)
    .catch(ProjectMemberStatus.ACCEPTED)
    .optional(),
});

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, {
      error: 'Project name is required',
    })
    .max(100),
  image: z.string().optional(),
});

export const memberSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
});

export const translationSchema = z.object({
  name: z.string().min(1, {
    error: 'Translation group name is required',
  }),
  key: z.string().min(1, {
    error: 'Translation group key is required',
  }),
  parentId: z
    .cuid({
      error: 'Parent translation group ID must be a valid CUID',
    })
    .nullish(),
  keys: z.array(
    z.object({
      key: z.string().optional(),
      values: z.array(
        z.object({
          locale: z.enum(Locale, {
            error: 'Locale is required',
          }),
          value: z.string().optional(),
        }),
      ),
    }),
  ),
});
