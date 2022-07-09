import { useSignUpMutation } from 'generated/react-query-types';
import { useAuthContext } from 'modules/auth/authContext';

const useSignUp = () => {
  const { gqlClient } = useAuthContext();
  return useSignUpMutation(gqlClient);
};
export default useSignUp;
