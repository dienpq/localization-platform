import { data } from 'react-router';

export const loader = () => {
  return data(
    {
      message: 'Not Found',
    },
    404,
  );
};

export default function NotFoundPage() {
  return <></>;
}
