'use client';

import ForgotPassword from '@/views/Auth/ForgotPassword';
import Login from '@/views/Auth/Login';
import Signup from '@/views/Auth/Signup';
import Verification from '@/views/Auth/Verification';
import React, { useEffect, useState } from 'react';

interface IAuthScreen {
	setOpen: (e: boolean) => void;
}

function AuthScreen({ setOpen }: IAuthScreen) {
	const [activateState, setActivateState] = useState('Login');

	const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target instanceof HTMLDivElement && e.target.id === 'screen') {
			setOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e && e.code === 'Escape') {
				setOpen(false);
			}
		});
		return () => {
			window.removeEventListener('keydown', () => {});
		};
	}, [setOpen]);

	return (
		<div
			className="w-full fixed top-0 left-0 h-screen z-[9999] flex items-center justify-center bg-[#0000002e] backdrop-blur-md"
			id="screen"
			onClick={handleClose}
		>
			<div className="w-[500px] bg-slate-900 rounded shadow-md py-4 px-6">
				{activateState === 'Login' && (
					<Login
						setActiveState={setActivateState}
						setOpen={setOpen}
					/>
				)}
				{activateState === 'Signup' && (
					<Signup setActiveState={setActivateState} />
				)}
				{activateState === 'Verification' && (
					<Verification setActivateState={setActivateState} />
				)}
				{activateState === 'Forgot-Password' && (
					<ForgotPassword setActiveState={setActivateState} />
				)}
			</div>
		</div>
	);
}

export default AuthScreen;
