'use client';

import { gql, DocumentNode } from '@apollo/client';

/**
 * get loggedIn user query
 */
export const GET_USER: DocumentNode = gql`
	query {
		getLoggedInUser {
			user {
				id
				name
				email
				password
			}
			accessToken
			refreshToken
		}
	}
`;
