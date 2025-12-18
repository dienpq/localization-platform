import { useStore } from '@tanstack/react-form';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useAppForm } from '~/components/form';
import { Button, FieldGroup, FieldSet } from '~/components/ui';
import { Locale } from '~/enum/locale';
import {
  type GetAllTranslationsByProjectResponse,
  type TranslationSchema,
  translationSchema,
  useUpdateTranslationByProject,
} from '~/features/projects';
import { cn } from '~/lib/utils';

interface TranslationFormProps {
  translationGroup: GetAllTranslationsByProjectResponse['data'][number];
  projectId: string;
  translationKeys: GetAllTranslationsByProjectResponse['data'][number]['keys'];
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

export const TranslationForm = ({
  translationGroup,
  projectId,
  translationKeys,
  onStateChange,
}: TranslationFormProps) => {
  const { mutateAsync: updateTranslationsInGroup } =
    useUpdateTranslationByProject(projectId, translationGroup.id);

  const form = useAppForm({
    defaultValues: {
      name: translationGroup.name,
      key: translationGroup.key,
      parentId: translationGroup.parentId,
      keys: translationKeys.map(({ key, values }) => ({
        key: key,
        values: values.map(({ locale, value }) => ({
          locale: locale,
          value: value,
        })),
      })),
    } as TranslationSchema,
    validators: {
      onChange: translationSchema,
      onSubmit: translationSchema,
    },
    onSubmit: async ({ value }) => {
      await updateTranslationsInGroup(value, {
        onSuccess: () => {
          form.reset();
        },
      });
    },
  });

  const { values, isDirty, isSubmitting, isSubmitSuccessful } = useStore(
    form.store,
    (state) => ({
      isDirty: state.isDirty,
      isSubmitting: state.isSubmitting,
      isSubmitSuccessful: state.isSubmitSuccessful,
      values: state.values,
    }),
  );

  useEffect(() => {
    onStateChange?.({ isDirty, isSubmitting, isSubmitSuccessful });
  }, [isDirty, isSubmitting, isSubmitSuccessful, onStateChange]);

  const handleAddKey = () => {
    form.pushFieldValue('keys', {
      key: '',
      values: [
        {
          locale: Locale.EN,
          value: '',
        },
        {
          locale: Locale.VI,
          value: '',
        },
      ],
    });
  };

  const handleRemoveKey = (index: number) => {
    void form.removeFieldValue('keys', index);
  };

  return (
    <form
      id={`translation-form-${translationGroup.id}`}
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit(e);
      }}
      onReset={() => {
        form.reset();
      }}
    >
      <FieldGroup>
        {values.keys.map(({ values }, keyIndex) => (
          <FieldSet key={keyIndex} className="flex-row">
            <form.AppField
              name={`keys[${keyIndex}].key`}
              children={(field) => (
                <field.TextField
                  label={keyIndex === 0 ? 'KEY' : undefined}
                  placeholder="Enter key"
                />
              )}
            />
            {values.map(({ locale }, index) => (
              <form.AppField
                key={locale}
                name={`keys[${keyIndex}].values[${index}].value`}
                children={(field) => (
                  <field.TextareaField
                    label={keyIndex === 0 ? locale : undefined}
                    placeholder={`Enter value for ${locale}`}
                    className="resize-none"
                  />
                )}
              />
            ))}
            <Button
              variant="destructive"
              size="icon"
              className={cn(keyIndex === 0 ? 'mt-[31.25px]' : '')}
              onClick={() => {
                handleRemoveKey(keyIndex);
              }}
            >
              <Trash2Icon />
            </Button>
          </FieldSet>
        ))}

        <Button variant="outline" onClick={handleAddKey}>
          <PlusIcon />
          <span>Add key</span>
        </Button>
      </FieldGroup>
    </form>
  );
};
