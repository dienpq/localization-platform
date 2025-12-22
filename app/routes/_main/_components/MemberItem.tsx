import { Trash2Icon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '~/components/ui';
import { ProjectMemberStatus } from '~/enum/project-member';
import {
  type GetAllMembersByProjectResponse,
  useRemoveMemberByProject,
} from '~/features/projects';
import { getAvatarInitials } from '~/lib/utils';

interface MemberItemProps {
  projectId: string;
  member: GetAllMembersByProjectResponse['data'][number];
}

export const MemberItem = ({ projectId, member }: MemberItemProps) => {
  const {
    id,
    name,
    avatarUrl,
    email,
    project: { status },
  } = member;

  const { mutateAsync: deleteMember, isPending } =
    useRemoveMemberByProject(projectId);

  const handleDeleteMember = async () => {
    await deleteMember(id);
  };

  return (
    <Item variant="outline">
      <Avatar>
        <AvatarImage src={avatarUrl ?? ''} alt={name || ''} />
        <AvatarFallback>{name ? getAvatarInitials(name) : ''}</AvatarFallback>
      </Avatar>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{email}</ItemDescription>
      </ItemContent>
      <ItemActions className="max-sm:w-full max-sm:items-end max-sm:justify-between">
        {status === ProjectMemberStatus.ACCEPTED && <Badge>Accepted</Badge>}
        {status === ProjectMemberStatus.WAITING && (
          <Badge variant="secondary">Waiting</Badge>
        )}
        {status === ProjectMemberStatus.REJECTED && (
          <Badge variant="destructive">Rejected</Badge>
        )}
        <Button
          variant="destructive"
          size="icon-sm"
          onClick={() => {
            void handleDeleteMember();
          }}
          isLoading={isPending}
        >
          <Trash2Icon />
        </Button>
      </ItemActions>
    </Item>
  );
};
