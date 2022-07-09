import { useMemo } from 'react';

import { useGetUserByUserNameQuery } from 'generated/react-query-types';
import { useAuthContext } from 'modules/auth/authContext';

const useVerifyUniqueUserName = (userName: string) => {
  const { gqlClient } = useAuthContext();

  const enabled = useMemo(() => !!userName, [userName]);
  const { isLoading, data } = useGetUserByUserNameQuery(
    gqlClient,
    { paginationInput: {}, user: { userName } },
    {
      retry: false,
      enabled,
      meta: { background: true },
      refetchOnWindowFocus: false,
    }
  );

  //@ts-ignore
  return { isLoading, enabled, userNameIsUnique: !data?.getUserByUserName?.userName };
};
export default useVerifyUniqueUserName;
