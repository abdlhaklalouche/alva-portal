import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type FormInputProps = {
  name: string;
  label?: string;
  description?: string;
} & React.ComponentProps<"input">;

const FormTextField: React.FC<FormInputProps> = ({
  name,
  label,
  description,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    field.onChange(e.target.value);
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={otherProps.defaultValue ?? ""}
      render={({ field }) => (
        <FormItem className="space-y-0 w-full">
          {label && (
            <FormLabel className="text-xs text-gray-500">{label}</FormLabel>
          )}
          <FormControl>
            <Input
              autoComplete="off"
              {...otherProps}
              className={cn("h-8 text-xs w-52", otherProps.className)}
              defaultValue={otherProps.defaultValue}
              {...field}
              onChange={(e) => handleChange(e, field)}
            />
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
  );
};

export default FormTextField;
