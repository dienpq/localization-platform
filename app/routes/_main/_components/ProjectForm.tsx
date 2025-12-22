import { useStore } from '@tanstack/react-form';
import { useEffect } from 'react';
import { useAppForm } from '~/components/form';
import { FieldGroup, FieldSet } from '~/components/ui';
import {
  type GetAllProjectsResponse,
  type ProjectSchema,
  projectSchema,
  useCreateProject,
  useUpdateProject,
} from '~/features/projects';

interface ProjectFormProps {
  project?: GetAllProjectsResponse['data'][number];
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

export const ProjectForm = ({ project, onStateChange }: ProjectFormProps) => {
  const { mutateAsync: createProject } = useCreateProject();
  const { mutateAsync: updateProject } = useUpdateProject(project?.id ?? '');

  const form = useAppForm({
    defaultValues: {
      name: project?.name ?? '',
      image: project?.logoUrl ?? '',
    } as ProjectSchema,
    validators: {
      onChange: projectSchema,
      onSubmit: projectSchema,
    },
    onSubmit: async ({ value }) => {
      if (project) {
        await updateProject(value, {
          onSuccess: () => {
            form.reset();
          },
        });
      } else {
        await createProject(value, {
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
      id="project-form"
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
            name="image"
            children={(field) => (
              <field.ImageUploadField aspectRatio={1 / 1} label="Logo" />
            )}
          />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
