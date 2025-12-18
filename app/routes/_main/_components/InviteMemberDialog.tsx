import { InviteMemberForm } from './InviteMemberForm';
import { MemberList } from './MemberList';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '~/components/ui';

interface InviteMemberDialogProps {
  projectId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InviteMemberDialog = ({
  projectId,
  open,
  setOpen,
}: InviteMemberDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite a new member to your project by entering their email address
            below.
          </DialogDescription>
        </DialogHeader>
        <InviteMemberForm projectId={projectId} />
        <ScrollArea className="-mx-6 max-h-[calc(100vh-280px)] border-t">
          <div className="px-6 pt-4">
            <MemberList projectId={projectId} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
