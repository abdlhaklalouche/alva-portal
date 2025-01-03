import useQueryFetch from "@/hooks/use-fetch";
import axios from "@/lib/axios";
import CurrentUser from "@/types/CurrentUser";
import User from "@/types/User";
import { useMutation } from "@tanstack/react-query";

type SigninBody = {
  email: string;
  password: string;
};

export const usersKeys = {
  get: "users",
  signin: "signin",
  signout: "signout",
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

  return {
    signin,
    signout,
    isSigningIn,
    isSigningOut,
  };
};
