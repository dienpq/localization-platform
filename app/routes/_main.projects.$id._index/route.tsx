import { Project } from './_components';
import { BreadcrumbManager } from '~/components/common';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <BreadcrumbManager
        data={{
          title: `Project ${id}`,
        }}
      />
      <Project projectId={id} />
    </>
  );
}
