"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Plus, Trash } from "lucide-react";
import React from "react";
import QuickFilter from "@/app/components/grid/gridfilter";
import { ColDef } from "ag-grid-community";
import { AgGridReact, CustomCellEditorProps } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import GridActions from "@/app/components/grid/gridactions";
import {
  entitiesKeys,
  useEntitiesActions,
  useGetEntities,
} from "@/api/entities";
import { useQueryClient } from "@tanstack/react-query";
import Entity from "@/types/Entity";
import { toast } from "@/hooks/use-toast";
import Modal from "./modal";

ModuleRegistry.registerModules([AllCommunityModule]);

type PageState = {
  deletable: boolean;
  open: boolean;
  entity: Entity | null;
};

export default () => {
  const queryClient = useQueryClient();
  const gridRef = React.useRef<AgGridReact>(null);

  const [state, setState] = React.useState<PageState>({
    deletable: false,
    open: false,
    entity: null,
  });

  const {
    query: { data: entities, isLoading: isLoadingEntities },
  } = useGetEntities();

  const { deleteEntities, isDeletingEntities } = useEntitiesActions();

  const colDefs: ColDef[] = [
    {
      field: "id",
      headerName: "#",
      minWidth: 100,
      filter: false,
    },
    { field: "name", minWidth: 250, flex: 1 },
    { field: "type.name", headerName: "type", minWidth: 250 },
    {
      field: "rooms",
      valueGetter: ({ data }) => data.rooms?.length,
      minWidth: 250,
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
                  entity: data,
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

  const handleDeleteEntities = () => {
    if (isDeletingEntities) return;

    const ids =
      gridRef.current?.api.getSelectedRows().map((item) => item.id) ?? [];

    deleteEntities(
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
            queryKey: [entitiesKeys.get],
          });
        },
      }
    );
  };

  return (
    <PageLayout
      name="Manage Entities"
      description="Manage all entities eg: Your house, office, etc.."
      breadcrumbs={[
        {
          name: "Sys Admin",
          link: "/sys-admin",
        },
        {
          name: "Entities",
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
              entity: null,
            }));
          },
        },
        {
          type: "button",
          name: "Delete",
          icon: Trash,
          disabled: !state.deletable,
          loading: isDeletingEntities,
          onClick: () => handleDeleteEntities(),
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
            rowData={entities?.data ?? []}
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
        entity={state.entity}
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
