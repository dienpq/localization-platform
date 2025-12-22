import { data } from 'react-router';

export const loader = () => {
  return data(null, 404);
};

export default function NotFoundPage() {
  return <></>;
}
