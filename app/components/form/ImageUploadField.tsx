import { FieldWrapper, useFieldContext } from '.';
import {
  AspectRatio,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '../ui';
import { UploadIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '~/lib/utils';

export function ImageUploadField({
  label,
  description,
  required,
  aspectRatio = 16 / 9,
}: Omit<React.ComponentProps<typeof FieldWrapper>, 'field' | 'children'> & {
  option?: { filepath?: string; filename?: string };
  aspectRatio?: number;
}) {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoadingUpload(true);
      // await uploadFile(file, option)
      //   .then((url) => {
      //     field.handleChange(url);
      //   })
      //   .catch((error) => {
      //     toast.error(error.message);
      //   });
      setIsLoadingUpload(false);
    }
  };

  const handleDeleteFile = () => {
    if (field.state.value) {
      field.handleChange('');
    }
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
      <AspectRatio
        ratio={aspectRatio}
        className={cn(
          'relative rounded-lg border',
          isInvalid && 'border-destructive',
          !field.state.value && 'border-dashed',
        )}
      >
        <input
          id={field.name}
          type="file"
          hidden
          accept="image/*"
          onChange={handleChangeFile}
        />
        {field.state.value ? (
          <>
            <img
              src={field.state.value}
              alt="Uploaded image"
              className="h-full w-full rounded-lg object-cover"
            />
            <div className="absolute top-1 right-1">
              <Button variant="link" size="icon-sm" onClick={handleDeleteFile}>
                <XIcon />
              </Button>
            </div>
          </>
        ) : (
          <Empty className="size-full gap-4">
            <EmptyHeader className="gap-1">
              <EmptyTitle className="text-base">Upload image</EmptyTitle>
              <EmptyDescription className="text-xs">
                SVG, PNG, JPG or GIF (max. 5MB)
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                variant="outline"
                size="sm"
                isLoading={isLoadingUpload}
                asChild
              >
                <label htmlFor={field.name}>
                  <UploadIcon />
                  <span>Select image</span>
                </label>
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </AspectRatio>
    </FieldWrapper>
  );
}
