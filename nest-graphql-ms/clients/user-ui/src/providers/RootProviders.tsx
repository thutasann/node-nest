'use client';

import { graphqlClient } from '@/graphql/gql';
import { ApolloProvider } from '@apollo/client';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

export function RootProviders({ children }: { children: React.ReactNode }) {
	return (
		<ApolloProvider client={graphqlClient}>
			<SessionProvider>
				<NextUIProvider>{children}</NextUIProvider>
			</SessionProvider>
		</ApolloProvider>
	);
}
