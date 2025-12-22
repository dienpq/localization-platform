import { MemberItem } from './MemberItem';
import { MemberListEmpty } from './MemberListEmpty';
import { ItemGroup, Skeleton } from '~/components/ui';
import { useGetAllMembersByProject } from '~/features/projects';

interface MemberListProps {
  projectId: string;
}

export const MemberList = ({ projectId }: MemberListProps) => {
  const { data: memberData, isPending } = useGetAllMembersByProject(projectId);

  return (
    <>
      {isPending ? (
        <Skeleton className="h-[78.25px] w-full" />
      ) : memberData?.data.length ? (
        <ItemGroup className="gap-4">
          {memberData.data.map((member) => (
            <MemberItem key={member.id} member={member} projectId={projectId} />
          ))}
        </ItemGroup>
      ) : (
        <MemberListEmpty />
      )}
    </>
  );
};
