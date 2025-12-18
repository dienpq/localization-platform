import { useStore } from '@tanstack/react-form';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { useAppForm } from '~/components/form';
import { FieldGroup, InputGroupButton } from '~/components/ui';
import {
  type MemberSchema,
  memberSchema,
  useAddMemberByProject,
} from '~/features/projects';

interface InviteMemberFormProps {
  projectId: string;
}

export const InviteMemberForm = ({ projectId }: InviteMemberFormProps) => {
  const { mutate: inviteMember } = useAddMemberByProject(projectId);

  const form = useAppForm({
    defaultValues: {
      email: '',
    } as MemberSchema,
    validators: {
      onChange: memberSchema,
      onSubmit: memberSchema,
    },
    onSubmit: ({ value }) => {
      inviteMember(value, {
        onSuccess: () => {
          form.reset();
        },
      });
    },
  });

  const { isDirty, isSubmitting } = useStore(form.store, (state) => ({
    isDirty: state.isDirty,
    isSubmitting: state.isSubmitting,
  }));

  return (
    <form
      id="invite-project-member-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit(e);
      }}
      onReset={() => {
        form.reset();
      }}
    >
      <FieldGroup>
        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField
              placeholder="Enter email"
              prefix={<SearchIcon />}
              suffix={
                <InputGroupButton
                  type="submit"
                  variant="default"
                  form="invite-project-member-form"
                  disabled={!isDirty}
                  isLoading={isSubmitting}
                >
                  <PlusIcon />
                  <span>Invite</span>
                </InputGroupButton>
              }
            />
          )}
        />
      </FieldGroup>
    </form>
  );
};
