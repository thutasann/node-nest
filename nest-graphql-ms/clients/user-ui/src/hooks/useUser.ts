'use client';

import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/actions/get-user.action';

/**
 * get loggedIn user
 */
export const useUser = () => {
	const { data, loading } = useQuery(GET_USER);
	return {
		loading,
		user: data?.getLoggedInUser?.user,
	};
};
