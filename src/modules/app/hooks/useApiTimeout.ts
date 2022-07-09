import { useEffect } from 'react';
import { useIsFetching, useIsMutating, useQueryClient } from 'react-query';
const API_TIMEOUT = 30000;

const useApiTimeout = () => {
  const isFetching = useIsFetching({
    predicate: (query) => !(query.options.meta && query.options.meta.background),
  });

  const isBackgroundFetching = useIsFetching({
    predicate: (query) => !!(query.options.meta && query.options.meta.background),
  });
  const isMutating = useIsMutating();
  const queryClient = useQueryClient();

  useEffect(() => {
    let timeOut: NodeJS.Timeout | undefined;

    if (isFetching || isBackgroundFetching) {
      timeOut = setTimeout(async () => {
        await queryClient.cancelQueries();
        console.log('cancelled Queries');
      }, API_TIMEOUT);
    } else if (isMutating) {
      timeOut = setTimeout(async () => {
        await queryClient.cancelMutations();
        console.log('cancelled Mutations');
      }, API_TIMEOUT);
    }

    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [isFetching, isMutating, queryClient, isBackgroundFetching]);

  return { isFetching, isMutating, isBackgroundFetching, queryClient };
};

export default useApiTimeout;
