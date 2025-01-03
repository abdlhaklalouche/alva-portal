"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Plus, Save, Trash } from "lucide-react";
import React from "react";
import QuickFilter from "@/app/components/grid/gridfilter";
import { ColDef } from "ag-grid-community";
import { AgGridReact, CustomCellEditorProps } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import GridActions from "@/app/components/grid/gridactions";
import { useFieldArray, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  entitiesKeys,
  useEntitiesActions,
  useGetEntitiesTypes,
} from "@/api/entities";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "yup";
import { toast } from "@/hooks/use-toast";

ModuleRegistry.registerModules([AllCommunityModule]);

export default () => {
  const queryClient = useQueryClient();
  const gridRef = React.useRef<AgGridReact>(null);

  const [state, setState] = React.useState<{ deletable: boolean }>({
    deletable: false,
  });

  const {
    query: { data: types, isLoading: isLoadingTypes },
  } = useGetEntitiesTypes();

  const { saveEntitiesTypes, isSavingEntitiesTypes } = useEntitiesActions();

  const colDefs: ColDef[] = [
    { field: "is_new", hide: true },
    { field: "name", minWidth: 250, flex: 1, editable: true },
    { field: "icon", minWidth: 300, editable: true },
    {
      field: "",
      headerName: "",
      cellRenderer: (props: CustomCellEditorProps) => (
        <GridActions
          props={props}
          actions={[
            {
              name: "Edit",
              handleOnClick: (props) => {},
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

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(
      schema.object().shape({
        types: schema.array().nullable(),
      })
    ),
    defaultValues: {
      types: types?.data ?? [],
    },
  });

  const { control } = methods;

  const { prepend, fields, move, remove, update } = useFieldArray({
    control,
    name: "types",
  });

  const handleAdd = () => {
    prepend({ is_new: true });
  };

  const handleDelete = () => {
    const indexes: number[] = [];

    gridRef.current?.api.getSelectedRows().map((row) => {
      const index = fields.findIndex((item) => item.id === row.id);

      indexes.push(index);
    });

    remove(indexes);
  };

  const handleSave = () => {
    if (isSavingEntitiesTypes) return;

    saveEntitiesTypes(
      {
        types: fields,
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
            queryKey: [entitiesKeys.get_types],
          });
        },
      }
    );
  };

  React.useEffect(() => {
    methods.reset({ types: types?.data });
  }, [isLoadingTypes]);

  return (
    <PageLayout
      name="Entity Types"
      description="Change account details."
      breadcrumbs={[
        {
          name: "Sys Admin",
          link: "/sys-admin",
        },
        {
          name: "Entity Types",
        },
      ]}
      actions={[
        {
          type: "button",
          name: "New",
          icon: Plus,
          onClick: () => handleAdd(),
        },
        {
          type: "button",
          name: "Save",
          icon: Save,
          loading: isSavingEntitiesTypes,
          onClick: () => handleSave(),
        },
        {
          type: "button",
          name: "Delete",
          icon: Trash,
          disabled: !state.deletable,
          onClick: () => handleDelete(),
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
            rowData={fields}
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
    </PageLayout>
  );
};
