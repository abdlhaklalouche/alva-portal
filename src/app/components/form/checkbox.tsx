import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import React, { ChangeEvent, FormEventHandler } from "react";
import { cn } from "@/lib/utils";

type FormInputProps = {
  name: string;
  label?: string;
} & CheckboxProps;

const FormCheckbox: React.FC<FormInputProps> = ({
  name,
  label,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={otherProps.defaultValue ?? false}
      {...otherProps}
      render={({ field }) => (
        <FormItem className={cn("space-y-0 w-full", otherProps.className)}>
          <FormControl>
            <div className="items-top flex space-x-2">
              <Checkbox
                {...field}
                id={otherProps.id}
                name={name}
                value={field.value}
                checked={field.value === true}
                {...otherProps}
                onCheckedChange={(checked) => {
                  field.onChange(!field.value);
                  otherProps.onCheckedChange?.(checked);
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={otherProps.id}
                  className="text-2xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {label}
                </label>
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-3xs" />
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
