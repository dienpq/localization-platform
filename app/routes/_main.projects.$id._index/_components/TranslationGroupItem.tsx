import { TranslationForm } from './TranslationForm';
import { TranslationGroupDialog } from './TranslationGroupDialog';
import {
  ChevronsUpDown,
  EllipsisVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui';
import {
  type GetAllTranslationsByProjectResponse,
  useDeleteTranslationByProject,
} from '~/features/projects';

interface TranslationGroupItemProps {
  projectId: string;
  translationGroup: GetAllTranslationsByProjectResponse['data'][number];
}

export const TranslationGroupItem = ({
  projectId,
  translationGroup,
}: TranslationGroupItemProps) => {
  const { id, name, key, keys, path } = translationGroup;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { mutateAsync: deleteTranslationGroup } =
    useDeleteTranslationByProject(projectId);

  const handleDeleteGroup = () => {
    toast.promise(deleteTranslationGroup(id), {
      loading: 'Deleting translation group...',
    });
  };

  return (
    <>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>{name}</span>
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle>{key}</CardTitle>
              <CardDescription>{path}</CardDescription>
              <CardAction>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <EllipsisVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="min-w-min"
                    side="right"
                    align="start"
                  >
                    <DropdownMenuItem
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <PencilIcon />
                      <span>Edit group</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={handleDeleteGroup}
                    >
                      <Trash2Icon />
                      <span>Delete group</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-4 border-y py-6">
              <TranslationForm
                projectId={projectId}
                translationGroup={translationGroup}
                translationKeys={keys}
                onStateChange={({ isSubmitting, isDirty }) => {
                  setIsSubmitting(isSubmitting);
                  setIsDirty(isDirty);
                }}
              />
            </CardContent>
            <CardFooter className="justify-end gap-3">
              <Button
                type="reset"
                variant="outline"
                form={`translation-form-${id}`}
                disabled={isSubmitting || !isDirty}
              >
                Reset
              </Button>
              <Button
                type="submit"
                form={`translation-form-${id}`}
                disabled={!isDirty || isSubmitting}
                isLoading={isSubmitting}
              >
                <span>Save</span>
              </Button>
            </CardFooter>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <TranslationGroupDialog
        translationGroup={translationGroup}
        projectId={projectId}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
