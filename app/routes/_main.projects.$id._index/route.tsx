import { Project } from './_components';
import { useParams } from 'react-router';
import { BreadcrumbManager } from '~/components/common';
import { useGetProject } from '~/features/projects';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();

  const { data, error } = useGetProject(id ?? '');

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <BreadcrumbManager
        data={{
          title: data.name,
        }}
      />

      <Project project={data} />
    </>
  );
}
