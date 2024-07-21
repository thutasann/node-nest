'use client';

import Login from '@/views/Auth/Login';
import Signup from '@/views/Auth/Signup';
import Verification from '@/views/Auth/Verification';
import React, { useState } from 'react';

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
			</div>
		</div>
	);
}

export default AuthScreen;
