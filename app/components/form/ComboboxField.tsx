import { FieldWrapper, useFieldContext } from '.';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '~/lib/utils';

interface ComboboxOption {
  value: string;
  label: string;
  [key: string]: string | number | boolean;
}

export function ComboboxField({
  label,
  description,
  required,
  placeholder,
  empty = 'No results found.',
  options = [],
  disabled,
  renderItem,
  renderTrigger,
}: Omit<React.ComponentProps<typeof FieldWrapper>, 'field' | 'children'> & {
  options?: ComboboxOption[];
  placeholder?: string;
  empty?: string;
  disabled?: boolean;
  renderItem?: (item: ComboboxOption) => React.ReactNode;
  renderTrigger?: (item: ComboboxOption) => React.ReactNode;
}) {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const value = field.state.value;

  const [filteredOptions, setFilteredOptions] =
    useState<ComboboxOption[]>(options);

  const [open, setOpen] = useState<boolean>(false);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 10,
  });

  const handleSearch = (search: string) => {
    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  };

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      if (parentRef.current) {
        rowVirtualizer.measure();
      }
    });

    return () => {
      clearTimeout(timer);
    };
  }, [open, rowVirtualizer]);

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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
            onClick={() => {
              setOpen(true);
            }}
            disabled={disabled}
          >
            {value
              ? renderTrigger
                ? (() => {
                    const found = options.find((i) => i.value === value);
                    return found ? renderTrigger(found) : null;
                  })()
                : options.find((i) => i.value === value)?.label
              : placeholder}
            <ChevronsUpDownIcon className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          onWheel={(e) => {
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
          className="w-(--radix-popover-trigger-width) p-0"
        >
          <Command shouldFilter={false}>
            <CommandInput
              onValueChange={handleSearch}
              placeholder="Type to search..."
              className="h-9"
            />
            <CommandList ref={parentRef}>
              <CommandEmpty>{empty}</CommandEmpty>
              <CommandGroup>
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualOption) => {
                    const item = filteredOptions[virtualOption.index];
                    return (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        keywords={[item.label]}
                        onSelect={(currentValue) => {
                          field.setValue(currentValue);
                          setOpen(false);
                        }}
                        className={cn(
                          'absolute top-0 left-0 w-full bg-transparent',
                        )}
                        style={{
                          height: `${virtualOption.size}px`,
                          transform: `translateY(${virtualOption.start}px)`,
                        }}
                      >
                        {renderItem ? (
                          renderItem(item)
                        ) : (
                          <>
                            {item.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto',
                                value === item.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                          </>
                        )}
                      </CommandItem>
                    );
                  })}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
