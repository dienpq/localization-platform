import { FieldWrapper, useFieldContext } from '.';
import { Textarea } from '../ui';

export function TextareaField({
  label,
  description,
  required,
  ...props
}: Omit<React.ComponentProps<typeof FieldWrapper>, 'field' | 'children'> &
  React.ComponentProps<typeof Textarea>) {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FieldWrapper
      label={label}
      description={description}
      required={required}
      field={{
        name: field.name,
        errors: field.state.meta.errors,
        isInvalid: isInvalid,
      }}
    >
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
        aria-invalid={isInvalid}
        aria-description={description}
        {...props}
      />
    </FieldWrapper>
  );
}
