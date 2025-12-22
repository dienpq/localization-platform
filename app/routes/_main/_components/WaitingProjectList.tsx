import { MemberListEmpty } from './MemberListEmpty';
import { WaitingProjectItem } from './WaitingProjectItem';
import { ItemGroup, Skeleton } from '~/components/ui';
import { ProjectMemberStatus } from '~/enum/project-member';
import { useGetAllProjects } from '~/features/projects';

export const WaitingProjectList = () => {
  const { data: projectData, isPending } = useGetAllProjects({
    status: ProjectMemberStatus.WAITING,
  });

  return (
    <div>
      {isPending ? (
        <Skeleton className="h-[78.25px] w-full" />
      ) : projectData?.data.length ? (
        <ItemGroup className="gap-4">
          {projectData.data.map((project) => (
            <WaitingProjectItem key={project.id} project={project} />
          ))}
        </ItemGroup>
      ) : (
        <MemberListEmpty />
      )}
    </div>
  );
};
