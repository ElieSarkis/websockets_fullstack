import { useEffect } from 'react';
import { useQueryClient, QueryKey } from 'react-query';
import webSocketService from '../services/WebSocketService';

const useWebSocketUpdate = <T>(eventName: string, queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleUpdate = (data: T) => {
      queryClient.setQueryData<T[]>(queryKey, (oldData) => {
        if (oldData) {
          return [...oldData, data];
        }
        return [data];
      });
    };

    webSocketService.on(eventName, handleUpdate);

    return () => {
      webSocketService.off(eventName, handleUpdate);
    };
  }, [eventName, queryClient, queryKey]);
};

export default useWebSocketUpdate;
