import { useSignInMutation } from 'generated/react-query-types';
import { useAuthContext } from 'modules/auth/authContext';

const useSignIn = () => {
  const { gqlClient } = useAuthContext();
  return useSignInMutation(gqlClient);
};
export default useSignIn;
