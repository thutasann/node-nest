'use client';

import React, { useState } from 'react';
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react';

function ProfileDropdown() {
	const [signedIn, setSignedIn] = useState(false);
	const [open, setOpen] = useState(false);

	return <div>ProfileDropdown</div>;
}

export default ProfileDropdown;
