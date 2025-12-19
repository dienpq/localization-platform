import { ProfileForm } from './ProfileForm';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '~/components/ui';
import type { GetProfileResponse } from '~/features/user';

interface ProfileDialogProps {
  profile: GetProfileResponse;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProfileDialog({ open, setOpen, profile }: ProfileDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>{profile.email}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mx-6 max-h-[calc(100vh-280px)] border-y">
          <div className="px-6 py-4">
            <ProfileForm
              profile={profile}
              onStateChange={({
                isSubmitting,
                isDirty,
                isSubmitSuccessful,
              }) => {
                setIsSubmitting(isSubmitting);
                setIsDirty(isDirty);
                if (isSubmitSuccessful) {
                  setOpen(false);
                }
              }}
            />
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            type="reset"
            form="profile-form"
            variant="outline"
            disabled={!isDirty || isSubmitting}
          >
            <span>Reset</span>
          </Button>
          <Button
            type="submit"
            form="profile-form"
            disabled={!isDirty || isSubmitting}
            isLoading={isSubmitting}
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
