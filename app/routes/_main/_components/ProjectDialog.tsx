import { ProjectForm } from './ProjectForm';
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
import { type GetAllProjectsResponse } from '~/features/projects';

interface ProjectDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project?: GetAllProjectsResponse['data'][number];
}

export const ProjectDialog = ({
  open,
  setOpen,
  project,
}: ProjectDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {project ? 'Edit project' : 'Create project'}
          </DialogTitle>
          <DialogDescription>
            {project
              ? 'Edit the project details.'
              : 'Fill in the form to create a new project.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mx-6 max-h-[calc(100vh-280px)] border-y">
          <div className="px-6 py-4">
            <ProjectForm
              project={project}
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
            form="project-form"
            variant="outline"
            disabled={isSubmitting || !isDirty}
          >
            <span>Reset</span>
          </Button>
          <Button
            type="submit"
            form="project-form"
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
