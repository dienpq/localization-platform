export const PROJECT_ENDPOINTS = {
  GET_ALL: '/projects',
  GET: (projectId: string) => `/projects/${projectId}`,
  CREATE: '/projects',
  UPDATE: (projectId: string) => `/projects/${projectId}`,
  DELETE: (projectId: string) => `/projects/${projectId}`,

  REJECT: (projectId: string) => `/projects/${projectId}/reject`,
  APPROVE: (projectId: string) => `/projects/${projectId}/approve`,
  LEAVE: (projectId: string) => `/projects/${projectId}/leave`,

  MEMBERS: {
    GET_ALL: (projectId: string) => `/projects/${projectId}/members`,
    INVITE: (projectId: string) => `/projects/${projectId}/members`,
    REMOVE: (projectId: string, memberId: string) =>
      `/projects/${projectId}/members/${memberId}`,
  },

  TRANSLATIONS: {
    GET_ALL: (projectId: string) => `/projects/${projectId}/translations`,
    GET: (projectId: string, translationId: string) =>
      `/projects/${projectId}/translations/${translationId}`,
    CREATE: (projectId: string) => `/projects/${projectId}/translations`,
    UPDATE: (projectId: string, translationId: string) =>
      `/projects/${projectId}/translations/${translationId}`,
    DELETE: (projectId: string, translationId: string) =>
      `/projects/${projectId}/translations/${translationId}`,
  },
};
