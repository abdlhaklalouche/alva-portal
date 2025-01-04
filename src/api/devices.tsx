import { DeviceStatus } from "@/enums/DeviceStatus";
import useQueryFetch from "@/hooks/use-fetch";
import axios from "@/lib/axios";
import Device from "@/types/Device";
import { useMutation } from "@tanstack/react-query";

type AddBody = {
  name: string;
  status: DeviceStatus;
  room_id: string;
  energies: any[];
};

type UpdateBody = { id: string } & AddBody;

export const devicesKeys = {
  get: "devices",
  add: "devices-add",
  update: "devices-update",
  delete: "devices-delete",
};

// Fetch all devices
export const useGetDevices = () => {
  const response = useQueryFetch<Device>({
    key: [devicesKeys.get],
    path: `/devices`,
    autoFetch: true,
    refetchOnWindowFocus: false,
  });

  return response;
};

export const useDevicesActions = () => {
  //Add device
  const { mutate: addDevice, isPending: isAddingDevice } = useMutation({
    mutationKey: [devicesKeys.add],
    mutationFn: async (data: AddBody) => {
      const response = await axios.put(`/devices`, data);

      return response.data;
    },
  });

  //Update device
  const { mutate: updateDevice, isPending: isUpdatingDevice } = useMutation({
    mutationKey: [devicesKeys.update],
    mutationFn: async (data: UpdateBody) => {
      const response = await axios.patch(`/devices/${data.id}`, data);

      return response.data;
    },
  });

  //Delete device
  const { mutate: deleteDevices, isPending: isDeletingDevices } = useMutation({
    mutationKey: [devicesKeys.delete],
    mutationFn: async (data: any) => {
      const response = await axios.post(`/devices/delete`, data);

      return response.data;
    },
  });

  return {
    addDevice,
    updateDevice,
    deleteDevices,
    isAddingDevice,
    isUpdatingDevice,
    isDeletingDevices,
  };
};
