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
import FormCombobox from "@/app/components/form/combobox";
import User from "@/types/User";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import QuickFilter from "@/app/components/grid/gridfilter";
import Device from "@/types/Device";
import { devicesKeys, useUserDevicesActions } from "@/api/devices";
import Entity from "@/types/Entity";
import Room from "@/types/Room";
import FormSelect from "@/app/components/form/select";
import { DeviceStatus } from "@/enums/DeviceStatus";
import { SelectItem } from "@/components/ui/select";
import { useGetUserEntities } from "@/api/entities";

export default ({
  device,
  open,
  handleClose,
}: {
  device: Device | null;
  open: boolean;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const {
    query: { data: entities, isLoading: isLoadingEntities },
  } = useGetUserEntities();

  const { addDevice, updateDevice, isAddingDevice, isUpdatingDevice } =
    useUserDevicesActions();

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(
      schema.object().shape({
        name: schema.string().required(),
        status: schema.string().required(),
        entity: schema.mixed().required(),
        room: schema.mixed().required(),
        energies: schema.lazy(() =>
          schema.array().of(
            schema.object({
              value: schema.number().required(),
            })
          )
        ),
      })
    ),
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  const onSubmit = (data: any) => {
    if (isAddingDevice || isUpdatingDevice) return;

    if (device) {
      updateDevice(
        {
          id: device.id,
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
              queryKey: [devicesKeys.get],
            });
          },
        }
      );
    } else {
      addDevice(data, {
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
            queryKey: [devicesKeys.get],
          });
        },
      });
    }
  };

  React.useEffect(() => {
    if (device) {
      setValue("name", device.name);
      setValue("status", device.status);
      setValue("entity", device.room.entity);
      setValue("room", device.room);
      setValue("energies", device.energies);
    }

    return () => {
      reset({});
    };
  }, [open, device?.id]);

  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{device ? "Update device" : "Add device"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <div className="space-y-4">
            <div className="pb-4">
              <FormCombobox
                name="entity"
                label="Entity"
                loading={isLoadingEntities}
                options={entities?.data ?? []}
                render={(entity: Entity) => (
                  <div className="space-y-0">
                    <p className="text-sm font-semibold">{entity.name}</p>
                    <p className="text-xs">{entity.user.name}</p>
                  </div>
                )}
                className="w-full h-9"
              />
            </div>
            <FormCombobox
              name="room"
              label="Room"
              loading={isLoadingEntities}
              options={(watch("entity") as Entity)?.rooms ?? []}
              render={(room: Room) => room.name}
              className="w-full"
            />
            <FormTextField name="name" label="Name" className="w-full" />
            <div className="w-60">
              <FormSelect
                name="status"
                label="Status"
                placeholder="Select status"
                className="w-full"
              >
                {Object.values(DeviceStatus).map((key, index) => (
                  <SelectItem key={index} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </FormSelect>
            </div>
            <div className="h-60">
              <p className="text-sm font-semibold">Energies</p>
              <DeviceEnergies />
            </div>
          </div>
        </FormProvider>
        <DialogFooter className="py-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <LoadingButton
            loading={isAddingDevice || isUpdatingDevice}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DeviceEnergies = () => {
  const gridRef = React.useRef<AgGridReact>(null);

  const [state, setState] = React.useState<{ deletable: boolean }>({
    deletable: false,
  });

  const colDefs: ColDef[] = [
    { field: "value", minWidth: 250, flex: 1, editable: true },
    { field: "time", minWidth: 250, editable: true },
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
    name: "energies",
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
