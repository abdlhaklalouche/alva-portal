import axios from "@/lib/axios";
import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";

export interface APIRequest {
  autoFetch?: boolean;
  refetchOnWindowFocus?: boolean;
}

export type FetchResponse<T> = {
  data: T[];
};

export type FetchQueryProps<T> = {
  query: UseQueryResult<FetchResponse<T>, any>;
};

type FetchOptions = {
  path: string;
  key: QueryKey;
  headers?: any;
  autoFetch?: boolean;
  refetchOnWindowFocus?: boolean;
};

const useQueryFetch = <T, M = {}>({
  key,
  path,
  headers,
  autoFetch = true,
  refetchOnWindowFocus = true,
}: FetchOptions): FetchQueryProps<T> => {
  const query = useQuery<FetchResponse<T>, any>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get(`${path}`, {
        headers: headers,
      });

      const responseData = data as FetchResponse<T>;

      return responseData;
    },
    enabled: autoFetch,
    refetchOnWindowFocus: refetchOnWindowFocus,
  });

  return {
    query,
  };
};

export default useQueryFetch;
