import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, X } from "lucide-react";
import React, { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "../other/spinner";

type FormInputProps = {
  name: string;
  label?: string;
  description?: string;
  options: any[];
  loading?: boolean;
  popoverClass?: string;
  clearable?: boolean;
  render: (value: any) => ReactNode;
  onChange?: (value: any) => void;
} & React.ComponentProps<"input">;

const FormCombobox: React.FC<FormInputProps> = ({
  name,
  label,
  description,
  options,
  loading = false,
  popoverClass = "",
  clearable = false,
  render,
  onChange,
  ...otherProps
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={otherProps.defaultValue ?? null}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col space-y-0 w-full", otherProps.className)}
        >
          {label && (
            <div className="flex justify-between items-center">
              <FormLabel className="text-2xs text-gray-500 py-0.5">
                {label}
              </FormLabel>
              {clearable && field.value && (
                <Button
                  variant="link"
                  className="h-4 text-2xs hover:no-underline"
                  onClick={() => field.onChange(null)}
                >
                  clear
                </Button>
              )}
            </div>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-52 justify-between text-xs border-gray-400 h-8",
                    otherProps.className,
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={otherProps.disabled}
                >
                  <span className="grow w-full line-clamp-2 text-start">
                    {field.value
                      ? render(field.value)
                      : otherProps.placeholder ?? label}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn("w-52 p-0", popoverClass)}>
              <Command>
                <CommandInput placeholder="Search..." className="h-9 text-xs" />
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <LoadingSpinner size={16} />
                  </div>
                ) : (
                  <CommandList className="overflow-y-hidden">
                    <ScrollArea className="h-72">
                      <CommandGroup>
                        <CommandEmpty>No result was found.</CommandEmpty>
                        {options.map((option, index) => (
                          <CommandItem
                            key={index}
                            value={option}
                            onSelect={(value) => {
                              field.onChange(option);
                              onChange?.(option);
                              setOpen(false);
                            }}
                          >
                            {render(option)}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </ScrollArea>
                  </CommandList>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          {description && (
            <FormDescription className="text-2xs">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-3xs" />
        </FormItem>
      )}
    />
  );
};

export default FormCombobox;
