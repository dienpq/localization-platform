import type { User } from '../user';
import {
  memberSchema,
  projectSchema,
  searchParamsProjectSchema,
  translationSchema,
} from './schema';
import z from 'zod';
import type { Locale } from '~/enum/locale';
import type {
  ProjectMemberRole,
  ProjectMemberStatus,
} from '~/enum/project-member';

export type SearchParamsProjectSchema = z.infer<
  typeof searchParamsProjectSchema
>;
export type ProjectSchema = z.infer<typeof projectSchema>;
export type MemberSchema = z.infer<typeof memberSchema>;
export type TranslationSchema = z.infer<typeof translationSchema>;

export interface Project {
  id: string;
  name: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllProjectsResponse {
  data: (Project & {
    status: ProjectMemberStatus;
    role: ProjectMemberRole;
    invitedBy?: User;
  })[];
  total: number;
}
export type GetProjectResponse = Project;
export interface GetAllMembersByProjectResponse {
  data: (User & {
    project: { role: ProjectMemberRole; status: ProjectMemberStatus };
  })[];
  total: number;
}
export interface TranslationGroup {
  id: string;
  name: string;
  key: string;
  path: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}
export interface TranslationKey {
  id: string;
  key: string;
  fullKey: string;
  createdAt: string;
  updatedAt: string;
}
export interface TranslationValue {
  id: string;
  locale: Locale;
  value: string;
  createdAt: string;
  updatedAt: string;
}
export interface GetAllTranslationsByProjectResponse {
  data: (TranslationGroup & {
    keys: (TranslationKey & {
      values: TranslationValue[];
    })[];
  })[];
  total: number;
}
