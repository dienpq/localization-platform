'use client';

import { TranslationGroupDialog } from './TranslationGroupDialog';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui';

interface CreateTranslationGroupProps {
  projectId: string;
}

export const CreateTranslationGroup = ({
  projectId,
}: CreateTranslationGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        <PlusIcon />
        <span>Create</span>
      </Button>

      <TranslationGroupDialog
        projectId={projectId}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
