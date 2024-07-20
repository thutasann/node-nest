import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { RootProviders } from '@/providers/RootProviders';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
	title: 'Nest Graphql Microservices',
	description:
		'This is the Nestjs + Graphql + Nextjs Full stack food delivery app',
	icons: {
		icon: './logo.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={` ${inter.variable}`}>
				<RootProviders>{children}</RootProviders>
				<Toaster
					position="top-center"
					reverseOrder={false}
				/>
			</body>
		</html>
	);
}
