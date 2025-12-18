import { WaitingProjectList } from './WaitingProjectList';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '~/components/ui';

interface WaitingProjectDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function WaitingProjectDialog({
  open,
  setOpen,
}: WaitingProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Waiting for Approval</DialogTitle>
          <DialogDescription>
            Your request to join this project is pending approval.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mx-6 max-h-[calc(100vh-280px)] border-t">
          <div className="px-6 pt-4">
            <WaitingProjectList />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
