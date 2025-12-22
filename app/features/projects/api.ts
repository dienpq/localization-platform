import { PROJECT_ENDPOINTS } from './enpoints';
import type {
  GetAllMembersByProjectResponse,
  GetAllProjectsResponse,
  GetAllTranslationsByProjectResponse,
  GetProjectResponse,
  MemberSchema,
  ProjectSchema,
  SearchParamsProjectSchema,
  TranslationSchema,
} from './types';
import api from '~/config/api';

export async function getAllProjects(
  queryParams?: SearchParamsProjectSchema,
): Promise<GetAllProjectsResponse> {
  const response = await api.get<GetAllProjectsResponse>(
    PROJECT_ENDPOINTS.GET_ALL,
    {
      params: queryParams,
    },
  );
  return response.data;
}

export async function getProject(
  projectId: string,
): Promise<GetProjectResponse> {
  const response = await api.get<GetProjectResponse>(
    PROJECT_ENDPOINTS.GET(projectId),
  );
  return response.data;
}

export async function createProject(data: ProjectSchema): Promise<unknown> {
  const response = await api.post<unknown>(PROJECT_ENDPOINTS.CREATE, data);
  return response.data;
}

export async function updateProject(
  projectId: string,
  data: ProjectSchema,
): Promise<unknown> {
  const response = await api.patch<unknown>(
    PROJECT_ENDPOINTS.UPDATE(projectId),
    data,
  );
  return response.data;
}

export async function deleteProject(projectId: string): Promise<unknown> {
  const response = await api.delete<unknown>(
    PROJECT_ENDPOINTS.DELETE(projectId),
  );
  return response.data;
}

export async function getAllMembersByProject(
  projectId: string,
): Promise<GetAllMembersByProjectResponse> {
  const response = await api.get<GetAllMembersByProjectResponse>(
    PROJECT_ENDPOINTS.MEMBERS.GET_ALL(projectId),
  );
  return response.data;
}

export async function inviteMemberByProject(
  projectId: string,
  data: MemberSchema,
): Promise<unknown> {
  const response = await api.post<unknown>(
    PROJECT_ENDPOINTS.MEMBERS.INVITE(projectId),
    data,
  );
  return response.data;
}

export async function removeMemberByProject(
  projectId: string,
  memberId: string,
): Promise<unknown> {
  const response = await api.delete<unknown>(
    PROJECT_ENDPOINTS.MEMBERS.REMOVE(projectId, memberId),
  );
  return response.data;
}

export async function getAllTranslationsByProject(
  projectId: string,
): Promise<GetAllTranslationsByProjectResponse> {
  const response = await api.get<GetAllTranslationsByProjectResponse>(
    PROJECT_ENDPOINTS.TRANSLATIONS.GET_ALL(projectId),
  );
  return response.data;
}

export async function createTranslationByProject(
  projectId: string,
  data: TranslationSchema,
): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.TRANSLATIONS.CREATE(projectId), data);
}

export async function updateTranslationByProject(
  projectId: string,
  translationId: string,
  data: TranslationSchema,
): Promise<void> {
  await api.patch(
    PROJECT_ENDPOINTS.TRANSLATIONS.UPDATE(projectId, translationId),
    data,
  );
}

export async function deleteTranslationByProject(
  projectId: string,
  translationId: string,
): Promise<void> {
  await api.delete(
    PROJECT_ENDPOINTS.TRANSLATIONS.DELETE(projectId, translationId),
  );
}

export async function rejectProject(projectId: string): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.REJECT(projectId));
}

export async function approveProject(projectId: string): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.APPROVE(projectId));
}

export async function leaveProject(projectId: string): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.LEAVE(projectId));
}
