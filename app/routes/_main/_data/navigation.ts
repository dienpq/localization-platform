import { type LucideProps, PieChartIcon } from 'lucide-react';
import { PAGE_ROUTES } from '~/constants/routes';

export const navMain: {
  title: string;
  url: string;
  icon: React.ComponentType<LucideProps>;
  items?: {
    title: string;
    url: string;
  }[];
}[] = [
  {
    title: 'Dashboard',
    url: PAGE_ROUTES.DASHBOARD,
    icon: PieChartIcon,
  },
];
