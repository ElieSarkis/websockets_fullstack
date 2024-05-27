import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const useAxiosGet = <T>(
  axiosConfig: AxiosRequestConfig
): UseQueryResult<T, AxiosError> & { queryKey: string } => {
  const queryKey = JSON.stringify(axiosConfig);

  const queryResult = useQuery<T, AxiosError>(queryKey, async () => {
    const response = await axios.request<T>(axiosConfig);
    return response.data;
  });

  return { ...queryResult, queryKey };
};

export default useAxiosGet;
