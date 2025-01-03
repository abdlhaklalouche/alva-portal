import useQueryFetch from "@/hooks/use-fetch";
import axios from "@/lib/axios";
import CurrentUser from "@/types/CurrentUser";
import User from "@/types/User";
import { useMutation } from "@tanstack/react-query";

type SigninBody = {
  email: string;
  password: string;
};

type AddBody = {
  is_system_admin: boolean;
  name: string;
  email: string;
  password: string;
};

type UpdateBody = { id: boolean } & AddBody;

export const usersKeys = {
  get: "users",
  signin: "signin",
  signout: "signout",
  add: "users-add",
  update: "users-update",
  delete: "users-delete",
};

// Fetch all users
export const useGetUsers = () => {
  const response = useQueryFetch<User>({
    key: [usersKeys.get],
    path: `/users`,
    autoFetch: true,
    refetchOnWindowFocus: false,
  });

  return response;
};

// Fetch user
export const useGetUser = async ({ token }: { token: string }) => {
  try {
    const { data } = await axios.post(
      "/users/check",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data.data as CurrentUser;
  } catch (error) {
    return undefined;
  }
};

export const useUsersActions = () => {
  //Signin
  const { mutate: signin, isPending: isSigningIn } = useMutation({
    mutationKey: [usersKeys.signin],
    mutationFn: async (data: SigninBody) => {
      const response = await axios.post(`/users/login`, data);

      return response.data;
    },
  });

  //Signout
  const { mutate: signout, isPending: isSigningOut } = useMutation({
    mutationKey: [usersKeys.signout],
    mutationFn: async (data: any) => {
      const response = await axios.post(`/users/logout`);

      return response.data;
    },
  });

  //Add user
  const { mutate: addUser, isPending: isAddingUser } = useMutation({
    mutationKey: [usersKeys.add],
    mutationFn: async (data: AddBody) => {
      const response = await axios.put(`/users`, data);

      return response.data;
    },
  });

  //Update user
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationKey: [usersKeys.update],
    mutationFn: async (data: UpdateBody) => {
      const response = await axios.patch(`/users/${data.id}`, data);

      return response.data;
    },
  });

  //Delete users
  const { mutate: deleteUsers, isPending: isDeletingUsers } = useMutation({
    mutationKey: [usersKeys.delete],
    mutationFn: async (data: any) => {
      const response = await axios.post(`/users/delete`, data);

      return response.data;
    },
  });

  return {
    signin,
    signout,
    isSigningIn,
    isSigningOut,

    addUser,
    updateUser,
    deleteUsers,
    isAddingUser,
    isUpdatingUser,
    isDeletingUsers,
  };
};
