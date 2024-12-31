import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { ReactNode } from "react";

type FormInputProps = {
  name: string;
  label?: string;
  description?: string;
  children?: ReactNode;
} & React.ComponentProps<"input">;

const FormSelect: React.FC<FormInputProps> = ({
  name,
  label,
  description,
  placeholder,
  children,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      {...otherProps}
      render={({ field }) => (
        <FormField
          control={control}
          name={name}
          defaultValue={otherProps.defaultValue ?? ""}
          render={({ field }) => (
            <FormItem className="space-y-0 w-full">
              {label && (
                <FormLabel className="text-2xs text-gray-500 py-0">
                  {label}
                </FormLabel>
              )}
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-56 text-2xs w-full">
                    <SelectValue
                      placeholder={placeholder}
                      className="text-2xs"
                    />
                  </SelectTrigger>
                  <SelectContent className="[&>p]:text-2xs">
                    <SelectGroup>
                      {placeholder && (
                        <SelectLabel className="text-2xs">{label}</SelectLabel>
                      )}
                      {children}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              {description && (
                <FormDescription className="text-2xs">
                  {description}
                </FormDescription>
              )}
              <FormMessage className="text-3xs" />
            </FormItem>
          )}
        />
      )}
    />
  );
};

export default FormSelect;
