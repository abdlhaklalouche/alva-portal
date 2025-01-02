"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Plus, Trash } from "lucide-react";
import React from "react";
import QuickFilter from "@/app/components/grid/gridfilter";
import { ColDef } from "ag-grid-community";
import { AgGridReact, CustomCellEditorProps } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import GridActions from "@/app/components/grid/gridactions";

ModuleRegistry.registerModules([AllCommunityModule]);

export default () => {
  const gridRef = React.useRef<AgGridReact>(null);

  const [state, setState] = React.useState<{ deletable: boolean }>({
    deletable: false,
  });

  const colDefs: ColDef[] = [
    {
      field: "id",
      headerName: "#",
      minWidth: 100,
      filter: false,
    },
    { field: "name", minWidth: 250, flex: 1 },
    { field: "rooms", minWidth: 250 },
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

  return (
    <PageLayout
      name="Manage Entities"
      description="Manage all entities eg: Your house, office, etc.."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Entities",
        },
      ]}
      actions={[
        {
          type: "link",
          name: "New",
          icon: Plus,
          href: "#",
        },
        {
          type: "button",
          name: "Delete",
          icon: Trash,
          onClick: () => {},
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
            rowData={[]}
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
