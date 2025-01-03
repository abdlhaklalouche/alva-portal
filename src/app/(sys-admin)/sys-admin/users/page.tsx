"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Plus, Trash } from "lucide-react";
import React from "react";
import QuickFilter from "@/app/components/grid/gridfilter";
import { ColDef } from "ag-grid-community";
import { AgGridReact, CustomCellEditorProps } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import GridActions from "@/app/components/grid/gridactions";
import { useGetUsers, usersKeys, useUsersActions } from "@/api/users";
import Modal from "./modal";
import User from "@/types/User";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

ModuleRegistry.registerModules([AllCommunityModule]);

type PageState = {
  deletable: boolean;
  open: boolean;
  user: User | null;
};

export default () => {
  const queryClient = useQueryClient();
  const gridRef = React.useRef<AgGridReact>(null);

  const [state, setState] = React.useState<PageState>({
    deletable: false,
    open: false,
    user: null,
  });

  const {
    query: { data, isLoading },
  } = useGetUsers();

  const { deleteUsers, isDeletingUsers } = useUsersActions();

  const colDefs: ColDef[] = [
    {
      field: "id",
      headerName: "#",
      minWidth: 100,
      filter: false,
    },
    { field: "name", minWidth: 300 },
    { field: "email", minWidth: 250, flex: 1 },
    {
      field: "is_system_admin",
      headerName: "Is System Admin",
      minWidth: 200,
      cellRenderer: "agCheckboxCellRenderer",
      cellDataType: "boolean",
    },
    {
      field: "",
      headerName: "",
      cellRenderer: (props: CustomCellEditorProps) => (
        <GridActions
          props={props}
          actions={[
            {
              name: "Edit",
              handleOnClick: ({ data }) => {
                setState((prev) => ({
                  ...prev,
                  open: true,
                  user: data,
                }));
              },
            },
          ]}
        />
      ),
      width: 60,
      flex: 0,
      filter: false,
      sortable: false,
      resizable: false,
      pinned: "right",
    },
  ];

  const defaultColDefs: ColDef = {
    filter: true,
    filterParams: {
      maxNumConditions: 1,
      buttons: ["apply", "reset"],
    },
  };

  const handleQuickFilter = (value: string) => {
    gridRef.current!.api.setGridOption("quickFilterText", value);
  };

  const handleDeleteUsers = () => {
    if (isDeletingUsers) return;

    const ids =
      gridRef.current?.api.getSelectedRows().map((item) => item.id) ?? [];

    deleteUsers(
      {
        ids: ids,
      },
      {
        onSuccess: (data) => {
          toast({ title: data.message, variant: "default" });
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
  };

  return (
    <PageLayout
      name="Users"
      description="All users of the system."
      breadcrumbs={[
        {
          name: "Sys Admin",
          link: "/sys-admin",
        },
        {
          name: "Users",
        },
      ]}
      actions={[
        {
          type: "button",
          name: "New",
          icon: Plus,
          onClick: () => {
            setState((prev) => ({
              ...prev,
              open: true,
              user: null,
            }));
          },
        },
        {
          type: "button",
          name: "Delete",
          icon: Trash,
          disabled: !state.deletable,
          loading: isDeletingUsers,
          onClick: () => handleDeleteUsers(),
        },
      ]}
    >
      <div className="flex flex-col h-full">
        <div className="p-2">
          <QuickFilter onSubmit={handleQuickFilter} />
        </div>
        <div className="ag-theme-quartz h-full">
          <AgGridReact
            ref={gridRef}
            rowData={data?.data ?? []}
            columnDefs={colDefs}
            className="rounded-none"
            headerHeight={35}
            getRowId={({ data }) => data.id}
            defaultColDef={defaultColDefs}
            rowSelection={{
              mode: "multiRow",
              enableClickSelection: false,
            }}
            enableCellTextSelection
            onSelectionChanged={(e) => {
              setState((prev) => ({
                ...prev,
                deletable: e.api.getSelectedRows().length > 0,
              }));
            }}
          />
        </div>
      </div>
      <Modal
        user={state.user}
        open={state.open}
        handleClose={() => {
          setState((prev) => ({
            ...prev,
            user: null,
            open: false,
          }));
        }}
      />
    </PageLayout>
  );
};
