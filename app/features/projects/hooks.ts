import {
  approveProject,
  createProject,
  createTranslationByProject,
  deleteProject,
  deleteTranslationByProject,
  getAllMembersByProject,
  getAllProjects,
  getAllTranslationsByProject,
  getProject,
  inviteMemberByProject,
  leaveProject,
  rejectProject,
  removeMemberByProject,
  updateProject,
  updateTranslationByProject,
} from './api';
import type {
  GetAllProjectsResponse,
  GetAllTranslationsByProjectResponse,
  GetProjectResponse,
  MemberSchema,
  ProjectSchema,
  SearchParamsProjectSchema,
  TranslationSchema,
} from './types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { toast } from 'sonner';
import { queryClient } from '~/lib/query-client';

export const useGetAllProjects = (queryParams?: SearchParamsProjectSchema) => {
  return useQuery<GetAllProjectsResponse>({
    queryKey: ['projects', 'all', queryParams],
    queryFn: () => getAllProjects(queryParams),
  });
};

export const useGetProject = (id: string) => {
  return useQuery<GetProjectResponse>({
    queryKey: ['projects', id],
    queryFn: () => getProject(id),
  });
};

export const useGetAllMembersByProject = (projectId: string) => {
  return useQuery({
    queryKey: ['projects', projectId, 'members'],
    queryFn: () => getAllMembersByProject(projectId),
  });
};

export const useCreateProject = () => {
  return useMutation<unknown, AxiosError, ProjectSchema>({
    mutationFn: (data: ProjectSchema) => createProject(data),
    onSuccess: () => {
      toast.success('Project created successfully');
      void queryClient.invalidateQueries({ queryKey: ['projects', 'all'] });
    },
  });
};

export const useUpdateProject = (projectId: string) => {
  return useMutation<unknown, AxiosError, ProjectSchema>({
    mutationFn: (data: ProjectSchema) => updateProject(projectId, data),
    onSuccess: () => {
      toast.success('Project updated successfully');
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ['projects', 'all'] }),
        queryClient.invalidateQueries({ queryKey: ['projects', projectId] }),
      ]);
    },
  });
};

export const useDeleteProject = () => {
  return useMutation<unknown, AxiosError, string>({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      toast.success('Project deleted successfully');
      void queryClient.invalidateQueries({ queryKey: ['projects', 'all'] });
    },
  });
};

export const useInviteMemberByProject = (projectId: string) => {
  return useMutation<unknown, AxiosError, MemberSchema>({
    mutationFn: (data: MemberSchema) => inviteMemberByProject(projectId, data),
    onSuccess: () => {
      toast.success('Member invited successfully');
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'members'],
      });
    },
  });
};

export const useRemoveMemberByProject = (projectId: string) => {
  return useMutation<unknown, AxiosError, string>({
    mutationFn: (memberId: string) =>
      removeMemberByProject(projectId, memberId),
    onSuccess: () => {
      toast.success('Member removed successfully');
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'members'],
      });
    },
  });
};

export const useGetAllTranslationsByProject = (projectId: string) => {
  return useQuery<GetAllTranslationsByProjectResponse>({
    queryKey: ['projects', projectId, 'translations'],
    queryFn: () => getAllTranslationsByProject(projectId),
  });
};

export const useCreateTranslationByProject = (projectId: string) => {
  return useMutation<unknown, AxiosError, TranslationSchema>({
    mutationFn: (data: TranslationSchema) =>
      createTranslationByProject(projectId, data),
    onSuccess: () => {
      toast.success('Translation created successfully');
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'translations'],
      });
    },
  });
};

export const useUpdateTranslationByProject = (
  projectId: string,
  translationId: string,
) => {
  return useMutation<unknown, AxiosError, TranslationSchema>({
    mutationFn: (data: TranslationSchema) =>
      updateTranslationByProject(projectId, translationId, data),
    onSuccess: () => {
      toast.success('Translation updated successfully');
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'translations'],
      });
    },
  });
};

export const useDeleteTranslationByProject = (projectId: string) => {
  return useMutation<unknown, AxiosError, string>({
    mutationFn: (translationId: string) =>
      deleteTranslationByProject(projectId, translationId),
    onSuccess: () => {
      toast.success('Translation deleted successfully');
      void queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'translations'],
      });
    },
  });
};

export const useRejectProject = (projectId: string) => {
  return useMutation<unknown, AxiosError>({
    mutationFn: () => rejectProject(projectId),
    onSuccess: () => {
      toast.success('Project rejected successfully');
      void queryClient.invalidateQueries({
        queryKey: ['projects', 'all'],
      });
    },
  });
};

export const useApproveProject = (projectId: string) => {
  return useMutation<unknown, AxiosError>({
    mutationFn: () => approveProject(projectId),
    onSuccess: () => {
      toast.success('Project approved successfully');
      void queryClient.invalidateQueries({
        queryKey: ['projects', 'all'],
      });
    },
  });
};

export const useLeaveProject = () => {
  return useMutation<unknown, AxiosError, string>({
    mutationFn: (projectId: string) => leaveProject(projectId),
    onSuccess: () => {
      toast.success('Left project successfully');
      void queryClient.invalidateQueries({
        queryKey: ['projects', 'all'],
      });
    },
  });
};
