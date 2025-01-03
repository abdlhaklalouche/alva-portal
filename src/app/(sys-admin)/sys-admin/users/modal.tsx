import User from "@/types/User";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "yup";
import LoadingButton from "@/app/components/other/loading-button";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { usersKeys, useUsersActions } from "@/api/users";
import FormTextField from "@/app/components/form/textfield";
import FormCheckbox from "@/app/components/form/checkbox";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default ({
  user,
  open,
  handleClose,
}: {
  user: User | null;
  open: boolean;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { addUser, updateUser, isAddingUser, isUpdatingUser } =
    useUsersActions();

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(
      schema.object().shape({
        is_system_admin: schema.boolean().required(),
        name: schema.string().required(),
        email: schema.string().email().required(),
        password: schema.string().when([], {
          is: () => !user,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        }),
      })
    ),
  });

  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = (data: any) => {
    if (isAddingUser || isUpdatingUser) return;

    if (user) {
      updateUser(
        {
          id: user.id,
          ...data,
        },
        {
          onSuccess: (data) => {
            toast({ title: data.message, variant: "default" });

            handleClose();
          },
          onError: (error: any) => {
            toast({
              title: error?.response?.data?.message ?? error.message,
              variant: "destructive",
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: [usersKeys.get],
            });
          },
        }
      );
    } else {
      addUser(data, {
        onSuccess: (data) => {
          toast({ title: data.message, variant: "default" });

          handleClose();
        },
        onError: (error: any) => {
          toast({
            title: error?.response?.data?.message ?? error.message,
            variant: "destructive",
          });
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: [usersKeys.get],
          });
        },
      });
    }
  };

  React.useEffect(() => {
    if (user) {
      setValue("is_system_admin", user.is_system_admin);
      setValue("name", user.name);
      setValue("email", user.email);
    }

    return () => {
      reset({});
    };
  }, [open, user?.id]);

  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Update user" : "Add user"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <div className="space-y-4">
            <FormCheckbox name="is_system_admin" label="Is System Admin" />
            <FormTextField name="name" label="Name" className="w-full" />
            <FormTextField
              name="email"
              label="Email"
              type="email"
              className="w-full"
            />
            <FormTextField
              name="password"
              label="Password"
              type="password"
              className="w-full"
            />
          </div>
        </FormProvider>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <LoadingButton
            loading={isAddingUser || isUpdatingUser}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
