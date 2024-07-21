import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const REGISTER_USER: DocumentNode = gql`
	mutation RegisterUser(
		$name: String!
		$password: String!
		$email: String!
		$phone_number: Float!
	) {
		register(
			registerInput: {
				name: $name
				email: $email
				password: $password
				phone_number: $phone_number
			}
		) {
			activation_token
		}
	}
`;
