import { FieldWrapper, useFieldContext } from '.';
import { Input, InputGroup, InputGroupAddon, InputGroupInput } from '../ui';

export function TextField({
  label,
  description,
  required,
  prefix,
  suffix,
  ...props
}: Omit<React.ComponentProps<typeof FieldWrapper>, 'field' | 'children'> &
  Omit<React.ComponentProps<typeof Input>, 'prefix' | 'suffix'> & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
  }) {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputProps: React.ComponentProps<typeof Input> = {
    id: field.name,
    name: field.name,
    value: field.state.value,
    onChange: (e) => {
      field.handleChange(e.target.value);
    },
    'aria-invalid': isInvalid,
    'aria-description': description,
    ...props,
  };

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
      {suffix || prefix ? (
        <InputGroup>
          <InputGroupInput {...inputProps} />

          {prefix && (
            <InputGroupAddon align="inline-start">{prefix}</InputGroupAddon>
          )}
          {suffix && (
            <InputGroupAddon align="inline-end">{suffix}</InputGroupAddon>
          )}
        </InputGroup>
      ) : (
        <Input {...inputProps} />
      )}
    </FieldWrapper>
  );
}
