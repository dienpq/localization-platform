export const PAGE_ROUTES = {
  DASHBOARD: '/',

  PROJECTS: {
    INDEX: '/projects',
    DETAIL: (projectId: string) => `/projects/${projectId}`,
  },

  AUTH: {
    SIGN_IN: '/sign-in',
  },
};
