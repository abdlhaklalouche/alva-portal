import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "yup";
import LoadingButton from "@/app/components/other/loading-button";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import FormTextField from "@/app/components/form/textfield";
import FormCheckbox from "@/app/components/form/checkbox";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import Entity from "@/types/Entity";
import {
  entitiesKeys,
  useGetEntitiesTypes,
  useUserEntitiesActions,
} from "@/api/entities";
import FormCombobox from "@/app/components/form/combobox";
import EntityType from "@/types/EntityType";
import User from "@/types/User";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import QuickFilter from "@/app/components/grid/gridfilter";

export default ({
  entity,
  open,
  handleClose,
}: {
  entity: Entity | null;
  open: boolean;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const {
    query: { data: types, isLoading: isLoadingTypes },
  } = useGetEntitiesTypes();

  const { addEntity, updateEntity, isAddingEntity, isUpdatingEntity } =
    useUserEntitiesActions();

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(
      schema.object().shape({
        name: schema.string().required(),
        type: schema.mixed().required(),
        rooms: schema.lazy(() =>
          schema.array().of(
            schema.object({
              name: schema.string().required(),
            })
          )
        ),
      })
    ),
  });

  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = (data: any) => {
    if (isAddingEntity || isUpdatingEntity) return;

    if (entity) {
      updateEntity(
        {
          id: entity.id,
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
              queryKey: [entitiesKeys.get],
            });
          },
        }
      );
    } else {
      addEntity(data, {
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
            queryKey: [entitiesKeys.get],
          });
        },
      });
    }
  };

  React.useEffect(() => {
    if (entity) {
      setValue("name", entity.name);
      setValue("type", entity.type);
      setValue("rooms", entity.rooms);
    }

    return () => {
      reset({});
    };
  }, [open, entity?.id]);

  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{entity ? "Update entity" : "Add entity"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <div className="space-y-4">
            <FormCombobox
              name="type"
              label="Type"
              loading={isLoadingTypes}
              options={types?.data ?? []}
              render={(type: EntityType) => type.name}
              className="w-full"
            />
            <FormTextField name="name" label="Name" className="w-full" />
            <div className="h-60">
              <p className="text-sm font-semibold">Rooms</p>
              <EntityRooms />
            </div>
          </div>
        </FormProvider>
        <DialogFooter className="py-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <LoadingButton
            loading={isAddingEntity || isUpdatingEntity}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EntityRooms = () => {
  const gridRef = React.useRef<AgGridReact>(null);

  const [state, setState] = React.useState<{ deletable: boolean }>({
    deletable: false,
  });

  const colDefs: ColDef[] = [
    { field: "name", minWidth: 250, flex: 1, editable: true },
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

  const { control } = useFormContext();

  const { prepend, fields, move, remove, update } = useFieldArray({
    control,
    name: "rooms",
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 py-2">
        <QuickFilter onSubmit={handleQuickFilter} />
        <Button variant="outline" size="sm" onClick={handleAdd}>
          Add
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!state.deletable}
          onClick={handleDelete}
        >
          Delete
        </Button>
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
          onCellValueChanged={(e) => {
            if (e.rowIndex !== null) {
              update(e.rowIndex, e.data);
            }
          }}
        />
      </div>
    </div>
  );
};
