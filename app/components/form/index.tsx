import { Field, FieldDescription, FieldError, FieldLabel } from '../ui';
import { ComboboxField } from './ComboboxField';
import { ImageUploadField } from './ImageUploadField';
import { TextField } from './TextField';
import { TextareaField } from './TextareaField';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    ImageUploadField,
    ComboboxField,
  },
  formComponents: {},
});

export const FieldWrapper = ({
  label,
  description,
  required,
  children,
  field,
  ...props
}: {
  label?: string;
  description?: string;
  required?: boolean;
  children?: React.ReactNode;
  field: {
    name: string;
    errors?: { message?: string }[];
    isInvalid?: boolean;
  };
}) => {
  return (
    <Field data-invalid={field.isInvalid} {...props}>
      {label && (
        <FieldLabel htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive -ml-1">*</span>}
        </FieldLabel>
      )}

      {children}

      {description && <FieldDescription>{description}</FieldDescription>}
      {field.isInvalid && <FieldError errors={[field.errors?.[0]]} />}
    </Field>
  );
};
