import { useStore } from '@tanstack/react-form';
import { useEffect } from 'react';
import { useAppForm } from '~/components/form';
import { FieldGroup, FieldSet } from '~/components/ui';
import {
  type GetProfileResponse,
  type ProfileSchema,
  profileSchema,
  useUpdateProfile,
} from '~/features/auth';

interface ProfileFormProps {
  profile: GetProfileResponse;
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

export function ProfileForm({ profile, onStateChange }: ProfileFormProps) {
  const { mutate: updateProfile } = useUpdateProfile();

  const form = useAppForm({
    defaultValues: {
      name: profile.name,
      image: profile.avatarUrl,
    } as ProfileSchema,
    validators: {
      onChange: profileSchema,
      onSubmit: profileSchema,
    },
    onSubmit: ({ value }) => {
      updateProfile(value);
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
      id="profile-form"
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
              <field.ImageUploadField
                aspectRatio={1 / 1}
                label="Image"
                required
              />
            )}
          />
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
