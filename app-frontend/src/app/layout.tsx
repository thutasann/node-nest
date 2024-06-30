import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import { ModeToggle } from '@/components/general/toggle';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Nodejs Kafka Microservice',
	description:
		'tiny nodejs + kafka microservices with elastic search from scratch',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex justify-center items-center py-2 bg-primary-foreground/60 backdrop-blur-md mb-6 gap-2 fixed top-0 left-0 w-full z-[999]">
						<span className="text-lg font-bold">Node Kafka</span> <ModeToggle />
					</div>
					<main className="mt-[90px]">{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
