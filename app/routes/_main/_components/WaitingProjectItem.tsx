import { CheckIcon, XIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '~/components/ui';
import {
  type GetAllProjectsResponse,
  useApproveProject,
  useRejectProject,
} from '~/features/projects';
import { getAvatarInitials } from '~/lib/utils';

interface WaitingProjectItemProps {
  project: GetAllProjectsResponse['data'][number];
}

export const WaitingProjectItem = ({ project }: WaitingProjectItemProps) => {
  const { id, name, logoUrl, invitedBy } = project;

  const { mutate: reject, isPending: isRejecting } = useRejectProject(id);
  const { mutate: approve, isPending: isApproving } = useApproveProject(id);

  const handleReject = () => {
    reject();
  };

  const handleApprove = () => {
    approve();
  };

  return (
    <Item variant="outline">
      <Avatar>
        <AvatarImage src={logoUrl ?? ''} alt={name || ''} />
        <AvatarFallback>{name ? getAvatarInitials(name) : ''}</AvatarFallback>
      </Avatar>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        {invitedBy?.email && (
          <ItemDescription>
            <span className="text-sm font-medium">From: </span>
            {invitedBy.email}
          </ItemDescription>
        )}
      </ItemContent>
      <ItemActions className="max-sm:w-full max-sm:items-end max-sm:justify-end">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={handleApprove}
          isLoading={isApproving}
        >
          <CheckIcon />
        </Button>
        <Button
          variant="destructive"
          size="icon-sm"
          onClick={handleReject}
          isLoading={isRejecting}
        >
          <XIcon />
        </Button>
      </ItemActions>
    </Item>
  );
};
