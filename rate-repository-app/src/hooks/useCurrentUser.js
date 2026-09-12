import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = ({ includeReviews = false } = {}) => {
  const { data, ...result } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return { currentUser: data?.me, ...result };
};

export default useCurrentUser;