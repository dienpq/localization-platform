import { useStore } from '@tanstack/react-form';
import { CheckIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useAppForm } from '~/components/form';
import { FieldGroup, FieldSet } from '~/components/ui';
import {
  type GetAllTranslationsByProjectResponse,
  type TranslationSchema,
  translationSchema,
  useCreateTranslationByProject,
  useGetAllTranslationsByProject,
  useUpdateTranslationByProject,
} from '~/features/projects';
import { cn } from '~/lib/utils';

interface TranslationGroupFormProps {
  projectId: string;
  translationGroup?: GetAllTranslationsByProjectResponse['data'][number];
  onStateChange?: ({
    isDirty,
    isSubmitting,
    isSubmitSuccessful,
  }: {
    isDirty: boolean;
    isSubmitting: boolean;
    isSubmitSuccessful: boolean;
  }) => void;
}

export const TranslationGroupForm = ({
  projectId,
  translationGroup,
  onStateChange,
}: TranslationGroupFormProps) => {
  const { data: translationParentData } =
    useGetAllTranslationsByProject(projectId);

  const { mutateAsync: createTranslationGroup } =
    useCreateTranslationByProject(projectId);
  const { mutateAsync: updateTranslationGroup } = useUpdateTranslationByProject(
    projectId,
    translationGroup?.id ?? '',
  );

  const form = useAppForm({
    defaultValues: {
      name: translationGroup?.name ?? '',
      key: translationGroup?.key ?? '',
      parentId: translationGroup?.parentId ?? undefined,
      keys: [],
    } as TranslationSchema,
    validators: {
      onChange: translationSchema,
      onSubmit: translationSchema,
    },
    onSubmit: async ({ value }) => {
      if (translationGroup) {
        await updateTranslationGroup(value, {
          onSuccess: () => {
            form.reset();
          },
        });
      } else {
        await createTranslationGroup(value, {
          onSuccess: () => {
            form.reset();
          },
        });
      }
    },
  });

  const { isDirty, isSubmitting, isSubmitSuccessful } = useStore(
    form.store,
    (state) => ({
      isDirty: state.isDirty,
      isSubmitting: state.isSubmitting,
      isSubmitSuccessful: state.isSubmitSuccessful,
    }),
  );

  useEffect(() => {
    onStateChange?.({ isDirty, isSubmitting, isSubmitSuccessful });
  }, [isDirty, isSubmitting, isSubmitSuccessful, onStateChange]);

  return (
    <form
      id="translation-group-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit(e);
      }}
      onReset={() => {
        form.reset();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <form.AppField
            name="name"
            children={(field) => (
              <field.TextField label="Name" placeholder="Enter name" required />
            )}
          />
          <form.AppField
            name="key"
            children={(field) => (
              <field.TextField
                label="Key"
                placeholder="Enter key"
                required
                disabled={!!translationGroup}
              />
            )}
          />
          <form.AppField
            name="parentId"
            children={(field) => (
              <field.ComboboxField
                label="Parent"
                placeholder="Select parent..."
                disabled={!!translationGroup}
                options={
                  translationParentData?.data.map(({ name, id, path }) => ({
                    label: name,
                    value: id,
                    path: path,
                  })) ?? []
                }
                renderItem={({ value, label, path }) => {
                  return (
                    <>
                      <div className="flex items-center gap-2">
                        <span>{label}</span>
                        <span className="tex-xs text-muted-foreground">
                          {path}
                        </span>
                      </div>
                      <CheckIcon
                        className={cn(
                          'ml-auto',
                          field.state.value === value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </>
                  );
                }}
                renderTrigger={({ label, path }) => {
                  return (
                    <div className="flex items-center gap-2">
                      <span>{label}</span>
                      <span className="tex-xs text-muted-foreground">
                        {path}
                      </span>
                    </div>
                  );
                }}
              />
            )}
          />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
