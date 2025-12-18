'use client';

import { TranslationGroupForm } from './TraslationGroupForm';
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
import { GetAllTranslationsByProjectResponse } from '~/features/projects';

interface TranslationGroupDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  translationGroup?: GetAllTranslationsByProjectResponse['data'][number];
  projectId: string;
}

export const TranslationGroupDialog = ({
  projectId,
  open,
  setOpen,
  translationGroup,
}: TranslationGroupDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {translationGroup
              ? 'Edit translation group'
              : 'Create translation group'}
          </DialogTitle>
          <DialogDescription>
            {translationGroup
              ? 'Edit the translation group details.'
              : 'Fill in the form to create a new translation group.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mx-6 max-h-[calc(100vh-280px)] border-y">
          <div className="px-6 py-4">
            <TranslationGroupForm
              projectId={projectId}
              translationGroup={translationGroup}
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
            form="translation-group-form"
            variant="outline"
            disabled={isSubmitting || !isDirty}
          >
            <span>Reset</span>
          </Button>
          <Button
            type="submit"
            form="translation-group-form"
            disabled={!isDirty || isSubmitting}
            isLoading={isSubmitting}
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
