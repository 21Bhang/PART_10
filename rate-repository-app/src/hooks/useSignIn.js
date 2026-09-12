import { useMutation, useApolloClient } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const { data, errors } = await mutate({
        variables: { credentials: { username, password } },
      });

      // Check for GraphQL errors first
      if (errors && errors.length > 0) {
        const message = errors[0].message || 'Authentication failed';
        throw new Error(message);
      }

      // Check for valid response
      if (!data?.authenticate?.accessToken) {
        throw new Error('Invalid username or password');
      }

      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
      return data;
    } catch (e) {
      console.error('Sign in error:', e.message);
      throw e;
    }
  };

  return [signIn, result];
};

export default useSignIn;
