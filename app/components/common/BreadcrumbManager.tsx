import { useEffect } from 'react';
import { type BreadcrumbData, useBreadcrumb } from '~/providers';

interface BreadcrumbManagerProps {
  data: BreadcrumbData;
}

export function BreadcrumbManager({ data }: BreadcrumbManagerProps) {
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb(data);
    return () => {
      setBreadcrumb(null);
    };
  }, [data, setBreadcrumb]);

  return null;
}
