'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

export interface BreadcrumbData {
  title?: string;
  items?: { title: string; url: string }[];
}

interface ContextValue {
  data: BreadcrumbData | null;
  setBreadcrumb: (data: BreadcrumbData | null) => void;
}

const BreadcrumbContext = createContext<ContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BreadcrumbData | null>(null);

  return (
    <BreadcrumbContext.Provider value={{ data, setBreadcrumb: setData }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export const useBreadcrumb = () => {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx)
    throw new Error('useBreadcrumb must be used within BreadcrumbProvider');
  return ctx;
};
