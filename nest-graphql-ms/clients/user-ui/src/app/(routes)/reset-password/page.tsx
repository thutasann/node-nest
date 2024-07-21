import ResetPassword from '@/views/Auth/ResetPassword';
import React from 'react';

interface IResetPasswordPage {
	searchParams: {
		verify: string;
	};
}

function ResetPasswordPage({ searchParams }: IResetPasswordPage) {
	const activationToken = searchParams['verify'] ?? '';

	return <ResetPassword activationToken={activationToken} />;
}

export default ResetPasswordPage;
