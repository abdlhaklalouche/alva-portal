"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Plus, Trash } from "lucide-react";
import React from "react";
import QuickFilter from "@/app/components/grid/gridfilter";
import { ColDef } from "ag-grid-community";
import { AgGridReact, CustomCellEditorProps } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import GridActions from "@/app/components/grid/gridactions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import Modal from "./modal";
import Device from "@/types/Device";
import {
  devicesKeys,
  useGetUserDevices,
  useUserDevicesActions,
} from "@/api/devices";

ModuleRegistry.registerModules([AllCommunityModule]);

type PageState = {
  deletable: boolean;
  open: boolean;
  device: Device | null;
};

export default () => {
  const queryClient = useQueryClient();
  const gridRef = React.useRef<AgGridReact>(null);

  const [state, setState] = React.useState<PageState>({
    deletable: false,
    open: false,
    device: null,
  });

  const {
    query: { data: devices, isLoading: isLoadingDevices },
  } = useGetUserDevices();

  const { deleteDevices, isDeletingDevices } = useUserDevicesActions();

  const colDefs: ColDef[] = [
    {
      field: "id",
      headerName: "#",
      minWidth: 100,
      maxWidth: 100,
      filter: false,
    },
    { field: "status", minWidth: 100, maxWidth: 120 },
    { field: "name", minWidth: 250, flex: 1 },
    { field: "room.entity.name", headerName: "Entity", minWidth: 250 },
    {
      field: "energies",
      valueGetter: ({ data }) => data.energies?.length,
      minWidth: 150,
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
                  device: data,
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

  const handleDeleteDevices = () => {
    if (isDeletingDevices) return;

    const ids =
      gridRef.current?.api.getSelectedRows().map((item) => item.id) ?? [];

    deleteDevices(
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
            queryKey: [devicesKeys.get],
          });
        },
      }
    );
  };

  return (
    <PageLayout
      name="Manage Devices"
      description="Manage your devices eg: Fridge, Over, etc.."
      breadcrumbs={[
        {
          name: "Main",
          link: "/",
        },
        {
          name: "Devices",
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
              device: null,
            }));
          },
        },
        {
          type: "button",
          name: "Delete",
          icon: Trash,
          disabled: !state.deletable,
          loading: isDeletingDevices,
          onClick: () => handleDeleteDevices(),
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
            rowData={devices?.data ?? []}
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
        device={state.device}
        open={state.open}
        handleClose={() => {
          setState((prev) => ({
            ...prev,
            entity: null,
            open: false,
          }));
        }}
      />
    </PageLayout>
  );
};
