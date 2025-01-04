"use client";

import { usersKeys, useUsersActions } from "@/api/users";
import PageLayout from "@/app/components/blocks/page-layout";
import FormTextField from "@/app/components/form/textfield";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authcontext";
import { toast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import * as schema from "yup";

export default () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { updateAccount, isUpdatingAccount } = useUsersActions();

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(
      schema.object().shape({
        name: schema.string().required(),
        email: schema.string().email().required(),
        password: schema.string().nullable(),
      })
    ),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    if (isUpdatingAccount) return;

    updateAccount(data, {
      onSuccess: (data) => {
        toast({ title: data.message, variant: "default" });

        router.refresh();
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
  };

  return (
    <PageLayout
      name="Account Settings"
      description="Change account details."
      breadcrumbs={[
        {
          name: "Settings",
          link: "/settings",
        },
        {
          name: "Account",
        },
      ]}
      actions={[
        {
          type: "button",
          name: "Save",
          icon: Save,
          loading: isUpdatingAccount,
          onClick: () => handleSubmit(onSubmit)(),
        },
      ]}
    >
      <FormProvider {...methods}>
        <div className="p-4 space-y-4 max-w-md">
          <FormTextField name="name" label="Name" className="w-full" />
          <FormTextField
            name="email"
            type="email"
            label="Email"
            className="w-full"
          />
          <FormTextField
            name="password"
            type="password"
            label="Password"
            className="w-full"
          />
        </div>
      </FormProvider>
    </PageLayout>
  );
};
