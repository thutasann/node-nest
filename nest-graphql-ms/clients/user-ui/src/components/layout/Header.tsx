import styles from '@/utils/styles';
import React from 'react';
import NavItems from './NavItems';
import ProfileDropdown from './ProfileDropdown';

function Header() {
	return (
		<header className="w-full bg-[#0A0713]">
			<div className="w-[90%] m-auto h-[80px] flex items-center justify-between">
				<h1 className={`${styles.logo}`}>Foodie</h1>
				<NavItems />
				<ProfileDropdown />
			</div>
		</header>
	);
}

export default Header;
