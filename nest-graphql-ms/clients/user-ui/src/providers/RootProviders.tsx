'use client';

import { NextUIProvider } from '@nextui-org/react';

export function RootProviders({ children }: { children: React.ReactNode }) {
	return <NextUIProvider>{children}</NextUIProvider>;
}
